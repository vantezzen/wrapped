import Statistic from "./Statistic";

export type LikesStatisticResult = {
  totalLikes: number;
  dayWithMostLikedPosts: {
    day: string;
    count: number;
  };
  firstLikedVideo: {
    date: string;
    link: string;
  };
};

export default class LikesStatistic extends Statistic<LikesStatisticResult> {
  name = "LikesStatistic";

  calculateResult(): LikesStatisticResult {
    const likedPosts =
      this.wrapped.userData.Activity["Like List"].ItemFavoriteList?.reverse();
    const totalLikes = likedPosts?.length ?? 0;
    if (!likedPosts) {
      return {
        totalLikes: 0,
        dayWithMostLikedPosts: {
          day: "",
          count: 0,
        },
        firstLikedVideo: {
          date: "",
          link: "",
        },
      };
    }

    const likedPerDay = new Map<string, number>();
    for (let i = 0; i < likedPosts.length; i++) {
      const post = likedPosts[i];

      const date = new Date(post.Date);
      const day = date.toDateString();
      if (likedPerDay.has(day)) {
        likedPerDay.set(day, likedPerDay.get(day)! + 1);
      } else {
        likedPerDay.set(day, 1);
      }
    }

    const mostLikedDay = this.getMostLikedDay(likedPerDay);

    return {
      totalLikes: totalLikes,
      dayWithMostLikedPosts: mostLikedDay,
      firstLikedVideo: {
        date: likedPosts[0].Date,
        link: likedPosts[0].Link ?? "",
      },
    };
  }

  private getMostLikedDay(likedPerDay: Map<string, number>): {
    day: string;
    count: number;
  } {
    let dayWithMostLikedPosts = {
      day: "",
      count: 0,
    };

    likedPerDay.forEach((count, day) => {
      if (dayWithMostLikedPosts.count < count) {
        dayWithMostLikedPosts.day = day;
        dayWithMostLikedPosts.count = count;
      }
    });

    return dayWithMostLikedPosts;
  }

  getDefaultValue(): LikesStatisticResult {
    return {
      totalLikes: 0,
      dayWithMostLikedPosts: {
        day: "",
        count: 0,
      },
      firstLikedVideo: {
        date: "",
        link: "",
      },
    };
  }
}
