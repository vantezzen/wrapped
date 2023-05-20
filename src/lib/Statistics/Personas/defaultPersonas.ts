import { Statistics } from "@/lib/Wrapped";
import Persona from "./Persona";

// Interaction Monster: Likes, comments, and shares a lot
class InteractionMonster extends Persona {
  public readonly name = "Interaction Monster";
  public readonly description =
    "You love engaging with content – likes, comments, and shares a lot!";

  public getFittingScore(statistics: Statistics): number {
    const likeCommentScore =
      (statistics.likes.totalLikes + statistics.comments.totalComments) / 2;
    const shareScore = statistics.shares.totalShares;

    return Math.min((likeCommentScore + shareScore) / 3000, 1);
  }
}

// Shy Junkie: Watches a lot of videos but doesn't interact as much
class ShyJunkie extends Persona {
  public readonly name = "Shy Junkie";
  public readonly description =
    "You watch a lot of videos but don't interact as much.";

  public getFittingScore(statistics: Statistics): number {
    const watchScore = statistics.videoAmountWatched / 10000;
    const interactionScore = Math.max(
      1 -
        (statistics.likes.totalLikes +
          statistics.comments.totalComments +
          statistics.shares.totalShares) /
          2000,
      0
    );
    return (watchScore * interactionScore) / 2;
  }
}

// Commentator: Loves to comment on videos
class Commentator extends Persona {
  public readonly name = "Commentator";
  public readonly description =
    "You love sharing your thoughts in the comments.";

  public getFittingScore(statistics: Statistics): number {
    const commentScore = statistics.comments.totalComments / 100;
    return Math.min(commentScore, 1);
  }
}

// Emoji Obsessed: Uses a lot of emojis in comments
class EmojiObsessed extends Persona {
  public readonly name = "Emoji Obsessed";
  public readonly description =
    "You can't resist expressing yourself with emojis.";

  public getFittingScore(statistics: Statistics): number {
    const emojiScore = Math.min(
      statistics.comments.mostUsedEmoji.count / 100,
      1
    );
    return emojiScore;
  }
}

// Loyal Liker: Leaves likes on almost every video they watch
class LoyalLiker extends Persona {
  public readonly name = "Loyal Liker";
  public readonly description =
    "You can't help but leave a like on all the videos you watch.";

  public getFittingScore(statistics: Statistics): number {
    const likeScore = Math.min(statistics.likes.totalLikes / 100, 1);
    const watchScore = Math.min(statistics.videoAmountWatched / 1000, 1);
    return (likeScore * watchScore) / 2;
  }
}

// Avid Binge-Watcher: Spends a lot of time on TikTok in a single session
class AvidBingeWatcher extends Persona {
  public readonly name = "Avid Binge-Watcher";
  public readonly description = "Once you start watching, it's hard to stop.";

  public getFittingScore(statistics: Statistics): number {
    const bingeScore = Math.min(
      statistics.watchSessions.longestWatchSession.lengthSec / 3600,
      1
    );
    return bingeScore;
  }
}

// Weekend Warrior: Primarily watches videos on weekends
class WeekendWarrior extends Persona {
  public readonly name = "Weekend Warrior";
  public readonly description = "You save your TikTok energy for the weekends.";

  public getFittingScore(statistics: Statistics): number {
    const weekendScore =
      statistics.watchSessions.mostActiveWeekday.weekday === "Saturday" ||
      statistics.watchSessions.mostActiveWeekday.weekday === "Sunday"
        ? 0.8
        : 0;
    return weekendScore;
  }
}

// Live Stream Fanatic: Frequently joins live streams
class LiveStreamFanatic extends Persona {
  public readonly name = "Live Stream Fanatic";
  public readonly description =
    "Live streams are where you thrive – enjoying the real-time action.";

  public getFittingScore(statistics: Statistics): number {
    const liveStreamScore = Math.min(statistics.live.totalLiveViewed / 1000, 1);
    return liveStreamScore;
  }
}

// Share Enthusiast: Loves sharing TikTok videos with friends
class ShareEnthusiast extends Persona {
  public readonly name = "Share Enthusiast";
  public readonly description =
    "Sharing is caring, and you love spreading joy through TikTok.";

  public getFittingScore(statistics: Statistics): number {
    const shareScore = Math.min(statistics.shares.totalShares / 300, 1);
    return shareScore;
  }
}

// Emoji Conversationalist: When words aren't enough, emojis speak for you
class EmojiConversationalist extends Persona {
  public readonly name = "Emoji Conversationalist";
  public readonly description =
    "Emojis speak louder than words when it comes to your comments.";

  public getFittingScore(statistics: Statistics): number {
    const emojiRatio =
      statistics.comments.mostUsedEmoji.count /
      statistics.comments.totalComments;
    return Math.min(emojiRatio, 1);
  }
}

// Humble Lurker: Enjoys watching content, but rarely engages with it
class HumbleLurker extends Persona {
  public readonly name = "Humble Lurker";
  public readonly description =
    "You're in the shadows, quietly soaking up the TikTok world.";

  public getFittingScore(statistics: Statistics): number {
    const interactionScore = Math.max(
      1 -
        (statistics.likes.totalLikes +
          statistics.comments.totalComments +
          statistics.shares.totalShares) /
          2000,
      0
    );
    const watchScore = statistics.videoAmountWatched / 1000;
    return (interactionScore * watchScore) / 2;
  }
}

// Trend Tracker: Has an eye for the most liked videos
class TrendTracker extends Persona {
  public readonly name = "Trend Tracker";
  public readonly description =
    "You always know what's hot and trending on TikTok.";

  public getFittingScore(statistics: Statistics): number {
    const mostLikedDayScore = statistics.likes.dayWithMostLikedPosts.count / 10;
    return Math.min(mostLikedDayScore, 1);
  }
}

// Thoughtful Analyst: Leaves well-thought-out and longer comments
class ThoughtfulAnalyst extends Persona {
  public readonly name = "Thoughtful Analyst";
  public readonly description =
    "Making meaningful connections with creators through your comments.";

  public getFittingScore(statistics: Statistics): number {
    const commentLengthScore = statistics.comments.avgCommentLength / 50;
    return Math.min(commentLengthScore, 1);
  }
}

// Default persona if no other persona fits
export class TikTokEnjoyer extends Persona {
  public readonly name = "TikTok Enjoyer";
  public readonly description =
    "You're just here to enjoy the content. No shame in that!";

  public getFittingScore(statistics: Statistics): number {
    return 0;
  }
}

export default [
  new InteractionMonster(),
  new ShyJunkie(),
  new Commentator(),
  new EmojiObsessed(),
  new LoyalLiker(),
  new AvidBingeWatcher(),
  new WeekendWarrior(),
  new LiveStreamFanatic(),
  new ShareEnthusiast(),
  new EmojiConversationalist(),
  new HumbleLurker(),
  new TrendTracker(),
  new ThoughtfulAnalyst(),
];
