import ExternalLinkIcon from "@/assets/icons/external-link-icon.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { YoutubeSanitizedData } from "@/types/youtube";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
dayjs.extend(relativeTime);

type YoutubeCardProps = {
  video: YoutubeSanitizedData;
};

export default function YoutubeCard({ video }: YoutubeCardProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="flex flex-col-reverse sm:flex-row border rounded-lg p-4 gap-4 shadow-sm">
      <div className="flex-1 flex flex-col">
        <small className="text-gray-400">
          Uploaded {dayjs(video.publishedAt).fromNow()}
        </small>
        <p className="font-semibold line-clamp-2">{video.title}</p>
        <div className="flex gap-2 flex-1">
          <small className="gap-style-dot">{video.channelName}</small>
          {video.statistics?.viewCount && (
            <small>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(parseInt(video.statistics.viewCount))}{" "}
              views
            </small>
          )}
        </div>
        <div>
          <button className="border border-gray-300 rounded-lg text-sm mt-2 hover:bg-gray-100 transition-bg shadow-sm">
            <Link
              href={video.videoLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex gap-2 items-center px-3 py-1.5"
            >
              Watch the video
              <Image
                src={ExternalLinkIcon}
                alt="External Link Icon"
                className="w-4"
              />
            </Link>
          </button>
        </div>
      </div>
      <div>
        <img
          className="w-full sm:max-w-80 rounded-lg shadow-md"
          src={
            isMobile
              ? video.thumbnail.maxres?.url || video.thumbnail.high.url
              : video.thumbnail.default.url
          }
          alt={video.title}
        />
      </div>
    </div>
  );
}
