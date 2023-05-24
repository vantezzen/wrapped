import Wrapped from "./Wrapped";
import { TikTokUserData } from "./types";
import JSZip from "jszip";
import * as Sentry from "@sentry/nextjs";

export default class WrappedCreator {
  fromFile(file: File): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      Sentry.setContext("file", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        this.fromZip(file).then(resolve).catch(reject);
      } else {
        this.fromJSON(file).then(resolve).catch(reject);
      }
    });
  }

  private fromJSON(file: File): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const content = JSON.parse(e.target.result as string);
            const userData = content as TikTokUserData;
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
            this.fromJSON(file).then(resolve).catch(reject);
          }
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.readAsText(file);
    });
  }

  private async fromZip(file: File): Promise<Wrapped> {
    try {
      const zip = new JSZip();
      await zip.loadAsync(file);
      const jsonFile = Object.values(zip.files)[0];
      const jsonContent = await jsonFile.async("string");
      const content = JSON.parse(jsonContent as string);
      const userData = content as TikTokUserData;
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
      throw e;
    }
  }

  forDemoMode(): Wrapped {
    const wrapped = new Wrapped({} as any);
    wrapped.demoMode = true;
    return wrapped;
  }
}
