"use client";

import HeroImage2 from "@/assets/images/billy-williams-8wz1Q4Q_XAg-unsplash.jpg";
import HeroImage1 from "@/assets/images/neil-mark-thomas-1euFcqLsPWA-unsplash.jpg";
import HeroImage0 from "@/assets/images/yannik-mika-ymRMOsSgRRA-unsplash.jpg";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { FormEventHandler, useMemo, useRef } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

const HeroImages = [HeroImage0, HeroImage1, HeroImage2];

export default function Hero() {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const HeroImage = useMemo(() => {
    let randomIndex = Math.floor(Math.random() * 3);
    if (randomIndex > HeroImages.length - 1) randomIndex = 0;
    return HeroImages[randomIndex];
  }, []);

  const handleMessageSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!messageInputRef.current || messageInputRef.current.value.trim() === "")
      return;
    window.open(
      `mailto:${
        process.env.NEXT_PUBLIC_DEVELOPER_EMAIL
      }?body=${encodeURIComponent(
        messageInputRef.current.value
      )}&subject=Message from Portfolio Site`,
      "_blank"
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
