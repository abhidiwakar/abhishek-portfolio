"use client";

import useYoutube from "@/hooks/useYoutube";
import YoutubeCard from "./ui/YoutubeCard";
import Link from "next/link";

export default function YoutubeVideos() {
  const { isError, isLoading, data, mutate } = useYoutube();

  return (
    <div className="my-6 px-6 sm:p-0">
      <div className="flex items-center">
        <div className="flex-1">
          <h4 className="text-2xl font-semibold">Youtube</h4>
          <p className="text-sm text-slate-400">
            Checkout my latest videos on Youtube
          </p>
        </div>
        <Link
          className="font-semibold text-sm underline"
          href={`https://www.youtube.com/@${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_NAME}/videos`}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          View all
        </Link>
      </div>
      {isError && (
        <div className="bg-red-200 rounded-md p-4 mt-3 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1">
            <p className="text-lg font-semibold">Error</p>
            <p>Failed to load videos. Please try again later.</p>
          </div>
          <button
            className="border rounded-md px-4 py-2 w-fit bg-white shadow-sm text-sm font-semibold"
            onClick={() => mutate()}
          >
            Retry
          </button>
        </div>
      )}
      {isLoading && (
        <div className="bg-slate-50 rounded-md p-4 mt-3">
          <p className="text-lg font-semibold">Loading</p>
          <p className="text-slate-400 text-sm">Fetching videos...</p>
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-2">
        {data?.map((video) => (
          <YoutubeCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
