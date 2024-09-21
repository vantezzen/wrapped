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
import HowToGetFile from "@/components/Preparation/HowToGetFile";
import Serif from "@/components/Serif";
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
          onContinue={() => setPage("howto")}
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

      {page === "howto" && (
        <HowToGetFile onContinue={() => setPage("upload")} />
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
          <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Something doesn't look right
              </h1>
            </Serif>

            <InfoText className="mt-6">
              We couldn't read your TikTok data export. Please make sure you
              selected the correct file format and try again.
            </InfoText>

            <Button
              onClick={() => {
                setPage("upload");
                trackEvent("try_again");
              }}
              className="mt-6 w-full"
            >
              Try again
            </Button>
          </div>
        </WrappedContainer>
      )}

      {page === "possibly_empty" && (
        <WrappedContainer>
          <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Missing data in export
              </h1>
            </Serif>

            <InfoText className="mt-6">
              The TikTok data export you uploaded doesn't contain any data about
              videos watched. This might be because of the country you are using
              TikTok in or your privacy settings in the app. While we can still
              show you some statistics, data about your watch history will be
              blank.
            </InfoText>
            <InfoText className="mt-3">
              We're working on finding a workaround for this issue and will
              release an update as soon as possible.
            </InfoText>

            <Button
              onClick={() => {
                setPage("ready");
                trackEvent("possibly_empty_continue");
              }}
              className="mt-6 w-full"
            >
              Continue anyway
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </WrappedContainer>
      )}

      {page === "text" && (
        <WrappedContainer>
          <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Text data exports are not supported yet
              </h1>
            </Serif>

            <InfoText className="mt-6">
              It looks like you selected "TXT - Easy-to-read text file" as your
              file format when requesting your TikTok data export.
              Unfortunately, Wrapped for TikTok does not support this format yet
              as it cannot analyze the data inside.
            </InfoText>
            <InfoText className="mt-3">
              Please follow the instructions on the start page to request your
              data export again and be sure to select "
              <strong>JSON - Machine-readable</strong>" as the file format.
            </InfoText>
            <InfoText className="mt-3">
              If you modified the file, make sure your file has the correct file
              extension.
            </InfoText>

            <Button
              onClick={() => {
                setPage("intro");
                trackEvent("text_error_go_back");
              }}
              className="mt-6 w-full"
            >
              Go back
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
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
          <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                View Demo Wrapped
              </h1>
            </Serif>

            <InfoText className="mt-6">
              You can view a demo of Wrapped for TikTok with sample data if you
              want to.
            </InfoText>
            <InfoText className="mt-3">
              <strong>
                This is NOT your Wrapped, but a demo of what it could look like.
                <br />
                It does not use your TikTok data export.
              </strong>
            </InfoText>

            <Button
              onClick={() => {
                setPage("play");
                trackEvent("play_demo_click");
              }}
              className="mt-6 w-full"
            >
              Play demo
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
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
          <div className="p-12 rounded-xl bg-brand-light overflow-hidden max-w-xl mx-auto">
            <Serif>
              <h1 className="text-4xl md:text-5xl font-bold">
                Your Wrapped is ready!
              </h1>
            </Serif>

            <InfoText className="mt-6">
              We've crunched the numbers and found some...interesting insights.
            </InfoText>
            <InfoText className="mt-3">Are you ready to see them?</InfoText>

            <Button
              onClick={() => {
                setPage("play");
                trackEvent("play");
              }}
              className="mt-6 w-full"
            >
              Show me!
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </WrappedContainer>
      )}

      {page === "play" && (
        <WrappedPlayerComponent
          statistics={wrapped!.getStatistics()}
          persona={wrapped!.getPersona()}
          spotify={spotify}
          wrapped={wrapped!}
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
