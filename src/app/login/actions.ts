"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type State = {
  message: string | null;
  status: number | null;
};

export const login = async (
  _: State,
  data: FormData
): Promise<State | never> => {
  // Get the access key from the form data
  const accessKey = data.get("access_key");

  // If the access key is correct, set the API key cookie and redirect to the add project page.
  if (accessKey === process.env.API_ACCESS_KEY) {
    cookies().set("api_key", accessKey, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    redirect("/project/add");
  }

  return {
    message: "Unauthorized",
    status: 401,
  };
};
