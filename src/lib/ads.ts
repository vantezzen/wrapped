import { useEffect } from "react";

export function loadAds() {
  // Do nothing
}

export function useLoadAds() {
  useEffect(() => {
    loadAds();
  }, []);
}

export function loadFullAd() {
  // Do nothing
}

export function useLoadFullAd() {
  useEffect(() => {
    loadFullAd();
  }, []);
}
