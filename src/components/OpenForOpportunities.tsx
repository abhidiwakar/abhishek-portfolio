"use client";

import { BadgeCheckIcon } from "lucide-react";

export default function OpenForOpportunities() {
  const handleContactMeClick = () => {
    const contactInfoSection = document.querySelector("#connect");
    if (contactInfoSection) {
      contactInfoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    process.env.NEXT_PUBLIC_OPEN_FOR_OPPORTUNITIES === "true" && (
      <div className="bg-blue-600 px-3 py-2 text-white">
        <div className="flex gap-2 items-center justify-center">
          <BadgeCheckIcon size={16} />
          <p className="text-sm">
            I am currently open for opportunities.{" "}
            <span onClick={handleContactMeClick} className="underline cursor-pointer">
              Contact me
            </span>
          </p>
        </div>
      </div>
    )
  );
}
