import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function WatchSessionLength({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.watchSessions.averageSessionLengthSec
  );

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        When you open TikTok, on average you spend
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={amount} duration={2} />
        <br />
        {unit}
      </FatHeading>

      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        watching videos.
      </InfoText>
    </WrappedContainer>
  );
}

export default WatchSessionLength;
