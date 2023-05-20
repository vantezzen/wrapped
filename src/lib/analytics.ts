export function trackEvent(name: string) {
  if (typeof window !== "undefined" && window.sa_event) {
    try {
      window.sa_event(name);
    } catch (e) {
      console.error(e);
    }
  }
}
