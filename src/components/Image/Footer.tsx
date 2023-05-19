import React from "react";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "20px",
        color: "#A1A1AA",
        fontFamily: "Inter",
        fontWeight: 900,
        textAlign: "center",
      }}
    >
      <p style={{ color: "#919191", fontSize: "25px" }}>
        Get your own Wrapped at
      </p>
      <p style={{ fontSize: "30px" }}>wrapped.vantezzen.io</p>
    </div>
  );
}

export default Footer;
