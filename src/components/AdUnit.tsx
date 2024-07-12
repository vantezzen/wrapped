import React, { useEffect } from "react";

function AdUnit({
  adClient = "ca-pub-8508732166185621",
  adSlot,
  adFormat = "auto",
}: {
  adClient?: string;
  adSlot: string;
  adFormat?: string;
}) {
  useEffect(() => {
    const notify = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    notify();
    return notify;
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    ></ins>
  );
}

export default AdUnit;
