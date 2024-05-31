import Link from "next/link";
import React from "react";
import MutedText from "./Wrapped/MutedText";

function Footer() {
  return (
    <div className="text-center">
      <a
        href="https://vantezzen.io"
        target="_blank"
        rel="noreferrer"
        className="text-zinc-800 font-medium mt-12"
      >
        Made by <span className="underline">vantezzen</span>
        <br />
        <span className="text-sm">
          Silly little projects for when you need a break from reality
        </span>
      </a>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-3 text-xs mt-6">
        <Link href="/legal/terms" className="text-zinc-800 font-medium">
          Terms of Service
        </Link>
        <Link href="/legal/privacy" className="text-zinc-800 font-medium">
          Privacy Policy
        </Link>
        <Link href="/legal/impressum" className="text-zinc-800 font-medium">
          Impressum
        </Link>
      </div>
      <div className="text-center mb-6 text-xs">
        <MutedText>
          TikTok is a registered trademark of Bytedance Ltd. This website is not
          affiliated with or endorsed by TikTok or Bytedance Ltd.
        </MutedText>
        <MutedText>
          Spotify is a registered trademark of Spotify AB. TrueShuffle is not
          associated with Spotify.
        </MutedText>
      </div>
    </div>
  );
}

export default Footer;
