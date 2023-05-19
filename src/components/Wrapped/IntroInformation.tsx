import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

function IntroInformation({ onContinue }: { onContinue: () => void }) {
  return (
    <WrappedContainer>
      <FatHeading>Wrapped for TikTok</FatHeading>
      <InfoText>Get insights into your time on TikTok 🚀</InfoText>

      <div className="max-w-lg mx-auto">
        <MutedText>
          Wrapped for TikTok uses your TikTok data export to give you
          personalized stats about your time on TikTok.
          <br />
          Before you can use Wrapped for TikTok, you need to request your TikTok
          data export at{" "}
          <a
            href="https://www.tiktok.com/setting/download-your-data"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            https://www.tiktok.com/setting/download-your-data
          </a>
          . This may take a few hours or days, depending on how much data you
          have on TikTok.
          <br />
          Be sure to choose "<strong>JSON - Machine-readable file</strong>" as
          the file format, otherwise Wrapped for TikTok won't be able to read
          your data.
        </MutedText>
      </div>

      <div className="flex flex-col gap-4">
        <a
          href="https://www.tiktok.com/setting/download-your-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="dark">
            Open TikTok and request my data export
            <ExternalLink className="ml-2" size={16} />
          </Button>
        </a>
        <Button onClick={onContinue}>
          I have my TikTok data export, let's go!
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </WrappedContainer>
  );
}

export default IntroInformation;
