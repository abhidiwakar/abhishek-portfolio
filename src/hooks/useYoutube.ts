import { fetcher, getAPIUrl } from "@/lib/fetcher";
import { YoutubeSanitizedData } from "@/types/youtube";
import useSWR from "swr";

function useYoutube() {
  const url = getAPIUrl("/youtube");
  const { data, error, isLoading, mutate } = useSWR<YoutubeSanitizedData[]>(
    [url],
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

export default useYoutube;
