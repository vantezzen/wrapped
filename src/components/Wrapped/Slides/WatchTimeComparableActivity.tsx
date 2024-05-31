import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import getComparableActivity from "@/lib/utils/getComparableActivity";
import HideForTime from "../HideForTime";
import VideoBackground from "@/components/ui/video-background";
import SlideContainer from "../SlideContainer";

function WatchTimeComparableActivity({ statistics }: WrappedSlideProps) {
  const comparableActivity = getComparableActivity(
    statistics.watchSessions.totalWatchTimeSec
  );

  return (
    <WrappedContainer>
      <VideoBackground youtubeId="hOx_XnVLJU0" />

      <SlideContainer bg="bg-transparent text-white">
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
          in that time you could've
        </InfoText>

        <HideForTime time={500}>
          <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 max-w-xl mx-auto">
            {comparableActivity}
          </FatHeading>
        </HideForTime>

        <HideForTime time={2000}>
          <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-2000">
            ...but you didn't
          </InfoText>
        </HideForTime>
      </SlideContainer>
    </WrappedContainer>
  );
}

export default WatchTimeComparableActivity;
