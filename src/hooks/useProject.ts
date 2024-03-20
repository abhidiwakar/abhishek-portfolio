import { fetcher, getAPIUrl } from "@/lib/fetcher";
import { Project } from "@/types/project";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function addProject(
  url: string,
  {
    arg,
  }: {
    arg: Omit<Project, "id" | "createdAt" | "updatedAt" | "slug" | "team"> & {
      team: string[];
    };
  }
) {
  const result = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      ...arg,
    }),
  });

  const data = await result.json();

  if (!result.ok) {
    return Promise.reject(data);
  }

  return Promise.resolve(data as Project);
}

async function updateProject(
  url: string,
  {
    arg,
  }: {
    arg: Omit<Project, "createdAt" | "updatedAt" | "slug" | "team"> & {
      team: string[];
    };
  }
) {
  const result = await fetch(url, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      ...arg,
    }),
  });

  const data = await result.json();

  if (!result.ok) {
    return Promise.reject(data);
  }

  return Promise.resolve(data as Project);
}

function useProject(slug?: string | null, enabled = true) {
  const url = getAPIUrl(`/project${slug ? `?slug=${slug}` : ""}`);
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    enabled ? [url] : null,
    fetcher,
    {}
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useAddProject() {
  const {
    data,
    error,
    isMutating: isLoading,
    trigger: mutate,
    reset,
  } = useSWRMutation("/api/project", addProject);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
    reset,
  };
}

export function useUpdateProject() {
  const {
    data,
    error,
    isMutating: isLoading,
    trigger: mutate,
    reset,
  } = useSWRMutation("/api/project", updateProject);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
    reset,
  };
}

export default useProject;
