import { Statistics } from "../Wrapped";
import { ShareImageData } from "../types";

export default function getShareUrl(statistics: Statistics) {
  const data: ShareImageData = {
    name: statistics.name,
    totalWatchTime: statistics.watchSessions.totalWatchTimeSec,
    totalVideosWatched: statistics.videoAmountWatched,
    totalWatchSessions: statistics.watchSessions.totalSessions,
    totalComments: statistics.comments.totalComments,
    averageSessionLength: statistics.watchSessions.averageSessionLengthSec,
    mostUsedEmoji: statistics.comments.mostUsedEmoji.emoji,
    totalLikes: statistics.likes.totalLikes,
  };

  const url = new URL("/api/image", window.location.href);
  url.searchParams.set("data", JSON.stringify(data));

  return url.toString();
}
