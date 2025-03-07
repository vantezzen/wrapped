import Statistic from "./Statistic";

export default class VideoAmountWatchedStatistic extends Statistic<number> {
  name = "VideoAmountWatchedStatistic";

  calculateResult(): number {
    return (
      this.wrapped.userData["Your Activity"]["Watch History"].VideoList
        ?.length ?? 0
    );
  }

  getDefaultValue(): number {
    return 0;
  }
}
