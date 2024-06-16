import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import SlideContainer from "../SlideContainer";
import DotPattern from "@/components/ui/dot-pattern";

function WatchSessions({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <DotPattern />
      <SlideContainer bg="bg-brand-dark z-10">
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
          You've had
        </InfoText>
        <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
          <CountUp end={statistics.watchSessions.totalSessions} duration={2} />
        </FatHeading>

        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
          watch sessions.
        </InfoText>
      </SlideContainer>
    </WrappedContainer>
  );
}

export default WatchSessions;
