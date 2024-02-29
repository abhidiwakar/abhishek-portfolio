"use client";

import GitHubCalendar from "react-github-calendar";

export default function GithubGraph() {
  return (
    <div className="my-6 px-6 sm:p-0">
      <hr />
      {/* <h4 className="text-2xl font-semibold">Github Activity</h4>
      <p className="text-sm text-slate-400">I'm actively improving my skills</p> */}
      <div className="mt-4">
        <GitHubCalendar username="abhidiwakar" blockSize={20} />
      </div>
    </div>
  );
}
