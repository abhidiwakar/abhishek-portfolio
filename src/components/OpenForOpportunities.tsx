import { BadgeCheckIcon } from "lucide-react";

export default function OpenForOpportunities() {
  return (
    process.env.OPEN_FOR_OPPORTUNITIES === "true" && (
      <div className="bg-blue-600 px-3 py-2 text-white">
        <div className="flex gap-2 items-center justify-center">
          <BadgeCheckIcon size={16} />
          <p className="text-sm">I am currently open for opportunities.</p>
        </div>
      </div>
    )
  );
}
