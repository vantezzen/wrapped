import React from "react";
import WrappedContainer from "../Wrapped/WrappedContainer";
import Serif from "../Serif";
import InfoText from "../Wrapped/InfoText";
import { Button } from "../ui/button";
import { ChevronRight, ExternalLink } from "lucide-react";

function HowToGetFile({ onContinue }: { onContinue: () => void }) {
  return (
    <WrappedContainer>
      <div className="p-12 rounded-xl bg-brand-light overflow-hidden max-w-xl mx-auto">
        <Serif>
          <h1 className="text-4xl md:text-5xl font-bold">
            How to get your TikTok data
          </h1>
        </Serif>

        <InfoText className="mt-6">
          Wrapped for TikTok gives you stats on your TikTok activity.
        </InfoText>
        <InfoText className="mt-3">
          To use it, you'll need your TikTok data export in the "
          <strong>JSON - Machine-readable file</strong>" file format.
        </InfoText>
        <InfoText className="mt-3">
          Your exported data does not include login credentials! For more info
          on how to verify this, look at the FAQ section on the home page.
        </InfoText>

        <a
          href="https://www.tiktok.com/setting/download-your-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="mt-6 bg-white w-full">
            Download TikTok data <ExternalLink size={16} className="ml-2" />
          </Button>
        </a>

        <Button onClick={onContinue} className="mt-6 w-full">
          I have my TikTok file <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </WrappedContainer>
  );
}

export default HowToGetFile;
