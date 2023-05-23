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
  15000: "Your attention span is probably slowly degrading, right?",
  25000: "TikTok addict in the making.",
  30000:
    "You've surpassed the average teenager's TikTok intake - so there's that",
  35000: "TikTok is your second home now, isn't it?",
  40000: "Your thumbs must be getting tired from all that scrolling.",
  50000: "Might wanna get some fresh air, huh?",
  60000: "You've reached a new level of TikTok obsession.",
  75000: "There's a whole world outside TikTok, you know?",
  85000: "Okay, seriously, take a break.",
  100000: "Damn, when's the last time you saw the sun?",
  150000: "I know its not my business but you should probably find a hobby.",
  200000: "Congratulations, you've completed TikTok - maybe go outside next?",
};

function WatchedVideos({ statistics }: WrappedSlideProps) {
  const firstWatchedVideo = statistics.watchSessions.earliestVideoWatched;

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">
        Since {dayjs(firstWatchedVideo).format("L")} you've watched
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
