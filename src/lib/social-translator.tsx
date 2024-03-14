import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  SlackIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
} from "lucide-react";

const SOCIAL_LOGOS = {
  GITHUB: <GithubIcon />,
  LINKEDIN: <LinkedinIcon />,
  TWITTER: <TwitterIcon />,
  EMAIL: <MailIcon />,
  YOUTUBE: <YoutubeIcon />,
  SLACK: <SlackIcon />,
};

export const getSocialIcon = (social: string) => {
  const key = social.toUpperCase() as keyof typeof SOCIAL_LOGOS;
  return SOCIAL_LOGOS[key] || <UserIcon />;
};
