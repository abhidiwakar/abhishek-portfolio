"use client";

import HeroImage from "@/assets/images/neil-mark-thomas-1euFcqLsPWA-unsplash.jpg";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEventHandler, useRef } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Hero() {
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleMessageSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!messageInputRef.current || messageInputRef.current.value.trim() === "")
      return;
    window.open(
      `mailto:${
        process.env.NEXT_PUBLIC_DEVELOPER_EMAIL
      }?body=${encodeURIComponent(
        messageInputRef.current.value.trim()
      )}&subject=${encodeURIComponent("Message from Portfolio Site")}`,
      "_self"
    );
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-[500px] sm:rounded-xl p-8 flex flex-col justify-end relative bg-slate-200">
      <Image
        priority
        src={HeroImage}
        alt="Hero Image"
        className="absolute inset-0 object-cover w-full h-full sm:rounded-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 sm:rounded-xl"></div>
      <div className="relative z-10 flex-1 flex justify-end items-start">
        <Link
          rel="noopener noreferrer"
          href="https://drive.google.com/file/d/1Ain0dm4kBTLIyQ6p4XccuwkI0Dd59v1y/view?usp=sharing"
          className="text-white text-sm flex items-center gap-2 border px-2 py-1 rounded-md"
          target="_blank"
        >
          <Download size={20} />
          <span>Download Resume</span>
        </Link>
      </div>
      <div className="relative z-10">
        <small className="text-slate-300">
          It&apos;s{" "}
          {dayjs
            .tz(new Date(), "Asia/Kolkata")
            .format("ddd, MMM D, YYYY - h:mm A")}{" "}
          here.
        </small>
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          Hi, I&apos;m Abhishek
        </h1>
        <p className="text-slate-300">
          I&apos;m a Software Engineer specializing in React.js, Next.js, and
          Node.js, with experience in AWS services.
        </p>
        <form
          className="bg-white max-w-sm flex mt-6 rounded-md"
          onSubmit={handleMessageSubmit}
        >
          <input
            ref={messageInputRef}
            type="text"
            className="p-3 m-3 w-full focus:outline-none"
            placeholder="Send me a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white m-3 py-3 px-5 rounded-lg transition-bg hover:shadow-md"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
