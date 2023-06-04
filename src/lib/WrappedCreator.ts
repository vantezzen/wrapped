import Wrapped from "./Wrapped";
import { TikTokUserData, TikTokUserDataSchema } from "./types";
import JSZip from "jszip";
import * as Sentry from "@sentry/nextjs";

export default class WrappedCreator {
  isTextExport = false;

  fromFile(file: File): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      this.isTextExport = false;
      Sentry.setContext("file", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      if (
        [
          "application/zip",
          "application/x-zip-compressed",
          "multipart/x-zip",
          "application/x-compressed",
        ].includes(file.type) ||
        file.name.endsWith(".zip")
      ) {
        this.fromZip(file).then(resolve).catch(reject);
      } else {
        this.fromJSON(file).then(resolve).catch(reject);
      }
    });
  }

  private fromJSON(file: File, isRetry = false): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          if (e.target?.result.toString().startsWith("Date:")) {
            this.isTextExport = true;
            return reject(new Error("Text export is not supported"));
          }

          try {
            const content = JSON.parse(e.target.result as string);
            const userData = content as TikTokUserData;
            this.investigateSchema(userData);
            resolve(new Wrapped(userData));
          } catch (e) {
            Sentry.captureException(new Error("Cannot read JSON file"), {
              extra: {
                originalException: e,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
              },
            });
            if (!isRetry) {
              this.fromZip(file, true).then(resolve).catch(reject);
            } else {
              reject(e);
            }
          }
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.readAsText(file);
    });
  }

  private async fromZip(file: File, isRetry = false): Promise<Wrapped> {
    try {
      const zip = new JSZip();
      await zip.loadAsync(file);
      const jsonFile = Object.values(zip.files)[0];
      const jsonContent = await jsonFile.async("string");
      const content = JSON.parse(jsonContent as string);
      const userData = content as TikTokUserData;
      this.investigateSchema(userData);
      return new Wrapped(userData);
    } catch (e) {
      Sentry.captureException(new Error("Cannot read ZIP file"), {
        extra: {
          originalException: e,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });

      if (!isRetry) {
        return await this.fromJSON(file, true);
      } else {
        throw e;
      }
    }
  }

  forDemoMode(): Wrapped {
    const wrapped = new Wrapped({} as any);
    wrapped.demoMode = true;
    return wrapped;
  }

  private investigateSchema(content: any) {
    const parsed = TikTokUserDataSchema.safeParse(content);
    if (!parsed.success) {
      // Log schema errors to Sentry
      Sentry.captureException(new Error("Schema validation failed"), {
        extra: {
          errors: parsed.error,
        },
      });
    }
  }
}
