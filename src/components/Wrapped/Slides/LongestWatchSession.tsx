import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import dayjs from "dayjs";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";
import formatTimeLength from "@/lib/utils/formatTimeLength";

const commentsOnLength = {
  0: "Nothing?",
  60: "A minute? That's it?",
  600: "10 minutes? We barely even started!",
  3600: "Clearly liked some videos",
  7200: "That's longer than a movie!",
  14400: "Damn, are you okay?",
  28800: "Must have been a hard day",
};

function LongestWatchSession({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.watchSessions.longestWatchSession.lengthSec
  );

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">
        Your longest watch session was on{" "}
        {dayjs(statistics.watchSessions.longestWatchSession.startTime).format(
          "L"
        )}{" "}
        and lasted
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={amount} duration={2} />
        <br />
        {unit}
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(
            statistics.watchSessions.longestWatchSession.lengthSec,
            commentsOnLength
          )}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default LongestWatchSession;
