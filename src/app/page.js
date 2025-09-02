import React from "react";
import Image from "next/image";

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
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />
      </div>
    </div>
  );
}