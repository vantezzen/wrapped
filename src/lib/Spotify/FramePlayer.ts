import EventEmitter from "events";

export default class SpotifyFramePlayer extends EventEmitter {
  public embedController: EmbedController | null = null;
  public canPlaySongs = false;

  private currentIFrame: HTMLIFrameElement | null = null;
  private previousIFrame: HTMLIFrameElement | null = null;

  public loadLibrary() {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);

      const timeout = setTimeout(() => {
        resolve();
        console.error("Spotify IFrame API timed out");
      }, 7000);

      window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIframeApi) => {
        const element = document.getElementById("spotify");
        const options = {
          uri: "spotify:track:7oDd86yk8itslrA9HRP2ki",
          width: 300,
          height: 80,
          theme: "dark",
        };
        IFrameAPI.createController(element!, options, (EmbedController) => {
          this.embedController = EmbedController;

          const enablePlayback = () => {
            if (this.canPlaySongs) return;
            console.log("Spotify IFrame ready");
            this.canPlaySongs = true;
            this.embedController!.removeListener("ready", enablePlayback);
            this.emit("ready");

            clearTimeout(timeout);
            resolve();
          };

          // We'll create separate iFrames for each new song to increase
          // loading speed. Removing the default iFrame will break
          // the Spotify API, so we'll just hide it instead.
          const defaultIframe = document
            .getElementById("spotify-wrapper")
            ?.querySelector("iframe");

          if (defaultIframe) {
            defaultIframe.style.opacity = "0";
            defaultIframe.style.position = "absolute";
            defaultIframe.style.top = "-1000px";
          }

          this.embedController!.addListener("ready", enablePlayback);
        });
      };
    });
  }

  public playSong(uri: string) {
    return new Promise<void>(async (resolve) => {
      if (!this.canPlaySongs) {
        console.error("User cannot play songs");
        return resolve();
      }
      if (!this.embedController) {
        console.error("SpotifyFramePlayer not initialized");
        return resolve();
      }

      const playTimeout = setTimeout(() => {
        console.error("Spotify IFrame API timed out");
        this.canPlaySongs = false;
        resolve();
      }, 6000);

      const container = document.getElementById("spotify-wrapper");
      this.previousIFrame = this.currentIFrame;
      const frameElement = document.createElement("div");

      if (container?.firstChild) {
        // Prepend, otherwise the current iframe will jump
        // while the new one is loading
        container!.insertBefore(frameElement, container?.firstChild);
      } else {
        container!.appendChild(frameElement);
      }

      const oembed = await fetch(`https://open.spotify.com/oembed?url=${uri}`)
        .then((response) => response.json())
        .catch(() => {
          console.error("Failed to fetch Spotify oembed");
          return {
            html: "",
          };
        });

      if (!oembed.html) {
        this.destroyPreviousIFrame();
        resolve();
        return;
      }

      // Disabling encrypted-media will force playing previews
      oembed.html = oembed.html.replace("encrypted-media; ", "");
      frameElement.innerHTML = oembed.html;

      this.setupNewIframe(frameElement);

      await this.waitForIframe();

      this.embedController.loadUri(uri);
      this.embedController.resume();

      setTimeout(() => this.destroyPreviousIFrame(), 1000);
      await this.waitForSpotify();

      this.currentIFrame!.style.opacity = "1";
      clearTimeout(playTimeout);
      resolve();
    });
  }

  private setupNewIframe(frameElement: HTMLDivElement) {
    const iframe = frameElement.querySelector("iframe");
    this.embedController!.iframeElement = iframe!;
    this.currentIFrame = iframe;
    this.currentIFrame!.style.opacity = "0";
    this.currentIFrame!.setAttribute("width", "300");
    this.currentIFrame!.setAttribute("height", "80");
  }

  private waitForIframe() {
    return new Promise<void>((resolve) => {
      const checkIfReady = (e: MessageEvent) => {
        if (
          e.source === this.currentIFrame?.contentWindow &&
          e.data.type === "ready"
        ) {
          console.log("Spotify IFrame ready yay");
          window.removeEventListener("message", checkIfReady);
          resolve();
        }
      };

      window.addEventListener("message", checkIfReady);
    });
  }

  private destroyPreviousIFrame() {
    if (this.previousIFrame) {
      this.previousIFrame.remove();
      this.previousIFrame = null;
    }
  }

  private waitForSpotify() {
    return new Promise<void>((resolve) => {
      let hasResolved = false;

      const checkIfReady = (state: {
        data: {
          isBuffering: boolean;
          duration: number;
          position: number;
        };
      }) => {
        if (hasResolved) {
          // Spotify API sometimes leakes listeners
          return;
        }

        if (
          !state.data.isBuffering &&
          state.data.duration > 0 &&
          state.data.position > 0
        ) {
          this.embedController?.removeListener("playback_update", checkIfReady);
          hasResolved = true;
          resolve();
        }
      };

      this.embedController?.addListener("playback_update", checkIfReady);
    });
  }

  public async pause() {
    if (!this.canPlaySongs) {
      console.error("User cannot play songs");
      return;
    }
    if (!this.embedController) {
      console.error("SpotifyFramePlayer not initialized");
      return;
    }

    this.embedController.pause();
  }
}
