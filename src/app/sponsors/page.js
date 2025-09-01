"use client"
import Image from "next/image";

export default function Home() {
  return (
    <div className="main w-screen h-screen">
        <Image src="./sponsors-bg.svg" fill className="object-cover z-0 relative" alt="background" />
        <div className="bg-black z-10 absolute inset-0 w-screen h-screen opacity-30"></div>
        <nav className="relative z-20">

        </nav>
        <div className="flex justify-center items-center h-screen">
            <section className="relative z-20 w-[380px] h-[480px] bg-white/8 rounded-2xl backdrop-blur-md shadow-lg">

            </section>

        </div>
    </div>
  );
}
