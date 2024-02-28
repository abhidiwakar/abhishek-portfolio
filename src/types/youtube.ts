export interface Youtube {
  kind: string;
  etag?: string;
  id: YouTubeId | string;
  snippet: Snippet;
  statistics?: Statistics;
}

interface Snippet {
  publishedAt: Date;
  channelId?: string;
  title: string;
  description?: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent?: string;
  tags?: string[];
}

interface Thumbnails {
  default: Media;
  medium: Media;
  high: Media;
  standard?: Media;
  maxres?: Media;
}

interface Media {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeId {
  kind: string;
  videoId: string;
}

interface Statistics {
  viewCount: string;
  likeCount?: string;
  favoriteCount: string;
  commentCount: string;
}

export interface YoutubeSanitizedData {
  id: string;
  title: string;
  thumbnail: Thumbnails;
  publishedAt: Date;
  channelName: string;
  videoLink: string;
  statistics?: Statistics;
  tags?: string[];
}
