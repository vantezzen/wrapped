import React from "react";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import HideForTime from "../HideForTime";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import SlideContainer from "../SlideContainer";
import RetroGrid from "@/components/ui/retro-grid";

function Intro({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <SlideContainer>
        <RetroGrid />
        <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 z-10">
          {statistics.name}, right? 👋
        </FatHeading>

        <HideForTime time={500}>
          <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 z-10">
            Let's take a look at your activity on TikTok, shall we?
          </InfoText>
        </HideForTime>
      </SlideContainer>
    </WrappedContainer>
  );
}

export default Intro;
