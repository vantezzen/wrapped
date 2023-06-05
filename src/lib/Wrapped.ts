import SpotifyFramePlayer from "./Spotify/FramePlayer";
import CommentsStatistic, {
  CommentsStatisticResult,
} from "./Statistics/CommentsStatistic";
import LikesStatistic, {
  LikesStatisticResult,
} from "./Statistics/LikesStatistic";
import LiveStatistic, { LiveStatisticResult } from "./Statistics/LiveStatistic";
import Persona from "./Statistics/Personas/Persona";
import SharesStatistic, {
  SharesStatisticResult,
} from "./Statistics/SharesStatistic";
import Statistic from "./Statistics/Statistic";
import VideoAmountWatchedStatistic from "./Statistics/VideoAmountWatchedStatistic";
import WatchSessionsStatistic, {
  WatchSessionsStatisticResult,
} from "./Statistics/WatchSessionsStatistic";
import { TikTokUserData } from "./types";
import defaultPersonas, {
  TikTokEnjoyer,
} from "./Statistics/Personas/defaultPersonas";
import seedrandom from "seedrandom";
import * as Sentry from "@sentry/nextjs";

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
  name: "John Doe",
  videoAmountWatched: 81737,
  watchSessions: {
    totalSessions: 1823,
    totalWatchTimeSec: 60 * 60 * 24 * 29, // 29 days
    averageSessionLengthSec: 60 * 120, // 120 minutes
    longestWatchSession: {
      startTime: new Date("2021-01-01 00:00:00"),
      endTime: new Date("2021-01-01 01:00:00"),
      lengthSec: 60 * 60 * 5,
    },
    earliestVideoWatched: new Date("2021-01-01 00:00:00"),
    latestVideoWatched: new Date(),
    mostActiveWeekday: {
      weekday: "Monday",
      averageUsageTime: 60 * 60 * 4,
    },
  },
  comments: {
    totalComments: 712,
    avgCommentLength: 29,
    mostUsedEmoji: {
      emoji: "😂",
      count: 521,
    },
  },
  likes: {
    totalLikes: 8237,
    dayWithMostLikedPosts: {
      day: "2021-01-01",
      count: 92,
    },
    firstLikedVideo: {
      date: "2021-01-01 00:00:00",
      link: "https://www.tiktok.com/@tiktok/video/123456789",
    },
  },
  shares: {
    totalShares: 293,
    dayWithMostSharedPosts: {
      day: "2021-01-01",
      count: 12,
    },
    firstSharedVideo: {
      date: "2021-01-01 00:00:00",
      link: "https://www.tiktok.com/@tiktok/video/123456789",
    },
  },
  live: {
    totalLiveComments: 121,
    totalLiveViewed: 823,
  },
};

export default class Wrapped {
  public spotifyPlayer: SpotifyFramePlayer | null = null;
  public demoMode = false;
  public possiblyEmptyExport = false;

  constructor(public userData: TikTokUserData) {
    if (
      userData.Activity &&
      (!userData.Activity["Video Browsing History"].VideoList ||
        userData.Activity["Video Browsing History"].VideoList?.length === 0)
    ) {
      this.possiblyEmptyExport = true;
    }
  }

  public getStatistics(): Statistics {
    console.log("Getting statistics", this.userData);

    if (this.demoMode) {
      return SAMPLE_STATISTICS;
    }

    return {
      name: this.userData.Profile["Profile Information"].ProfileMap.userName,
      videoAmountWatched: this.calculateStatistic(VideoAmountWatchedStatistic),
      watchSessions: this.calculateStatistic(WatchSessionsStatistic),
      comments: this.calculateStatistic(CommentsStatistic),
      likes: this.calculateStatistic(LikesStatistic),
      shares: this.calculateStatistic(SharesStatistic),
      live: this.calculateStatistic(LiveStatistic),
    };
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      Sentry.captureException(
        new Error(`Failed to calculate statistic ${statistic.name}`),
        {
          extra: {
            originalException: e,
          },
        }
      );
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }

  public getPersona(): Persona {
    const statistics = this.getStatistics();
    const fittingScores = defaultPersonas.map((persona) => {
      let score = 0;
      try {
        score = persona.getFittingScore(statistics);
      } catch (e) {
        Sentry.captureException(
          new Error(`Failed to calculate persona ${persona.name}`),
          {
            extra: {
              originalException: e,
            },
          }
        );
      }

      return {
        persona,
        score,
      };
    });

    const bestFittingPersonas = fittingScores
      .filter((fittingScore) => {
        return fittingScore.score > 0.6;
      })
      .sort((a, b) => {
        return b.score - a.score;
      })
      .slice(0, 3);

    if (bestFittingPersonas.length === 0) {
      return new TikTokEnjoyer();
    }

    console.log(`Best fitting personas`, fittingScores, bestFittingPersonas);

    const rng = seedrandom("hello.");
    const randomPersonas = bestFittingPersonas.sort(() => {
      return rng() - 0.5;
    });

    return randomPersonas[0].persona;
  }
}
