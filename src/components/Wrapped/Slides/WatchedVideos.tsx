import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import dayjs from "dayjs";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const commentsOnVideos = {
  0: "Not a single one?",
  1: "Just one?",
  10: "Just getting started, huh?",
  1000: "A light watcher, I see",
  10000: "You're definately getting your watch time in!",
  50000: "Might wanna get some fresh air, huh?",
  100000: "Damn, when's the last time you saw the sun?",
};

function WatchedVideos({ statistics }: WrappedSlideProps) {
  const firstWatchedVideo = statistics.watchSessions.earliestVideoWatched;

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">
        Since {dayjs(firstWatchedVideo).format("DD/MM/YYYY")} you've watched
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.videoAmountWatched} duration={2} />
        <br />
        videos
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(statistics.videoAmountWatched, commentsOnVideos)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default WatchedVideos;
