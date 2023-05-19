import Link from "next/link";
import React from "react";
import MutedText from "./Wrapped/MutedText";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-3 mt-12">
        <a
          href="https://vantezzen.io"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-800 font-medium"
        >
          Made by vantezzen
        </a>
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
      <div className="text-center mb-6">
        <MutedText>
          TikTok is a registered trademark of Bytedance Ltd. This website is not
          affiliated with or endorsed by TikTok or Bytedance Ltd.
        </MutedText>
      </div>
    </div>
  );
}

export default Footer;
