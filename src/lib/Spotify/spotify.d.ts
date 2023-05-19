interface EmbedController {
  loadUri(uri: string): void;
  play(): void; // Starts from the beginning
  playFromStart(): void;
  togglePlay(): void;
  pause(): void;
  resume(): void;
  seek(seconds: number): void;
  destroy(): void;

  addListener(event: string, callback: (state: any) => void): void;
  once(event: string, callback: () => void): void;
  removeListener(event: string, callback: (state: any) => void): void;

  iframeElement: HTMLIFrameElement;
}

interface SpotifyIframeApi {
  createController(
    element: HTMLElement,
    options: {
      uri: string;
      width?: number;
      height?: number;
    },
    callback: (EmbedController: any) => void
  ): void;
}

interface Window {
  onSpotifyIframeApiReady: (IFrameAPI: any) => void;
}
