import { socialLinks } from "@/data/social";
import Link from "next/link";

export default function Social() {
  return (
    <div className="my-6 px-6 sm:p-0">
      <h4 className="text-2xl font-semibold">Connect</h4>
      <p className="text-sm text-slate-400">Connect with me on social media</p>
      <div className="flex flex-col gap-3 mt-2">
        {socialLinks.map((social, index) => (
          <div key={index} className="underline">
            <Link
              href={social.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {social.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
