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
import SpotifyInfoText from "@/components/Wrapped/SpotifyInfoText";
import MutedText from "@/components/Wrapped/MutedText";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { trackEvent } from "@/lib/analytics";
import HideForTime from "@/components/Wrapped/HideForTime";
import * as Sentry from "@sentry/nextjs";
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
        <IntroInformation
          onContinue={() => setPage("upload")}
          onDemo={async () => {
            trackEvent("demo");
            setPage("loading");

            const creator = new WrappedCreator();
            const wrapped = creator.forDemoMode();
            setWrapped(wrapped);

            const spotify = new SpotifyFramePlayer();
            await spotify.loadLibrary();
            setSpotify(spotify);

            trackEvent("demo_ready");
            setPage("demo");
          }}
        />
      )}

      {page === "upload" && (
        <FileUpload
          onFileSelect={async (file) => {
            setPage("loading");
            trackEvent("file_selected");

            if (file.name.endsWith(".txt")) {
              setPage("text");
              trackEvent("text_error");
              return;
            }

            if (!file.name.endsWith(".json") && !file.name.endsWith(".zip")) {
              setPage("unknown_file");
              trackEvent("unknown_file_error");
              trackEvent("unknown_file_error_" + file.name.split(".").pop());
              return;
            }

            const creator = new WrappedCreator();
            let wrapped: Wrapped;
            try {
              wrapped = await creator.fromFile(file);
              setWrapped(wrapped);

              trackEvent("file_loaded");
            } catch (e) {
              trackEvent("load_error");
              console.error(e);
              setPage(creator.isTextExport ? "text" : "error");
              return;
            }

            try {
              console.log("stats", wrapped?.getStatistics());
            } catch (e) {
              Sentry.captureException(
                new Error("Exception when calculating statistics"),
                {
                  extra: {
                    originalError: e,
                  },
                }
              );
            }

            try {
              wrapped?.getPersona();
            } catch (e) {
              Sentry.captureException(
                new Error("Exception when calculating persona"),
                {
                  extra: {
                    originalError: e,
                  },
                }
              );
            }

            const spotify = new SpotifyFramePlayer();
            await spotify.loadLibrary();
            setSpotify(spotify);
            trackEvent("spotify_loaded");

            if (wrapped.possiblyEmptyExport) {
              trackEvent("possibly_empty");
              setPage("possibly_empty");
            } else if (spotify.canPlaySongs) {
              trackEvent("spotify_ready");
              setPage("ready");
            } else {
              trackEvent("spotify_error");
              setPage("spotify");
            }
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

      {page === "possibly_empty" && (
        <WrappedContainer>
          <FatHeading>Missing data in export</FatHeading>
          <MutedText className="mx-auto max-w-xl">
            The TikTok data export you uploaded doesn't contain any data about
            videos watched. This might be because of the country you are using
            TikTok in or your privacy settings in the app. While we can still
            show you some statistics, data about your watch history will be
            blank.
            <br />
            We're working on finding a workaround for this issue and will
            release an update as soon as possible.
          </MutedText>
          <Button
            onClick={() => {
              setPage("ready");
              trackEvent("possibly_empty_continue");
            }}
          >
            Continue anyway
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "text" && (
        <WrappedContainer>
          <FatHeading>Text data exports are not supported yet</FatHeading>
          <MutedText className="max-w-lg mx-auto">
            It looks like you selected "TXT - Easy-to-read text file" as your
            file format when requesting your TikTok data export. Unfortunately,
            Wrapped for TikTok does not support this format yet as it cannot
            analyze the data inside.
            <br />
            <br />
            Please follow the instructions on the start page to request your
            data export again and be sure to select "
            <strong>JSON - Machine-readable</strong>" as the file format.
            <br />
            If you modified the file, make sure your file has the correct file
            extension.
          </MutedText>
          <Button
            onClick={() => {
              setPage("intro");
              trackEvent("text_error_go_back");
            }}
          >
            Go back
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "unknown_file" && (
        <WrappedContainer>
          <FatHeading>Unknown file format</FatHeading>
          <MutedText className="max-w-lg mx-auto">
            It looks like you selected an unknown file format. Please make sure
            you select a ".json" or ".zip" file. Make sure you selected "JSON -
            Machine-readable" as the file format when requesting your TikTok
            data export.
            <br />
            If you modified the file, make sure your file has the correct file
            extension.
          </MutedText>
          <Button
            onClick={() => {
              setPage("intro");
              trackEvent("text_error_go_back");
            }}
          >
            Go back
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </WrappedContainer>
      )}

      {page === "demo" && (
        <WrappedContainer>
          <FatHeading>View Demo Wrapped</FatHeading>
          <MutedText className="max-w-xl mx-auto">
            You can view a demo of Wrapped for TikTok with sample data if you
            want to.
            <br />
            <strong>
              This is NOT your Wrapped, but a demo of what it could look like.
              <br />
              It does not use your TikTok data export.
            </strong>
            <br />
            <br />
            The data is randomly generated and does not represent any real
            TikTok user - if you want to see your own Wrapped, you can reload
            the page at any time and upload your own data export.
          </MutedText>
          <Button
            onClick={() => {
              setPage("play");
              trackEvent("play_demo_click");
            }}
          >
            Play demo
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
          <HideForTime time={8000}>
            <MutedText className="text-sm">
              Uh oh, this is taking longer than expected...
            </MutedText>
          </HideForTime>
          <HideForTime time={15000}>
            <MutedText className="text-sm text-center">
              This should've been done by now...
              <br />
              If it doesn't start soon try reloading
              <br />
              the page and uploading your TikTok data export again.
            </MutedText>
          </HideForTime>
        </WrappedContainer>
      )}

      {page === "spotify" && (
        <SpotifyInfoText
          onContinue={() => {
            setPage("ready");
            trackEvent("continue_without_spotify");
          }}
        />
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
          isDemo={wrapped!.demoMode}
        />
      )}

      {page === "play" && wrapped?.demoMode && (
        <div className="fixed bottom-12 left-12 right-12 z-0 opacity-60 text-zinc-500 break-words">
          <h2 className="text-2xl md:text-4xl font-bold">Demo Mode</h2>
          <p className="text-sm">
            This is a demo of Wrapped for TikTok. It does not use your real
            TikTok data.
            <br />
            To see your own Wrapped, reload the page and upload your TikTok
            data.
          </p>
        </div>
      )}
    </div>
  );
}

export default TikTokWrappedAppPage;
