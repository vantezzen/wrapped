import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import getComparableActivity from "@/lib/utils/getComparableActivity";

function TotalWatchTime({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.watchSessions.totalWatchTimeSec
  );

  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        with a total watch time of
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={amount} duration={2} /> <br />
        {unit}
      </FatHeading>
    </WrappedContainer>
  );
}

export default TotalWatchTime;
