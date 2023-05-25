import Statistic from "./Statistic";

export type SharesStatisticResult = {
  totalShares: number;
  dayWithMostSharedPosts: {
    day: string;
    count: number;
  };
  firstSharedVideo: {
    date: string;
    link: string;
  };
};

export default class SharesStatistic extends Statistic<SharesStatisticResult> {
  name = "SharesStatistic";

  calculateResult(): SharesStatisticResult {
    let dayWithMostSharedPosts = {
      day: "",
      count: 0,
    };

    const sharedPosts =
      this.wrapped.userData.Activity[
        "Share History"
      ].ShareHistoryList?.reverse();
    const totalShares = sharedPosts?.length ?? 0;
    if (!sharedPosts) {
      return {
        totalShares: 0,
        dayWithMostSharedPosts: {
          day: "",
          count: 0,
        },
        firstSharedVideo: {
          date: "",
          link: "",
        },
      };
    }

    for (let i = 0; i < sharedPosts.length; i++) {
      const post = sharedPosts[i];

      const date = new Date(post.Date);
      const day = date.toDateString();
      if (dayWithMostSharedPosts.day === day) {
        dayWithMostSharedPosts.count++;
      } else {
        dayWithMostSharedPosts.day = day;
        dayWithMostSharedPosts.count = 1;
      }
    }

    return {
      totalShares: totalShares,
      dayWithMostSharedPosts: dayWithMostSharedPosts,
      firstSharedVideo: {
        date: sharedPosts[0].Date,
        link: sharedPosts[0].Link,
      },
    };
  }

  getDefaultValue(): SharesStatisticResult {
    return {
      totalShares: 0,
      dayWithMostSharedPosts: {
        day: "",
        count: 0,
      },
      firstSharedVideo: {
        date: "",
        link: "",
      },
    };
  }
}
