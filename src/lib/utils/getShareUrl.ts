import Persona from "../Statistics/Personas/Persona";
import { Statistics } from "../Wrapped";
import { ShareImageData } from "../types";

export default function getShareUrl(statistics: Statistics, persona: Persona) {
  const data: ShareImageData = {
    name: statistics.name,
    totalWatchTime: statistics.watchSessions.totalWatchTimeSec,
    totalVideosWatched: statistics.videoAmountWatched,
    totalWatchSessions: statistics.watchSessions.totalSessions,
    totalComments: statistics.comments.totalComments,
    averageSessionLength: statistics.watchSessions.averageSessionLengthSec,
    mostUsedEmoji: statistics.comments.mostUsedEmoji.emoji,
    totalLikes: statistics.likes.totalLikes,
    persona: persona.name,
  };

  const url = new URL("/api/image", window.location.href);
  url.searchParams.set("data", JSON.stringify(data));

  return url.toString();
}
