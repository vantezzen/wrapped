import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import HideForTime from "../HideForTime";
import SlideContainer from "../SlideContainer";

function TotalWatchTime({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.watchSessions.totalWatchTimeSec
  );
  const watchTimeMins = Math.round(
    statistics.watchSessions.totalWatchTimeSec / 60
  );

  return (
    <WrappedContainer>
      <SlideContainer>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
          with a total watch time of
        </InfoText>
        <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
          <CountUp end={watchTimeMins} duration={2} /> <br />
          minutes
        </FatHeading>

        <HideForTime time={500}>
          <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
            That's {amount} {unit}!
          </InfoText>
        </HideForTime>
      </SlideContainer>
    </WrappedContainer>
  );
}

export default TotalWatchTime;
