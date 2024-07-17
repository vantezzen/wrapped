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
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdUnit error", e);
      }
    };

    notify();
    return notify;
  }, []);

  return (
    <div
      className="adparent"
      style={{
        minWidth: "320px",
        margin: "auto",
        textAlign: "center",
        width: "100%",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdUnit;
