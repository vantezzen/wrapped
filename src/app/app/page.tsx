"use client";
import Wrapped from "@/lib/Wrapped";
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
import SpotifyFramePlayer from "@/lib/Spotify/FramePlayer";
import SpotifyPlayer from "@/components/Wrapped/SpotifyPlayer";
import wait from "@/lib/utils/wait";
import SpotifyInfoText from "@/components/Wrapped/SpotifyInfoText";
import MutedText from "@/components/Wrapped/MutedText";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { trackEvent } from "@/lib/analytics";
dayjs.extend(localizedFormat);

const WrappedPlayerComponent = dynamic(
  () => import("@/components/Wrapped/WrappedPlayerComponent"),
  {
    ssr: false,
  }
);

function TikTokWrappedAppPage() {
  const [page, setPageRaw] = React.useState("intro");
  const setPage = (page: string) => {
    setPageRaw(page);
    window.scrollTo(0, 0);
    trackEvent("page_" + page);
  };
  const [wrapped, setWrapped] = React.useState<Wrapped | null>(null);
  const [spotify, setSpotify] = React.useState<SpotifyFramePlayer | null>(null);

  return (
    <div>
      <SpotifyPlayer />

      {page === "intro" && (
        <IntroInformation onContinue={() => setPage("upload")} />
      )}

      {page === "upload" && (
        <FileUpload
          onFileSelect={async (file) => {
            setPage("loading");
            const creator = new WrappedCreator();
            try {
              const wrapped = await creator.fromFile(file);
              setWrapped(wrapped);
              console.log(wrapped.getPersona());
            } catch (e) {
              trackEvent("load_error");
              console.error(e);
              setPage("error");
              return;
            }

            const spotify = new SpotifyFramePlayer();
            await spotify.loadLibrary();
            setSpotify(spotify);

            await wait(5000);

            trackEvent(
              spotify.canPlaySongs ? "spotify_ready" : "spotify_error"
            );

            setPage(spotify.canPlaySongs ? "ready" : "spotify");
          }}
        />
      )}

      {page === "error" && (
        <WrappedContainer>
          <FatHeading>Something doesn't look right</FatHeading>
          <MutedText>
            We couldn't read your TikTok data export. Please make sure you
            selected the correct file format and try again.
          </MutedText>
          <Button
            onClick={() => {
              setPage("upload");
              trackEvent("try_again");
            }}
          >
            Try again
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "loading" && (
        <WrappedContainer>
          <Loader2 size={32} className="animate-spin" />
          <InfoText className="text-base">
            We're preparing your Wrapped...
          </InfoText>
        </WrappedContainer>
      )}

      {page === "spotify" && (
        <SpotifyInfoText onContinue={() => setPage("ready")} />
      )}

      {page === "ready" && (
        <WrappedContainer>
          <FatHeading>Your Wrapped is ready!</FatHeading>
          <InfoText>
            We've crunched the numbers and found some...interesting insights.
            <br />
            Are you ready to see them?
          </InfoText>

          <Button
            onClick={() => {
              setPage("play");
              trackEvent("play");
            }}
          >
            Show me!
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "play" && (
        <WrappedPlayerComponent
          statistics={wrapped!.getStatistics()}
          persona={wrapped!.getPersona()}
          spotify={spotify}
        />
      )}
    </div>
  );
}

export default TikTokWrappedAppPage;
