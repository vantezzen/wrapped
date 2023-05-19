"use client";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import WrappedPlayer from "@/lib/Player/WrappedPlayer";
import React, { useEffect, useState } from "react";
import { WrappedSlideProps } from "./WrappedContainer";

function WrappedPlayerComponent(props: WrappedSlideProps) {
  const [player] = useState(() => new WrappedPlayer());
  const [, forceUpdateState] = useState(0);
  const forceUpdate = () => forceUpdateState((s) => s + 1);
  useEffect(() => {
    player.on("update", forceUpdate);
    player.play();

    return () => {
      player.off("update", forceUpdate);
    };
  }, []);

  const Component = player.currentSlide?.component || "div";

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
