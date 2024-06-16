import { WrappedSlideProps } from "@/components/Wrapped/WrappedContainer";
import EventEmitter from "events";
import Intro from "@/components/Wrapped/Slides/Intro";
import WatchedVideos from "@/components/Wrapped/Slides/WatchedVideos";
import WatchSessions from "@/components/Wrapped/Slides/WatchSessions";
import TotalWatchTime from "@/components/Wrapped/Slides/TotalWatchTime";
import WatchTimeComparableActivity from "@/components/Wrapped/Slides/WatchTimeComparableActivity";
import Comments from "@/components/Wrapped/Slides/Comments";
import Likes from "@/components/Wrapped/Slides/Likes";
import WatchSessionLength from "@/components/Wrapped/Slides/WatchSessionLength";
import Roundup from "@/components/Wrapped/Slides/Roundup";
import MostActiveWeekday from "@/components/Wrapped/Slides/MostActiveWeekday";
import SpotifyFramePlayer from "../Spotify/FramePlayer";
import Persona from "@/components/Wrapped/Slides/Persona";
import LongestWatchSession from "@/components/Wrapped/Slides/LongestWatchSession";
import { trackEvent } from "../analytics";
import { Statistics } from "../Wrapped";
import TotalStorage from "@/components/Wrapped/Slides/TotalStorage";

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
  spotify?: {
    uri: string;
  };
  skip?: (statistics: Statistics) => boolean;
};

const SLIDES: Slide[] = [
  {
    name: "Intro",
    component: Intro,
    duration: 6000,
    spotify: {
      uri: "spotify:track:7KA4W4McWYRpgf0fWsJZWB",
    },
  },
  {
    name: "WatchedVideos",
    component: WatchedVideos,
    duration: 6000,
    skip: (statistics) => statistics.videoAmountWatched === 0,
  },
  {
    name: "WatchSessions",
    component: WatchSessions,
    duration: 6000,
    spotify: {
      uri: "spotify:track:6AQbmUe0Qwf5PZnt4HmTXv",
    },
    skip: (statistics) => statistics.watchSessions.totalSessions === 0,
  },
  {
    name: "WatchSessionLength",
    component: WatchSessionLength,
    duration: 6000,
    skip: (statistics) =>
      statistics.watchSessions.averageSessionLengthSec === 0,
  },
  {
    name: "TotalWatchTime",
    component: TotalWatchTime,
    duration: 6000,
    skip: (statistics) => statistics.watchSessions.totalWatchTimeSec === 0,
  },
  {
    name: "WatchTimeComparableActivity",
    component: WatchTimeComparableActivity,
    duration: 8000,
    skip: (statistics) => statistics.watchSessions.totalWatchTimeSec === 0,
  },
  {
    name: "LongestWatchSession",
    component: LongestWatchSession,
    duration: 6000,
    spotify: {
      uri: "spotify:track:1Qrg8KqiBpW07V7PNxwwwL",
    },
    skip: (statistics) =>
      statistics.watchSessions.longestWatchSession.lengthSec === 0,
  },
  {
    name: "TotalStorage",
    component: TotalStorage,
    duration: 7000,
    skip: (statistics) => statistics.watchSessions.totalWatchTimeSec === 0,
  },
  {
    name: "MostActiveWeekday",
    component: MostActiveWeekday,
    duration: 6000,
    skip: (statistics) =>
      statistics.watchSessions.mostActiveWeekday.averageUsageTime === 0,
  },
  {
    name: "Comments",
    component: Comments,
    duration: 6000,
    spotify: {
      uri: "spotify:track:6UN73IYd0hZxLi8wFPMQij",
    },
    skip: (statistics) => statistics.comments.totalComments === 0,
  },
  {
    name: "Likes",
    component: Likes,
    duration: 6000,
    skip: (statistics) => statistics.likes.totalLikes === 0,
  },
  {
    name: "Persona",
    component: Persona,
    duration: 6000,
    skip: (statistics) => statistics.likes.totalLikes === 0,
  },
  {
    name: "Roundup",
    component: Roundup,
    duration: 6000,
    spotify: {
      uri: "spotify:track:5odlY52u43F5BjByhxg7wg",
    },
  },
];

export default class WrappedPlayer extends EventEmitter {
  public currentSlide: Slide | null = null;
  public statistics: Statistics | null = null;
  public autoAdvance = true;

  constructor(public spotifyPlayer: SpotifyFramePlayer | null = null) {
    super();
  }

  public async play(statistics: Statistics) {
    this.statistics = statistics;
    this.nextSlide();
  }

  public async nextSlide() {
    const currentIndex = this.currentSlide
      ? SLIDES.indexOf(this.currentSlide)
      : -1;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= SLIDES.length) {
      return;
    }

    const nextSlide = SLIDES[nextIndex];
    this.currentSlide = nextSlide;

    if (nextSlide.skip && nextSlide.skip(this.statistics!)) {
      // Directly skip to the next slide if the current slide should be skipped
      await this.nextSlide();
      return;
    }

    if (this.currentSlide.spotify && this.spotifyPlayer) {
      await this.spotifyPlayer.playSong(this.currentSlide.spotify.uri);
    }
    trackEvent(`slide-${nextSlide.name}`);

    this.emit("update");

    await this.wait(nextSlide.duration);
    if (this.currentSlide === nextSlide && this.autoAdvance) {
      // If the slide hasn't changed, automatically go to the next one
      await this.nextSlide();
    }
  }

  public async previousSlide() {
    if (!this.currentSlide) {
      return;
    }

    const currentIndex = SLIDES.indexOf(this.currentSlide);
    const previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
      return;
    }

    const previousSlide = SLIDES[previousIndex];
    this.currentSlide = previousSlide;

    if (previousSlide.skip && previousSlide.skip(this.statistics!)) {
      // Directly skip to the previous slide if the current slide should be skipped
      await this.previousSlide();
      return;
    }

    if (this.currentSlide.spotify && this.spotifyPlayer) {
      this.spotifyPlayer.playSong(this.currentSlide.spotify.uri);
    }
    trackEvent(`slide-${previousSlide.name}`);

    this.emit("update");

    // await this.wait(previousSlide.duration);
    // if (this.currentSlide === previousSlide) {
    //   await this.nextSlide();
    // }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
