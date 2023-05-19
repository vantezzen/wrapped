import Statistic from "./Statistic";

export default class VideoAmountWatchedStatistic extends Statistic<number> {
  calculateResult(): number {
    return (
      this.wrapped.userData.Activity["Video Browsing History"].VideoList
        ?.length ?? 0
    );
  }
}
