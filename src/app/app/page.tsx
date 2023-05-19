"use client";
import Wrapped, { SAMPLE_STATISTICS } from "@/lib/Wrapped";
import React from "react";
import dynamic from "next/dynamic";
import FileUpload from "@/components/Preparation/FileUpload";
import WrappedCreator from "@/lib/WrappedCreator";
import WrappedContainer from "@/components/Wrapped/WrappedContainer";
import FatHeading from "@/components/Wrapped/FatHeading";
import InfoText from "@/components/Wrapped/InfoText";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import IntroInformation from "@/components/Wrapped/IntroInformation";

const WrappedPlayerComponent = dynamic(
  () => import("@/components/Wrapped/WrappedPlayerComponent"),
  {
    ssr: false,
  }
);

function TikTokWrappedAppPage() {
  const [page, setPage] = React.useState("intro");
  const [wrapped, setWrapped] = React.useState<Wrapped | null>(null);

  return (
    <div>
      {page === "intro" && (
        <IntroInformation onContinue={() => setPage("upload")} />
      )}

      {page === "upload" && (
        <FileUpload
          onFileSelect={async (file) => {
            setPage("loading");
            const creator = new WrappedCreator();
            const wrapped = await creator.fromFile(file);
            setWrapped(wrapped);
            setPage("ready");
          }}
        />
      )}

      {page === "loading" && (
        <WrappedContainer>
          <Loader2 size={32} className="animate-spin" />
          <InfoText className="text-base">
            We're preparing your Wrapped...
          </InfoText>
        </WrappedContainer>
      )}

      {page === "ready" && (
        <WrappedContainer>
          <FatHeading>Your Wrapped is ready!</FatHeading>
          <InfoText>
            We've crunched the numbers and found some...interesting insights.
            <br />
            Are you ready to see them?
          </InfoText>

          <Button onClick={() => setPage("play")}>
            Show me!
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "play" && (
        <WrappedPlayerComponent statistics={wrapped!.getStatistics()} />
      )}
    </div>
  );
}

export default TikTokWrappedAppPage;
