import wait from "../utils/wait";

export default class SpotifyFramePlayer {
  public embedController: EmbedController | null = null;

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

    this.embedController.loadUri(uri);
    this.embedController.resume();
    await this.waitForSpotify();
    this.embedController.seek(seekTo);
    await this.waitForSpotify();
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
