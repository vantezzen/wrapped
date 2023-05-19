const activities = [
  {
    title: "cooked a homemade meal",
    seconds: 2700, // 45 minutes
  },
  {
    title: "planned a weekend getaway",
    seconds: 3600 * 2, // 2 hours
  },
  {
    title: "completed a 1000-piece jigsaw puzzle",
    seconds: 3600 * 8, // 8 hours
  },
  {
    title: "learned to sew and make your own clothing",
    seconds: 3600 * 24 * 5, // 5 days
  },
  {
    title: "started a small garden and grow your own vegetables",
    seconds: 3600 * 24 * 7, // 1 week
  },
  {
    title: "organized and decluttered your entire home",
    seconds: 3600 * 24 * 9, // 9 days
  },
  {
    title: "taken a cross-country road trip and visit national parks",
    seconds: 3600 * 24 * 14, // 2 weeks
  },
  {
    title: "taken a sailing course and sail across a large body of water",
    seconds: 3600 * 24 * 21, // 3 weeks
  },
  {
    title: "written a novel",
    seconds: 3600 * 24 * 30, // 1 month
  },
  {
    title: "learned a new language",
    seconds: 3600 * 24 * 40, // 40 days
  },
  {
    title: "learned to play a new sport like golf or tennis",
    seconds: 3600 * 24 * 30 * 2, // 2 months
  },
  {
    title: "trained and run a half marathon",
    seconds: 3600 * 24 * 7 * 12, // 12 weeks
  },
  {
    title: "completed a 100-day art challenge",
    seconds: 3600 * 24 * 100, // 100 days
  },
];

export default function getComparableActivity(seconds: number): string {
  const mostComparableActivity = activities.reduce((prev, curr) => {
    if (Math.abs(curr.seconds - seconds) < Math.abs(prev.seconds - seconds)) {
      return curr;
    }
    return prev;
  }, activities[0]);
  return mostComparableActivity.title;
}
