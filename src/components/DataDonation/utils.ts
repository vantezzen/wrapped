import { TikTokUserData } from "@/lib/types";
import Wrapped, { Statistics } from "@/lib/Wrapped";

function anonymizeUserData(userData: TikTokUserData) {
  return {
    ...userData,
    Activity: {
      ...userData.Activity,
      "Login History": null,
      "Most Recent Location Data": null,
      "Search History": null,
    },
    "App Settings": {
      ...userData["App Settings"],
      Block: null,
    },
    "Direct Messages": null,
    Profile: {
      "Profile Information": {
        ProfileMap: {
          ...userData.Profile["Profile Information"].ProfileMap,
          PlatformInfo: null,
          userName: "Anonymous",
          telephoneNumber: null,
          emailAddress: null,
          profilePhoto: null,
          profileVideo: null,
        },
      },
    },
    Video: null,

    // All shopping values could be personal so we remove everything
    "Tiktok Shopping": null,
  };
}

function anonymizeStatistics(statistics: Statistics) {
  return {
    ...statistics,
    name: "Anonymous",
  };
}

function getAnonymizedData(wrapped: Wrapped) {
  return {
    statistics: anonymizeStatistics(wrapped.getStatistics()),
    persona: wrapped.getPersona(),
    userData: anonymizeUserData(wrapped.userData),
  };
}

async function sendDataDonation(data: any) {
  await fetch("/api/donate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default async function donateData(wrapped: Wrapped) {
  const data = getAnonymizedData(wrapped);
  await sendDataDonation(data);
}
