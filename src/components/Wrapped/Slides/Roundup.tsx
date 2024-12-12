import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import getShareUrl from "@/lib/utils/getShareUrl";
import { Loader2, Share2 } from "lucide-react";
import shareImage from "@/lib/utils/shareImage";
import { trackEvent } from "@/lib/analytics";
import Projects from "@/components/Projects";
import AdUnit from "@/components/AdUnit";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLoadFullAd } from "@/lib/ads";
// import DonateModal from "@/components/DataDonation/DonateModal";

function Roundup({ statistics, persona, wrapped }: WrappedSlideProps) {
  const { amount: totalWatchTimeAmount, unit: totalWatchTimeUnit } =
    formatTimeLength(statistics.watchSessions.totalWatchTimeSec);
  const totalWatchTimeMins = Math.round(
    statistics.watchSessions.totalWatchTimeSec / 60
  );

  useLoadFullAd();

  const { amount: averageSessionLengthAmount, unit: averageSessionLengthUnit } =
    formatTimeLength(statistics.watchSessions.averageSessionLengthSec);

  const { amount: longestWatchSessionAmount, unit: longestWatchSessionUnit } =
    formatTimeLength(statistics.watchSessions.longestWatchSession.lengthSec);

  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);

  return (
    <WrappedContainer>
      <div className="p-12">
        <h1 className="text-2xl font-black animate-in slide-in-from-bottom fade-in duration-1000 pb-12">
          And you did so much more...
        </h1>

        <Alert className="text-left max-w-lg mx-auto mb-6">
          <AlertTitle>Did you like your Wrapped?</AlertTitle>

          <AlertDescription>
            Wrapped for TikTok is privacy-centered and will always be free - to
            help me keep it that way, consider supporting me on Buy Me a Coffee!
          </AlertDescription>

          <div className="flex justify-center mt-3">
            <a
              href="https://buymeacoffee.com/vantezzen"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image
                src="/bmc.png"
                alt="Buy me a coffee"
                width={150}
                height={50}
              />
            </a>
          </div>
        </Alert>

        <AdUnit adSlot="7452322179" />

        <div className="w-4xl text-zinc-900 text-left font-bold">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  <strong className="">Watch Sessions</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total videos watched
                </TableCell>
                <TableCell>
                  {statistics.videoAmountWatched.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total watch time
                </TableCell>
                <TableCell>
                  {totalWatchTimeAmount} {totalWatchTimeUnit} (
                  {totalWatchTimeMins} minutes)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Watch sessions
                </TableCell>
                <TableCell>
                  {statistics.watchSessions.totalSessions.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Average session length
                </TableCell>
                <TableCell>
                  {Math.abs(averageSessionLengthAmount)}{" "}
                  {averageSessionLengthUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Longest watch session
                </TableCell>
                <TableCell>
                  {dayjs(
                    statistics.watchSessions.longestWatchSession.startTime
                  ).format("L")}{" "}
                  ({longestWatchSessionAmount} {longestWatchSessionUnit})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Earliest video watched in data
                </TableCell>
                <TableCell>
                  {dayjs(statistics.watchSessions.earliestVideoWatched).format(
                    "LLL"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Last video watched in data
                </TableCell>
                <TableCell>
                  {dayjs(statistics.watchSessions.latestVideoWatched).format(
                    "LLL"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Most active weekday
                </TableCell>
                <TableCell>
                  {statistics.watchSessions.mostActiveWeekday.weekday}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  <strong className="">Comments</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total Comments
                </TableCell>
                <TableCell>
                  {statistics.comments.totalComments.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Average Comment Length
                </TableCell>
                <TableCell>
                  {Math.round(statistics.comments.avgCommentLength)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Most used emoji
                </TableCell>
                <TableCell>
                  {statistics.comments.mostUsedEmoji.emoji} (x
                  {statistics.comments.mostUsedEmoji.count.toLocaleString()})
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  <strong className="">Likes</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total likes
                </TableCell>
                <TableCell>
                  {statistics.likes.totalLikes.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Day with most liked posts
                </TableCell>
                <TableCell>
                  {dayjs(statistics.likes.dayWithMostLikedPosts.day).format(
                    "L"
                  )}{" "}
                  (x
                  {statistics.likes.dayWithMostLikedPosts.count.toLocaleString()}
                  )
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  First liked video
                </TableCell>
                <TableCell>
                  {dayjs(statistics.likes.firstLikedVideo.date).format("L")}
                  <br />
                  <a
                    href={statistics.likes.firstLikedVideo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  <strong className="">Shares</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total shares
                </TableCell>
                <TableCell>
                  {statistics.shares.totalShares.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Day with most shared posts
                </TableCell>
                <TableCell>
                  {dayjs(statistics.shares.dayWithMostSharedPosts.day).format(
                    "L"
                  )}{" "}
                  (x
                  {statistics.shares.dayWithMostSharedPosts.count.toLocaleString()}
                  )
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  First shared video
                </TableCell>
                <TableCell>
                  {dayjs(statistics.shares.firstSharedVideo.date).format("L")}
                  <br />
                  <a
                    href={statistics.shares.firstSharedVideo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  <strong className="">Live</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total Lives viewed
                </TableCell>
                <TableCell>
                  {statistics.live.totalLiveViewed.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Total comments on lives
                </TableCell>
                <TableCell>
                  {statistics.live.totalLiveComments.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  <strong className="">Persona</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Your persona
                </TableCell>
                <TableCell>{persona.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-800 font-medium">
                  Description
                </TableCell>
                <TableCell>{persona.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <hr className="my-12" />

          <h3 className="text-xl font-bold">Liked your Wrapped?</h3>
          <a
            href="https://buymeacoffee.com/vantezzen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/bmc.png"
              alt="Buy me a coffee"
              width={200}
              height={50}
            />
          </a>

          <AdUnit adSlot="7452322179" />

          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);

              const url = getShareUrl(statistics, persona);
              await shareImage(url);
              trackEvent("share_image");

              setTimeout(() => {
                setIsLoadingShareImage(false);
              }, 1000);
            }}
            className="mt-12 w-full"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Share2 className="inline-block mr-2" size={16} />
                Share image
              </>
            )}
          </Button>

          <Projects />

          <AdUnit adSlot="7452322179" />
        </div>
      </div>
    </WrappedContainer>
  );
}

export default Roundup;
