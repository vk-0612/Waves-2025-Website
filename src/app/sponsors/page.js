"use client"
import Image from "next/image";
import Sponsor from "../../../components/Sponsor";
import ScrollBar from "../../../components/ScrollBar";
import { useRef } from "react";

export default function Sponsors() {
  const handleWheel = (e) => {
    const thumb = document.querySelector(".thumb");
    const main = document.querySelector(".main");
    if (!thumb || !main) return;

    let currentTop = parseInt(thumb.style.top || "0", 10);
    let delta = e.deltaY > 0 ? 20 : -20;

    currentTop += delta;

    const mainHeight = main.clientHeight;
    const thumbHeight = thumb.clientHeight;
    if(currentTop < 10) {
      currentTop = 10;
    } 
    if(currentTop > mainHeight - thumbHeight - 10) {
      currentTop = mainHeight - thumbHeight - 10;
    }

    thumb.style.top = `${currentTop}px`;

  };

  return (
    <>
      <div onWheel={handleWheel}>
        <ScrollBar />
      </div>
      <div className="main relative w-screen h-screen overflow-hidden" onWheel={handleWheel} >
        <Image
          src="/sponsors-bg.svg"
          alt="Background"
          fill
          className="object-cover"
          draggable={false}
        />
        <nav>

        </nav>
        {/* <div className="bg-black z-10 absolute inset-0 w-screen h-screen opacity-25"></div> */}
        <div className="flex flex-1 justify-center items-center h-screen list">
          <div>
            <Sponsor />
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  );
}
