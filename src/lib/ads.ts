import { useEffect } from "react";

export function loadAds() {
  const script = document.createElement("script");
  script.src = "https://cimtaiphos.com/401/8645588";
  try {
    (document.body || document.documentElement).appendChild(script);
  } catch (e) {}
}

export function useLoadAds() {
  useEffect(() => {
    loadAds();
  }, []);
}

export function loadFullAd() {
  const script = document.createElement("script");
  script.src = "https://groleegni.net/401/8645646";
  try {
    (document.body || document.documentElement).appendChild(script);
  } catch (e) {}
}

export function useLoadFullAd() {
  useEffect(() => {
    loadFullAd();
  }, []);
}
