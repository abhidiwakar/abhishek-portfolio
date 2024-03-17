"use client";

import useYoutube from "@/hooks/useYoutube";
import YoutubeCard from "./ui/YoutubeCard";
import Link from "next/link";
import Alert from "./ui/Alert";
import { Button } from "./ui/shad/Button";

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
        <Alert
          className="mt-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
          variant="error"
        >
          <p>Failed to load videos. Please try again later.</p>
          <div>
            <Button
              variant="outline"
              className="border-red-300 dark:border-red-700"
              onClick={() => mutate()}
            >
              Retry
            </Button>
          </div>
        </Alert>
      )}
      {isLoading && (
        <Alert title="Please wait">
          <p>Loading videos...</p>
        </Alert>
      )}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-2">
        {data?.map((video) => (
          <YoutubeCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
