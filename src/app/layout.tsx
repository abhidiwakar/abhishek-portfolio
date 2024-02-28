import dayjs from "dayjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { careerStartDate } from "@/data/skill";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who is Abhishek Diwakar? | Full Stack Software Engineer",
  description: `Abhishek Diwakar is a Full Stack Software Engineer | ${dayjs()
    .diff(careerStartDate, "years")
    .toFixed(0)}+ Years of Experience | MERN, Flutter, React Native`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
