import React from "react";
import Serif from "../Serif";

function FatHeading({
  children,
  component = "h1",
  className = "",
}: {
  children: React.ReactNode;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  className?: string;
}) {
  const Component = component;
  return (
    <Component
      className={`font-black text-5xl ${className} max-w-full hyphens-auto`}
    >
      <Serif>{children}</Serif>
    </Component>
  );
}

export default FatHeading;
