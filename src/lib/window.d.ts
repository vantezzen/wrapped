interface Window {
  sa_event(name: string): void;
  plausible(name: string): void;
  gtag(type: "event", name: string): void;
}
