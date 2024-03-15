import dayjs from "dayjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { careerStartDate } from "@/data/skill";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Full Stack Software Engineer",
    default: "Who is Abhishek Diwakar?",
  },
  description: `Abhishek Diwakar is a Full Stack Software Engineer | ${dayjs()
    .diff(careerStartDate, "years")
    .toFixed(0)}+ Years of Experience | MERN, Flutter, React Native`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  openGraph: {
    type: "profile",
    emails: [process.env.NEXT_PUBLIC_DEVELOPER_EMAIL!],
    countryName: "India",
    firstName: "Abhishek",
    lastName: "Diwakar",
    gender: "Male",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 176,
        height: 176,
        alt: "Abhishek Diwakar",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
