"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import WrappedPlayer from "@/lib/Player/WrappedPlayer";
import React, { useEffect, useState } from "react";
import WrappedContainer, { WrappedSlideProps } from "./WrappedContainer";
import SpotifyFramePlayer from "@/lib/Spotify/FramePlayer";
import { Loader2 } from "lucide-react";

const LoadingPlayerComponent = (props: WrappedSlideProps) => {
  return (
    <WrappedContainer>
      <Loader2 size={32} className="animate-spin" />
    </WrappedContainer>
  );
};

function WrappedPlayerComponent({
  spotify,
  ...props
}: {
  spotify: SpotifyFramePlayer | null;
} & WrappedSlideProps) {
  const [player] = useState(() => new WrappedPlayer(spotify));
  const [, forceUpdateState] = useState(0);
  const forceUpdate = () => forceUpdateState((s) => s + 1);
  useEffect(() => {
    player.on("update", forceUpdate);
    player.play(props.statistics);

    return () => {
      player.off("update", forceUpdate);
    };
  }, []);

  useEffect(() => {
    player.spotifyPlayer = spotify;
  }, [spotify]);

  const Component = player.currentSlide?.component || LoadingPlayerComponent;

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={player.currentSlide?.name || "none"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <Component {...props} />
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default WrappedPlayerComponent;
