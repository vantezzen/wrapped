import Persona from "@/lib/Statistics/Personas/Persona";
import Wrapped, { Statistics } from "@/lib/Wrapped";
import React from "react";
import { motion } from "framer-motion";

export type WrappedSlideProps = {
  statistics: Statistics;
  persona: Persona;
  wrapped: Wrapped;
  isDemo: boolean;
};

function WrappedContainer({
  children,
  bg = "bg-white",
  text = "text-zinc-900",
}: {
  children: React.ReactNode;
  bg?: string;
  text?: string;
}) {
  return (
    <motion.div
      className={`min-h-screen flex justify-center items-center flex-col gap-6 ${bg} ${text} relative`}
      suppressHydrationWarning
      layoutId="wrapped-container"
    >
      {children}
    </motion.div>
  );
}

export default WrappedContainer;
