import React, { useEffect } from "react";

function HideForTime({
  children,
  time,
}: {
  children: React.ReactNode;
  time: number;
}) {
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, time);
  }, []);

  return (
    <div className={`${visible ? "opacity-100" : "opacity-0"}`}>{children}</div>
  );
}

export default HideForTime;
