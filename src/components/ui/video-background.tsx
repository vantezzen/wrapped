import { cn } from "@/lib/utils";
import React from "react";

function VideoBackground({ youtubeId }: { youtubeId: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden flex gap-3 flex-grow"
      )}
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&disablekb=1&playlist=${youtubeId}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}

export default VideoBackground;
