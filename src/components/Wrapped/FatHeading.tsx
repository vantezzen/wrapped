import React from "react";

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
      className={`font-black text-6xl ${className} max-w-full hyphens-auto`}
    >
      {children}
    </Component>
  );
}

export default FatHeading;
