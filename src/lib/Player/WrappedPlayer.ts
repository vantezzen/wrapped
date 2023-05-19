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

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
};

const SLIDES: Slide[] = [
  {
    name: "Intro",
    component: Intro,
    duration: 6000,
  },
  {
    name: "WatchedVideos",
    component: WatchedVideos,
    duration: 6000,
  },
  {
    name: "WatchSessions",
    component: WatchSessions,
    duration: 6000,
  },
  {
    name: "WatchSessionLength",
    component: WatchSessionLength,
    duration: 6000,
  },
  {
    name: "TotalWatchTime",
    component: TotalWatchTime,
    duration: 6000,
  },
  {
    name: "WatchTimeComparableActivity",
    component: WatchTimeComparableActivity,
    duration: 6000,
  },
  {
    name: "Comments",
    component: Comments,
    duration: 6000,
  },
  {
    name: "Likes",
    component: Likes,
    duration: 6000,
  },
  {
    name: "Roundup",
    component: Roundup,
    duration: 6000,
  },
];

export default class WrappedPlayer extends EventEmitter {
  public currentSlide: Slide | null = null;

  constructor() {
    super();
  }

  public async play() {
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];
      this.currentSlide = slide;
      this.emit("update");
      await this.wait(slide.duration);
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
