import { socialLinks } from "@/data/social";
import Link from "next/link";

export default function Social() {
  return (
    <div className="my-6 px-6 sm:p-0">
      <h4 className="text-2xl font-semibold">Connect</h4>
      <p className="text-sm text-slate-400">Connect with me on social media</p>
      <ul>
        {socialLinks.map((social, index) => (
          <li key={index} className="underline">
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {social.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
