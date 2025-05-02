import Statistic from "./Statistic";

export type LiveStatisticResult = {
  totalLiveViewed: number;
  totalLiveComments: number;
};

export default class LiveStatistic extends Statistic<LiveStatisticResult> {
  name = "LiveStatistic";

  calculateResult(): LiveStatisticResult {
    const liveInfo =
      this.wrapped.userData["TikTok Live"] ??
      this.wrapped.userData["Tiktok Live"];
    const livePostsMap = liveInfo["Watch Live History"].WatchLiveMap;
    if (!livePostsMap) {
      return {
        totalLiveViewed: 0,
        totalLiveComments: 0,
      };
    }

    const livePosts = Object.values(livePostsMap);

    return {
      totalLiveViewed: livePosts.length,
      totalLiveComments: livePosts.reduce(
        (acc, curr) => acc + (curr.Comments?.length ?? 0),
        0
      ),
    };
  }

  getDefaultValue(): LiveStatisticResult {
    return {
      totalLiveViewed: 0,
      totalLiveComments: 0,
    };
  }
}
