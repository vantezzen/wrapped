import wait from "../utils/wait";

export default class SpotifyFramePlayer {
  public embedController: EmbedController | null = null;

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
      }, 10000);

      window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIframeApi) => {
        const element = document.getElementById("spotify");
        const options = {
          uri: "",
          width: 300,
          height: 80,
          theme: "dark",
        };
        IFrameAPI.createController(element!, options, (EmbedController) => {
          window.ec = EmbedController;
          this.embedController = EmbedController;

          // We'll use the new embed API so remove the default iframe
          document
            .getElementById("spotify-wrapper")
            ?.querySelector("iframe")
            ?.remove();

          clearTimeout(timeout);
          resolve();
        });
      };
    });
  }

  public async playSong(uri: string, seekTo: number = 0) {
    if (!this.embedController) {
      console.error("SpotifyFramePlayer not initialized");
      return;
    }

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

    const oembed = await fetch(
      `https://open.spotify.com/oembed?url=${uri}`
    ).then((response) => response.json());
    frameElement.innerHTML = oembed.html;

    this.setupNewIframe(frameElement);

    await this.waitForIframe();

    this.embedController.loadUri(uri);
    this.embedController.resume();
    await this.waitForSpotify();

    this.currentIFrame!.style.opacity = "1";
    this.destroyPreviousIFrame();

    this.embedController.seek(seekTo);
    await this.waitForSpotify();
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
    if (!this.embedController) {
      console.error("SpotifyFramePlayer not initialized");
      return;
    }

    this.embedController.pause();
  }
}
