import Statistic from "./Statistic";

export type CommentsStatisticResult = {
  totalComments: number;
  avgCommentLength: number;
  mostUsedEmoji: {
    emoji: string;
    count: number;
  };
};

export default class CommentsStatistic extends Statistic<CommentsStatisticResult> {
  name = "CommentsStatistic";

  calculateResult(): CommentsStatisticResult {
    let totalComments = 0;
    let totalCommentLength = 0;
    let emojiMap: Map<string, number> = new Map<string, number>();

    const commentList = this.wrapped.userData.Comment.Comments.CommentsList;
    if (!commentList) {
      return {
        totalComments: 0,
        avgCommentLength: 0,
        mostUsedEmoji: {
          emoji: "",
          count: 0,
        },
      };
    }

    for (let i = 0; i < commentList.length; i++) {
      const comment = commentList[i];

      totalComments++;
      totalCommentLength += comment.Comment.length;

      const emojis = this.extractEmojis(comment.Comment);
      emojis.forEach((emoji) => {
        if (emojiMap.has(emoji)) {
          emojiMap.set(emoji, emojiMap.get(emoji)! + 1);
        } else {
          emojiMap.set(emoji, 1);
        }
      });
    }

    const avgCommentLength = totalCommentLength / totalComments;
    const mostUsedEmoji = this.getMostUsedEmoji(emojiMap);

    return {
      totalComments: totalComments,
      avgCommentLength: avgCommentLength,
      mostUsedEmoji: mostUsedEmoji,
    };
  }

  private extractEmojis(text: string): string[] {
    const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;
    return text.match(emojiRegex) ?? [];
  }

  private getMostUsedEmoji(emojiMap: Map<string, number>) {
    let maxEmoji = "";
    let maxEmojiCount = 0;
    emojiMap.forEach((count, emoji) => {
      if (count > maxEmojiCount) {
        maxEmoji = emoji;
        maxEmojiCount = count;
      }
    });
    return {
      emoji: maxEmoji,
      count: maxEmojiCount,
    };
  }

  getDefaultValue(): CommentsStatisticResult {
    return {
      totalComments: 0,
      avgCommentLength: 0,
      mostUsedEmoji: {
        emoji: "🫁",
        count: 0,
      },
    };
  }
}
