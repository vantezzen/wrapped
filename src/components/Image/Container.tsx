import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#18181B",
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#EBF134",
      }}
    >
      {children}
    </div>
  );
}

export default Container;
