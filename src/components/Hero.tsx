import React, { useMemo } from "react";
import HeroImage0 from "@/assets/images/yannik-mika-ymRMOsSgRRA-unsplash.jpg";
import HeroImage1 from "@/assets/images/neil-mark-thomas-1euFcqLsPWA-unsplash.jpg";
import HeroImage2 from "@/assets/images/billy-williams-8wz1Q4Q_XAg-unsplash.jpg";
import Image from "next/image";

const HeroImages = [HeroImage0, HeroImage1, HeroImage2];

export default function Hero() {
  const HeroImage = useMemo(() => {
    let randomIndex = Math.floor(Math.random() * 3);
    if (randomIndex > HeroImages.length - 1) randomIndex = 0;
    return HeroImages[randomIndex];
  }, []);

  return (
    <div className="min-h-[500px] sm:rounded-xl p-8 flex flex-col justify-end relative bg-slate-200">
      <Image
        priority
        src={HeroImage}
        alt="Hero Image"
        className="absolute inset-0 object-cover w-full h-full sm:rounded-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 sm:rounded-xl"></div>
      <h1 className="text-2xl sm:text-4xl font-bold text-white relative z-10">
        Hi, I&apos;m Abhishek
      </h1>
      <p className="text-slate-300 relative z-10">
        I&apos;m a Software Engineer specializing in React.js, Next.js, and
        Node.js, with experience in AWS services.
      </p>
      <form className="bg-white max-w-sm flex mt-6 rounded-md relative z-10">
        <input
          type="text"
          className="p-3 m-3 w-full focus:outline-none"
          placeholder="Send me a message..."
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white m-3 py-3 px-5 rounded-lg transition-bg hover:shadow-md">
          Send
        </button>
      </form>
      <p className="text-xs text-slate-100 mt-1">Protected by reCAPTCHA</p>
    </div>
  );
}
