import { z } from "zod";

export const TikTokFavouriteElementSchema = z.object({
  Date: z.string(),
  Link: z.string().optional().nullable(),
});

export const TikTokUserSchema = z.object({
  Date: z.string(),
  UserName: z.string(),
});

export const TikTokHashtagElementSchema = z.object({
  HashtagName: z.string(),
  HashtagLink: z.string(),
});

export const TikTokLoginHistoryElementSchema = z.object({
  Date: z.string(),
  IP: z.string(),
  DeviceModel: z.string(),
  DeviceSystem: z.string(),
  NetworkType: z.string(),
  Carrier: z.string(),
});

export const TikTokSeachHistoryElementSchema = z.object({
  Date: z.string(),
  SearchTerm: z.string(),
});

export const TikTokShareHistoryElementSchema = z.object({
  Date: z.string(),
  SharedContent: z.string(),
  Link: z.string(),
  Method: z.string(),
});

export const TikTokStatusElementSchema = z.object({
  Resolution: z.string(),
  "App Version": z.string(),
  IDFA: z.string(),
  GAID: z.string(),
  "Android ID": z.string(),
  IDFV: z.string(),
  "Web ID": z.string(),
});

export const TikTokCommentElementSchema = z.object({
  Date: z.string(),
  Comment: z.string(),
});

export const TikTokLiveCommentElementSchema = z.object({
  CommentTime: z.string(),
  CommentContent: z.string(),
  RawTime: z.number(),
});

export const TikTokOwnVideoElementSchema = z.object({
  Date: z.string(),
  Link: z.string(),
  Likes: z.string(),
});

export const TikTokWatchLiveElementSchema = z.object({
  Comments: z.array(TikTokLiveCommentElementSchema).nullable().optional(),
  WatchTime: z.string(),
  Link: z.string(),
});

export const TikTokActivityDataSchema = z.object({
  "Favorite Effects": z.object({
    FavoriteEffectsList: z
      .array(TikTokFavouriteElementSchema)
      .nullable()
      .optional(),
  }),
  "Favorite Hashtags": z.object({
    FavoriteHashtagsList: z
      .array(TikTokFavouriteElementSchema)
      .nullable()
      .optional(),
  }),
  "Favorite Sounds": z.object({
    FavoriteSoundsList: z
      .array(TikTokFavouriteElementSchema)
      .nullable()
      .optional(),
  }),
  "Favorite Videos": z.object({
    FavoriteVideosList: z
      .array(TikTokFavouriteElementSchema)
      .nullable()
      .optional(),
  }),
  "Follower List": z.object({
    FansList: z.array(TikTokUserSchema).nullable().optional(),
  }),
  "Following List": z.object({
    Following: z.array(TikTokUserSchema).nullable().optional(),
  }),
  Hashtag: z.object({
    HashtagList: z.array(TikTokHashtagElementSchema).nullable().optional(),
  }),
  "Like List": z.object({
    ItemFavoriteList: z
      .array(TikTokFavouriteElementSchema)
      .nullable()
      .optional(),
  }),
  "Login History": z.object({
    LoginHistoryList: z
      .array(TikTokLoginHistoryElementSchema)
      .nullable()
      .optional(),
  }),
  "Most Recent Location Data": z
    .object({
      LocationData: z.object({
        Date: z.string(),
        GpsData: z.string(),
        LastRegion: z.string(),
      }),
    })
    .optional(),
  "Purchase History": z.object({}),
  "Search History": z.object({
    SearchList: z.array(TikTokSeachHistoryElementSchema).nullable().optional(),
  }),
  "Share History": z.object({
    ShareHistoryList: z
      .array(TikTokShareHistoryElementSchema)
      .nullable()
      .optional(),
  }),
  Status: z.object({
    "Status List": z.array(TikTokStatusElementSchema).nullable().optional(),
  }),
  "Video Browsing History": z.object({
    VideoList: z.array(TikTokFavouriteElementSchema).nullable().optional(),
  }),
});

export const TikTokUserDataSchema = z.object({
  Activity: TikTokActivityDataSchema,
  "App Settings": z.object({
    Block: z.object({
      BlockList: z.array(TikTokUserSchema).nullable().optional(),
    }),
  }),
  Comment: z.object({
    Comments: z.object({
      CommentsList: z.array(TikTokCommentElementSchema).nullable().optional(),
    }),
  }),
  "Tiktok Live": z.object({
    "Watch Live History": z.object({
      WatchLiveMap: z.record(TikTokWatchLiveElementSchema).optional(),
    }),
  }),
  Video: z.object({
    Videos: z.object({
      VideoList: z.array(TikTokOwnVideoElementSchema).nullable().optional(),
    }),
  }),
  Profile: z.object({
    "Profile Information": z.object({
      ProfileMap: z.object({
        likesReceived: z.string(),
        profilePhoto: z.string(),
        userName: z.string(),
      }),
    }),
  }),
});

export const ShareImageDataSchema = z.object({
  name: z.string(),
  totalWatchTime: z.number(),
  totalVideosWatched: z.number(),
  totalWatchSessions: z.number(),
  totalComments: z.number(),
  averageSessionLength: z.number(),
  mostUsedEmoji: z.string(),
  totalLikes: z.number(),
  persona: z.string(),
});

export type TikTokUserData = z.infer<typeof TikTokUserDataSchema>;
export type TikTokActivityData = z.infer<typeof TikTokActivityDataSchema>;
export type TikTokFavouritesList = z.infer<
  typeof TikTokFavouriteElementSchema
>[];
export type TikTokFavouriteElement = z.infer<
  typeof TikTokFavouriteElementSchema
>;
export type TikTokUsersList = z.infer<typeof TikTokUserSchema>[];
export type TikTokUser = z.infer<typeof TikTokUserSchema>;
export type TikTokHashtagElement = z.infer<typeof TikTokHashtagElementSchema>;
export type TikTokLoginHistoryElement = z.infer<
  typeof TikTokLoginHistoryElementSchema
>;
export type TikTokSeachHistoryElement = z.infer<
  typeof TikTokSeachHistoryElementSchema
>;
export type TikTokShareHistoryElement = z.infer<
  typeof TikTokShareHistoryElementSchema
>;
export type TikTokStatusElement = z.infer<typeof TikTokStatusElementSchema>;
export type TikTokCommentElement = z.infer<typeof TikTokCommentElementSchema>;
export type TikTokWatchLiveElement = z.infer<
  typeof TikTokWatchLiveElementSchema
>;
export type TikTokLiveCommentElement = z.infer<
  typeof TikTokLiveCommentElementSchema
>;
export type TikTokOwnVideoElement = z.infer<typeof TikTokOwnVideoElementSchema>;
export type ShareImageData = z.infer<typeof ShareImageDataSchema>;
