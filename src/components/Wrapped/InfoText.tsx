import React from "react";

function InfoText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-zinc-600 text-xl font-medium ${className}`}>
      {children}
    </p>
  );
}

export default InfoText;
