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
import Projects from "../Projects";

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
              Your exported data does not include login credentials! For more
              info on how to verify this, look at the FAQ section below.
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

      <FatHeading className="mt-12 mb-6 text-xl">A quick tutorial</FatHeading>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/uIvhVxNJAtc"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="max-w-[80vw]"
      ></iframe>

      <FatHeading className="mt-12 mb-6 text-xl">
        Frequently Asked Questions
      </FatHeading>
      <Faq />

      <Projects />

      <MutedText className="max-w-lg mx-auto mt-6 text-sm font-medium text-zinc-600">
        <strong>For the Search Engines:</strong>
        <p>
          Welcome to Wrapped for TikTok - Your Ultimate Source for TikTok
          Activity Insights:
        </p>
        <p>
          Are you looking to gain valuable insights into your TikTok activity?
          Look no further than Wrapped for TikTok! It offers comprehensive stats
          and analytics to help you understand your presence on TikTok.
        </p>
        <p>
          With Wrapped for TikTok, you can easily access in-depth information
          about your TikTok performance, including total videos viewed, watch
          session length, and much more.
        </p>
        <p>
          To get started, you'll need to download your TikTok data export from
          the official TikTok website. Simply visit{" "}
          <a href="https://www.tiktok.com/setting/download-your-data">
            https://www.tiktok.com/setting/download-your-data
          </a>{" "}
          and request your data in the "JSON - Machine-readable file" format.
          Don't worry, this file does not contain any sensitive information or
          login credentials. For additional reassurance, please refer to our FAQ
          section for a detailed explanation of how we handle your data.
        </p>
        <p>
          At Wrapped for TikTok, we prioritize your privacy and security. Unlike
          other platforms, your TikTok data is never uploaded or stored on our
          servers. Our tool operates exclusively within your browser, ensuring
          that your information remains confidential. We take pride in being a
          privacy-centered service, committed to protecting your data at all
          times.
        </p>
        <p>
          To provide complete transparency, we have made the full source code of
          Wrapped for TikTok available on GitHub. You can visit our GitHub
          repository at{" "}
          <a href="https://github.com/vantezzen/wrapped">
            https://github.com/vantezzen/wrapped
          </a>{" "}
          to review the code and verify its integrity. We believe in openness
          and accountability, and we want our users to have full confidence in
          our platform.
        </p>
        <p>
          Embrace the power of Wrapped for TikTok and uncover the insights that
          will propel your TikTok journey forward. Join our growing community of
          TikTok enthusiasts who use Wrapped for TikTok to deliver accurate,
          reliable, and actionable statistics.
        </p>
      </MutedText>

      <Footer />
    </WrappedContainer>
  );
}

export default IntroInformation;
