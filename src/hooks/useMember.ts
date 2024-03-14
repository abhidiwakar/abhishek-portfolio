import { TeamMember } from "@/types/project";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type Data = Omit<TeamMember, "id" | "createdAt" | "updatedAt">;

async function updateUser(
  url: string,
  { arg: { name, occupation, avatar, social } }: { arg: Data }
) {
  const result = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      name,
      occupation,
      avatar: avatar === null ? undefined : avatar,
      social,
    }),
  });

  const data = await result.json();

  if (!result.ok) {
    return Promise.reject(data);
  }

  return Promise.resolve(data as TeamMember);
}

async function getMembers(url: string) {
  const result = await fetch(url, {
    credentials: "include",
  });

  const data = await result.json();

  if (!result.ok) {
    return Promise.reject(data);
  }

  return Promise.resolve(data as TeamMember[]);
}

const useAddMember = () => {
  return useSWRMutation("/api/team", updateUser);
};

const useGetMembers = () => {
  return useSWR("/api/team", getMembers);
};

export { useAddMember, useGetMembers };
