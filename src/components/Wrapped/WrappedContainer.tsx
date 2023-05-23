import Persona from "@/lib/Statistics/Personas/Persona";
import { Statistics } from "@/lib/Wrapped";
import React from "react";

export type WrappedSlideProps = {
  statistics: Statistics;
  persona: Persona;
  isDemo: boolean;
};

function WrappedContainer({
  children,
  bg = "bg-starship-400",
  text = "text-zinc-900",
}: {
  children: React.ReactNode;
  bg?: string;
  text?: string;
}) {
  return (
    <div
      className={`w-screen min-h-screen flex justify-center items-center flex-col gap-6 text-center ${bg} ${text} p-6`}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}

export default WrappedContainer;
