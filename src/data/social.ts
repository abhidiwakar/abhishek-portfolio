import Social from "@/types/social";

export const socialLinks: Social[] = [
  {
    name: "Email",
    link: `mailto:${
      process.env.NEXT_PUBLIC_DEVELOPER_EMAIL
    }?subject=${encodeURIComponent("Message from Portfolio site")}`,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/namelesscoder/",
  },
  {
    name: "GitHub",
    link: "https://www.github.com/abhidiwakar",
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/c/@TheNamelessCoder",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/nameless_coder",
  },
];
