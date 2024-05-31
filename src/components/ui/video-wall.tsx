import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Marquee from "./marquee";

const images = [
  "/videos/image01.avif",
  "/videos/image02.avif",
  "/videos/image03.avif",
  "/videos/image04.avif",
  "/videos/image05.avif",
  "/videos/image06.avif",
  "/videos/image07.avif",
  "/videos/image08.avif",
  "/videos/image09.avif",
  "/videos/image10.avif",
  "/videos/image11.avif",
  "/videos/image12.avif",
  "/videos/image13.avif",
  "/videos/image14.avif",
  "/videos/image15.avif",
  "/videos/image16.avif",
  "/videos/image17.avif",
  "/videos/image18.avif",
  "/videos/image19.avif",
  "/videos/image20.avif",
  "/videos/image21.avif",
  "/videos/image22.avif",
];

function VideoWall() {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden opacity-5 flex gap-3 flex-grow"
      )}
    >
      {Array.from({ length: 10 }).map((_, i) => {
        const startIndex = (i * 6) % images.length;

        return (
          <Marquee
            vertical
            className="[--duration:90s] min-w-[200px]"
            reverse={i % 2 === 1}
            key={i}
          >
            {images.slice(startIndex, startIndex + 6).map((image, i) => (
              <Image
                key={i}
                src={image}
                alt="video"
                width={500}
                height={1000}
                className="rounded-xl w-[200px] h-[400px] object-cover"
              />
            ))}
          </Marquee>
        );
      })}
    </div>
  );
}

export default VideoWall;
