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
  weight: ["600"],
});

const page = () => {
  const info = [
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
    {
      name: "John Doe",
      role: "Event Coordinator",
      contact: "john.doe@example.com",
    },
  ];
  return (
    <div className="">
      <div className="absolute inset-0 w-full h-full  z-0">
        <Image
          src="/contactustexture.png"
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
        <Image
          src="/border.png"
          alt="Background"
          className="object-cover absolute left-0 top-0"
          width={300}
          height={300}
        />
        <Image
          src="/border.png"
          alt="Background"
          className="object-cover absolute left-[100vw] translate-x-[-100%] scale-x-[-1]  top-0  "
          width={300}
          height={300}
        />
        <Image
          src="/border.png"
          alt="Background"
          className="object-cover absolute left-0 translate-y-[-100%] scale-y-[-1]  top-[100vh] "
          width={300}
          height={300}
        />
        <Image
          src="/border.png"
          alt="Background"
          className="object-cover absolute left-[100vw] translate-x-[-100%] translate-y-[-100%] scale-x-[-1] scale-y-[-1] top-[100vh] "
          width={300}
          height={300}
        />
        <Image
          src="/border.png"
          alt="Background"
          className="object-cover absolute left-0 top-0  "
          width={300}
          height={300}
        />
      </div>
      <div className="z-10 relative top-[116px] animate-fadein ">
        <h1
          className={`${cinzelDecorative.className} text-center text-[#8F5A1D]  text-6xl w-full`}
          style={{
            fontWeight: 700,
            textShadow:
              "0px 0px 5px rgba(0, 0, 0, 1),0px 0px 20px rgba(0, 0, 0, 1)",
          }}
        >
          CONTACT US
        </h1>
        <div
          className="flex flex-wrap justify-center mt-10 gap-x-10 gap-y-2 px-4 mb-4 w-full overflow-auto"
          style={{ height: "calc(100vh - 235px)" }}
        >
          {info.map((person, index) => (
            <div key={index} className="flex flex-col items-center px-10">
              <Image
                src="/mask.png"
                alt="Background"
                className="object-cover relative right-3"
                width={200}
                height={200}
              />
              <h2
                className={`text-2xl font-semibold text-[#785526] ${cinzel.className}`}
                style={{
                  fontWeight: 700,
                  textShadow:
                    "0px 0px 5px rgba(0, 0, 0, 1),0px 0px 20px rgba(0, 0, 0, 1)",
                }}
              >
                {person.name}
              </h2>
              <p className="text-sm text-[#785526] font-thin">{person.role}</p>
              <p className="text-sm text-[#785526] font-thin">
                {person.contact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
