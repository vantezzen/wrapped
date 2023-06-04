import { TikTokActivityData, TikTokUserData } from "@/lib/types";
import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";

// Generate random test data
const size = parseInt(process.argv[2]) || 1000;

function generateFavoriteElements() {
  const elements = [];
  for (let i = 0; i < size; i++) {
    elements.push({
      Date: faker.date.past().toISOString(),
      Link: faker.internet.url(),
    });
  }
  return elements;
}

function generateUserSchemaList() {
  const elements = [];
  for (let i = 0; i < size; i++) {
    elements.push({
      Date: faker.date.past().toISOString(),
      UserName: faker.internet.userName(),
    });
  }
  return elements;
}

const activity: TikTokActivityData = {
  "Favorite Effects": {
    FavoriteEffectsList: generateFavoriteElements(),
  },
  "Favorite Hashtags": {
    FavoriteHashtagsList: generateFavoriteElements(),
  },
  "Favorite Sounds": {
    FavoriteSoundsList: generateFavoriteElements(),
  },
  "Favorite Videos": {
    FavoriteVideosList: generateFavoriteElements(),
  },
  "Follower List": {
    FansList: generateUserSchemaList(),
  },
  "Following List": {
    Following: generateUserSchemaList(),
  },
  Hashtag: {
    HashtagList: Array.from({ length: size }, () => ({
      HashtagName: faker.lorem.word(),
      HashtagLink: faker.internet.url(),
    })),
  },
  "Like List": {
    ItemFavoriteList: generateFavoriteElements(),
  },
  "Login History": {
    LoginHistoryList: Array.from({ length: size }, () => ({
      Date: faker.date.past().toISOString(),
      IP: faker.internet.ip(),
      DeviceModel: faker.lorem.word(),
      DeviceSystem: faker.lorem.word(),
      NetworkType: faker.lorem.word(),
      Carrier: faker.lorem.word(),
    })),
  },
  "Most Recent Location Data": {
    LocationData: {
      Date: faker.date.past().toISOString(),
      GpsData: faker.lorem.word(),
      LastRegion: faker.lorem.word(),
    },
  },
  "Purchase History": {},
  "Search History": {
    SearchList: Array.from({ length: size }, () => ({
      Date: faker.date.past().toISOString(),
      SearchTerm: faker.lorem.word(),
    })),
  },
  "Share History": {
    ShareHistoryList: Array.from({ length: size }, () => ({
      Date: faker.date.past().toISOString(),
      SharedContent: faker.lorem.word(),
      Link: faker.internet.url(),
      Method: faker.lorem.word(),
    })),
  },
  Status: {
    "Status List": Array.from({ length: size }, () => ({
      Resolution: faker.lorem.word(),
      "App Version": faker.lorem.word(),
      IDFA: faker.lorem.word(),
      IDFV: faker.lorem.word(),
      GAID: faker.lorem.word(),
      "Android ID": faker.lorem.word(),
      IPFV: faker.lorem.word(),
      "Web ID": faker.lorem.word(),
    })),
  },
  "Video Browsing History": {
    VideoList: generateFavoriteElements(),
  },
};

const data: TikTokUserData = {
  Activity: activity,
  "App Settings": {
    Block: {
      BlockList: generateUserSchemaList(),
    },
  },
  Comment: {
    Comments: {
      CommentsList: Array.from({ length: size }, () => ({
        Date: faker.date.past().toISOString(),
        Comment: faker.lorem.word(),
      })),
    },
  },

  "Tiktok Live": {
    "Watch Live History": {
      WatchLiveMap: Object.fromEntries(
        Array.from({ length: size }, () => [
          faker.number.int(),

          {
            WatchTime: faker.number.int(),
            Link: faker.internet.url(),
          },
        ])
      ) as any,
    },
  },

  Video: {
    Videos: {
      VideoList: Array.from({ length: size }, () => ({
        Date: faker.date.past().toISOString(),
        Link: faker.internet.url(),
        Likes: String(faker.number.int()),
      })),
    },
  },

  Profile: {
    "Profile Information": {
      ProfileMap: {
        likesReceived: String(faker.number.int()),
        profilePhoto: faker.internet.url(),
        userName: faker.internet.userName(),
      },
    },
  },
};

writeFile(`data/dummy-data-${size}.json`, JSON.stringify(data, null, 2));
