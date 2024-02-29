import Social from "@/types/social";

export const socialLinks: Social[] = [
  {
    name: "Email",
    url: `mailto:${process.env.NEXT_PUBLIC_DEVELOPER_EMAIL}?subject=${encodeURIComponent("Message from Portfolio site")}`,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/namelesscoder/",
  },
  {
    name: "GitHub",
    url: "https://www.github.com/abhidiwakar",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/c/@TheNamelessCoder",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/nameless_coder",
  },
];
