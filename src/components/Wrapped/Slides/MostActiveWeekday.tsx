import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import SlideContainer from "../SlideContainer";

function MostActiveWeekday({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.watchSessions.mostActiveWeekday.averageUsageTime
  );

  return (
    <WrappedContainer>
      <SlideContainer bg="bg-brand-dark">
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
          You use TikTok the most on
        </InfoText>
        <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
          {statistics.watchSessions.mostActiveWeekday.weekday}
        </FatHeading>
      </SlideContainer>
    </WrappedContainer>
  );
}

export default MostActiveWeekday;
