import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, PlugZap } from "lucide-react";
import Faq from "../Preparation/Faq";
import heroImage from "@/app/hero.png";
import Image from "next/image";
import Footer from "../Footer";

function IntroInformation({
  onContinue,
  onDemo,
}: {
  onContinue: () => void;
  onDemo: () => void;
}) {
  return (
    <WrappedContainer>
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-12">
        <div className="flex flex-col justify-center gap-6 text-left">
          <FatHeading>Wrapped for TikTok</FatHeading>
          <InfoText>Get insights into your time on TikTok 🚀</InfoText>

          <div className="max-w-xl">
            <MutedText className="break-words hyphens-auto">
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
              in the "<strong>JSON - Machine-readable file</strong>" file
              format.
              <br />
              Your exported data does not include login credentials or any other
              sensitive information. For more info on how to verify this, look
              at the FAQ section below.
            </MutedText>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="https://www.tiktok.com/setting/download-your-data"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="dark w-full">
                Open TikTok and request my data export
                <ExternalLink className="ml-2" size={16} />
              </Button>
            </a>
            <Button onClick={onContinue} className="w-full">
              I have my TikTok data export, let's go!
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button className="dark w-full bg-starship-100" onClick={onDemo}>
              Show demo Wrapped
              <PlugZap className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        <div>
          <Image
            src={heroImage}
            alt="Wrapped for TikTok"
            width={1080}
            height={1920}
            style={{
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
        </div>
      </div>

      <FatHeading className="mt-12 mb-6 text-xl">
        Frequently Asked Questions
      </FatHeading>
      <Faq />

      <Footer />
    </WrappedContainer>
  );
}

export default IntroInformation;
