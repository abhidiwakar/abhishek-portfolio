import { YouTubeId, Youtube, YoutubeSanitizedData } from "@/types/youtube";
import { kv } from "@vercel/kv";
import { NextApiRequest } from "next";

type YoutubeResponse = {
  items: Youtube[];
};

const prepareResponse = (data: YoutubeResponse): YoutubeSanitizedData[] => {
  return data.items.map((item) => ({
    id: item.id as string,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails,
    publishedAt: item.snippet.publishedAt,
    channelName: item.snippet.channelTitle,
    videoLink: `https://www.youtube.com/watch?v=${item.id as string}`,
    statistics: item.statistics,
    tags: item.snippet.tags,
  }));
};

const fetchVideosListing = async (): Promise<YoutubeResponse> => {
  const params = {
    part: "snippet",
    channelId: process.env.YOUTUBE_CHANNEL_ID,
    maxResults: 6,
    order: "date",
    type: "video",
  };

  const redisKey = `portfolio:youtube:${Object.entries(params)
    .map(([key, value]) => `${key}:${value}`)
    .join(":")}`;

  const cachedResponse = await kv.get<YoutubeResponse>(redisKey);

  // If we have a cached response, return it instead of fetching from the API.
  if (cachedResponse) {
    return cachedResponse;
  }

  // If we don't have a cached response, fetch from the API and cache the response.
  const url = `https://www.googleapis.com/youtube/v3/search?key=${
    process.env.YOUTUBE_API_KEY
  }&${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
  const result = await fetch(url);
  const data: YoutubeResponse = await result.json();

  // Cache the response for 7 days.
  await kv.set(redisKey, JSON.stringify(data), {
    ex: 60 * 60 * 24 * 7,
  });

  return data;
};

const fetchVideosDetails = async (ids: string[]): Promise<YoutubeResponse> => {
  const params = {
    part: "snippet,statistics",
    id: ids.join(","),
    fields:
      "items(id,kind,snippet(publishedAt,title,thumbnails,channelTitle,tags),statistics)",
  };

  const redisKey = `portfolio:youtube:${Object.entries(params)
    .map(([key, value]) => `${key}:${value}`)
    .join(":")}`;

  const cachedResponse = await kv.get<YoutubeResponse>(redisKey);

  // If we have a cached response, return it instead of fetching from the API.
  if (cachedResponse) {
    return cachedResponse;
  }

  // If we don't have a cached response, fetch from the API and cache the response.
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${
    process.env.YOUTUBE_API_KEY
  }&${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
  const result = await fetch(url);
  const data: YoutubeResponse = await result.json();

  // Cache the response for 7 days.
  await kv.set(redisKey, JSON.stringify(data), {
    ex: 60 * 60 * 24 * 7,
  });

  return data;
};

export const GET = async (req: NextApiRequest) => {
  const videosListing = await fetchVideosListing();
  const videoIds = videosListing.items.map(
    (video) => (video.id as YouTubeId).videoId
  );
  const fetchVideosData = await fetchVideosDetails(videoIds);
  return Response.json(prepareResponse(fetchVideosData));
};
