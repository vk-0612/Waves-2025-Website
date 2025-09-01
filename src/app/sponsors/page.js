"use client"
import Image from "next/image";

export default function Home() {
  return (
    <div className="main relative w-screen h-screen">
        <Image
        src="/sponsors-bg.svg"
        alt="Cropped Image"
        fill
        className="object-cover"
      />
        <div className="bg-black z-10 absolute inset-0 w-screen h-screen opacity-10"></div>
        <nav className="relative z-20">

        </nav>
        <div className="flex justify-center items-center h-screen">
            <section className="relative z-20 w-[300px] h-[400px] bg-white/8 rounded-2xl backdrop-blur-md shadow-lg">

            </section>

        </div>
    </div>
  );
}
