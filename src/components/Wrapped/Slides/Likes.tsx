import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import dayjs from "dayjs";
import lookup from "@/lib/utils/lookup";

const commentsOnLikes = {
  0: "Found nothing interesting?",
  10: "Definately sparse with your likes!",
  100: "You're a bit picky with your likes, huh?",
  500: "That's quite some videos you liked!",
  1000: "You're a like machine!",
  1500: "Destroying that like button, huh?",
};

function Likes({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        You liked
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.likes.totalLikes} duration={2} />
        <br />
        videos
      </FatHeading>
      {statistics.likes.dayWithMostLikedPosts.count > 0 && (
        <HideForTime time={500}>
          <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
            and set a record by liking{" "}
            <CountUp
              end={statistics.likes.dayWithMostLikedPosts.count}
              duration={1}
            />{" "}
            videos on{" "}
            {dayjs(statistics.likes.dayWithMostLikedPosts.day).format("L")}.
          </InfoText>
        </HideForTime>
      )}
      <HideForTime time={700}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-700">
          {lookup(statistics.likes.totalLikes, commentsOnLikes)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Likes;
