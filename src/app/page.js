"use client";

import React from "react";
import Image from "next/image";

import { Cinzel_Decorative, Cinzel } from "next/font/google";
const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400"],
});
export const Box = () => {
  // Reusable time unit component
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span
        className="text-3xl sm:text-5xl md:text-6xl font-mono tracking-wide"
        style={{
          backgroundImage: "url(/texture.jpg)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {value}
      </span>
      <span className={`text-lg text-[#E1C473DE] mt-1 ${cinzel.className}`}>
        {label}
      </span>
    </div>
  );
  const [isHovered, setIsHovered] = React.useState(false);
  // Automatically trigger hover effect after 1 second
  React.useEffect(() => {
    const timer = setTimeout(() => setIsHovered(true), 0);
    return () => clearTimeout(timer);
  }, []);
  // Countdown timer state
  const [timeLeft, setTimeLeft] = React.useState("");

  // Split timeLeft into [hours, minutes, seconds]
  const [days, hours, minutes] = timeLeft.split(":");

  React.useEffect(() => {
    const targetDate = new Date(new Date().getFullYear(), 9, 31, 0, 0, 0); // 31st Oct, month is 0-indexed
    const updateTimer = () => {
      const now = new Date();
      let diff = targetDate - now;
      if (diff < 0) diff = 0;
      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      );
      setTimeLeft(`${days}:${hours}:${minutes}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative group flex flex-col items-center justify-center w-full"
      style={{ minHeight: 223 }}
    >
      {/* Hover effect component - initially hidden, appears on hover */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none z-10 ${
          isHovered ? "opacity-100" : "opacity-0"
        } flex items-center justify-center`}
      >
        <img
          className={`w-full max-w-[1700px] h-auto ${
            isHovered ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          alt="Vector"
          src="/Vector1.png"
        />
      </div>

      {/* Original WAVES component with animation */}
      <div
        className={`w-full max-w-[742px] min-h-[223px]  relative z-20 transition-transform duration-1200 ease-out mx-auto flex flex-col items-center justify-center ${
          isHovered ? "transform -translate-y-16" : ""
        }`}
      >
        <div className="relative w-full flex flex-col items-center justify-center top-8">
          <Image
            className="w-full max-w-[600px] h-auto relative top-8 left-4"
            alt="Waves final logo"
            src="/Logo.svg"
            width={600}
            height={120}
          />
          <h1
            className={`${cinzel.className} [-webkit-text-stroke:0.2px_#e1c37382] [font-family:'Cinzel_Decorative-Bold',Helvetica] font-bold text-[#f8e8bd] text-xl sm:text-2xl text-center tracking-[1.68px] leading-[normal] whitespace-nowrap`}
          >
            - 20<sup>th</sup> ANNIVERSARY -
          </h1>
          <h1
            className={`${cinzelDecorative.className} [-webkit-text-stroke:0.2px_#e1c37382] [font-family:'Cinzel_Decorative-Bold',Helvetica] font-bold text-[#f8e8bd] text-2xl sm:text-3xl text-center tracking-[1.68px] leading-[normal] whitespace-nowrap mb-2`}
          >
            mASQUERADE OF MAYHEM
          </h1>
          <div className="flex flex-row items-end justify-center mt-2 gap-4">
            <TimeUnit value={days} label="Days" />
            <span
              className="text-3xl sm:text-5xl md:text-6xl text-[#f8e8bd] mx-2 mb-2 relative top-[-20px]"
              style={{
                backgroundImage: "url(/texture.jpg)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "hard-light", // <-- added
              }}
            >
              :
            </span>
            <TimeUnit value={hours} label="Hours" />
            <span className="text-3xl sm:text-5xl md:text-6xl text-[#f8e8bd] mx-2 mb-2 relative top-[-20px]">
              :
            </span>
            <TimeUnit value={minutes} label="Minutes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/Home_Starting.svg"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />
      </div>

      {/* Centered Box component positioned like in the masquerade theme */}
      <div className="absolute inset-0 flex items-end justify-center">
        <Box />
      </div>
    </div>
  );
}
