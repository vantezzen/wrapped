import Statistic from "./Statistic";

export default class VideoAmountWatchedStatistic extends Statistic<number> {
  name = "VideoAmountWatchedStatistic";

  calculateResult(): number {
    const userActivity =
      this.wrapped.userData["Your Activity"] ?? this.wrapped.userData.Activity;
    const watchHistory =
      userActivity["Watch History"] ?? userActivity["Video Browsing History"];
    return watchHistory.VideoList?.length ?? 0;
  }

  getDefaultValue(): number {
    return 0;
  }
}
