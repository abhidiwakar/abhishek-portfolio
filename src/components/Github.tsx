"use client";

import GitHubCalendar from "react-github-calendar";

export default function GithubGraph() {
  return (
    <div className="border-t dark:border-t-slate-700 my-6 px-6 sm:p-0">
      <div className="mt-4">
        <GitHubCalendar username="abhidiwakar" blockSize={20} />
      </div>
    </div>
  );
}
