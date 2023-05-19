import SpotifyFramePlayer from "./Spotify/FramePlayer";
import CommentsStatistic, {
  CommentsStatisticResult,
} from "./Statistics/CommentsStatistic";
import LikesStatistic, {
  LikesStatisticResult,
} from "./Statistics/LikesStatistic";
import LiveStatistic, { LiveStatisticResult } from "./Statistics/LiveStatistic";
import SharesStatistic, {
  SharesStatisticResult,
} from "./Statistics/SharesStatistic";
import Statistic from "./Statistics/Statistic";
import VideoAmountWatchedStatistic from "./Statistics/VideoAmountWatchedStatistic";
import WatchSessionsStatistic, {
  WatchSessionsStatisticResult,
} from "./Statistics/WatchSessionsStatistic";
import { TikTokUserData } from "./types";

export type Statistics = {
  name: string;
  videoAmountWatched: number;
  watchSessions: WatchSessionsStatisticResult;
  comments: CommentsStatisticResult;
  likes: LikesStatisticResult;
  shares: SharesStatisticResult;
  live: LiveStatisticResult;
};

export const SAMPLE_STATISTICS: Statistics = {
  name: "John",
  videoAmountWatched: 1000,
  watchSessions: {
    totalSessions: 100,
    totalWatchTimeSec: 10000,
    averageSessionLengthSec: 100,
    longestWatchSession: {
      startTime: new Date("2021-01-01 00:00:00"),
      endTime: new Date("2021-01-01 01:00:00"),
      lengthSec: 3600,
    },
    earliestVideoWatched: new Date("2021-01-01 00:00:00"),
    latestVideoWatched: new Date("2021-01-01 01:00:00"),
    mostActiveWeekday: {
      weekday: "Monday",
      averageUsageTime: 100,
    },
  },
  comments: {
    totalComments: 100,
    avgCommentLength: 100,
    mostUsedEmoji: {
      emoji: "😂",
      count: 100,
    },
  },
  likes: {
    totalLikes: 100,
    dayWithMostLikedPosts: {
      day: "2021-01-01",
      count: 100,
    },
    firstLikedVideo: {
      date: "2021-01-01 00:00:00",
      link: "https://www.tiktok.com/@tiktok/video/123456789",
    },
  },
  shares: {
    totalShares: 100,
    dayWithMostSharedPosts: {
      day: "2021-01-01",
      count: 100,
    },
    firstSharedVideo: {
      date: "2021-01-01 00:00:00",
      link: "https://www.tiktok.com/@tiktok/video/123456789",
    },
  },
  live: {
    totalLiveComments: 100,
    totalLiveViewed: 100,
  },
};

export default class Wrapped {
  public spotifyPlayer: SpotifyFramePlayer | null = null;

  constructor(public userData: TikTokUserData) {}

  public getStatistics(): Statistics {
    return {
      name: this.userData.Profile["Profile Information"].ProfileMap.userName,
      videoAmountWatched: this.caulculateStatistic(VideoAmountWatchedStatistic),
      watchSessions: this.caulculateStatistic(WatchSessionsStatistic),
      comments: this.caulculateStatistic(CommentsStatistic),
      likes: this.caulculateStatistic(LikesStatistic),
      shares: this.caulculateStatistic(SharesStatistic),
      live: this.caulculateStatistic(LiveStatistic),
    };
  }

  private caulculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);
    return statisticInstance.calculateResult();
  }
}
