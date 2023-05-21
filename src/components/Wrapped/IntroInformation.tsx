import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Faq from "../Preparation/Faq";

function IntroInformation({ onContinue }: { onContinue: () => void }) {
  return (
    <WrappedContainer>
      <FatHeading>Wrapped for TikTok</FatHeading>
      <InfoText>Get insights into your time on TikTok 🚀</InfoText>

      <div className="max-w-lg mx-auto">
        <MutedText>
          Wrapped for TikTok gives you stats on your TikTok activity.
          <br />
          To use it, you'll need your TikTok data export from{" "}
          <a
            href="https://www.tiktok.com/setting/download-your-data"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold"
          >
            https://www.tiktok.com/setting/download-your-data
          </a>{" "}
          in the "<strong>JSON - Machine-readable file</strong>" file format.
          <br />
          Your exported data does not include login credentials or any other
          sensitive information. For more info on how to verify this, look at
          the FAQ section below.
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

      <Faq />
    </WrappedContainer>
  );
}

export default IntroInformation;
