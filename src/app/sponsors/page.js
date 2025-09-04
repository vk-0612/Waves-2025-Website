"use client";
import Image from "next/image";
import Sponsor from "../../../components/Sponsor";
import ScrollBar from "../../../components/ScrollBar";
import { handleWheel, getScale, getTranslate, darkToLight, setScale, setOpacity, handleTouchStart, handleTouchMove, handleTouchEnd } from "../../../components/Functions";
import { useState, useRef, useEffect } from "react";

export default function Sponsors() {
  const [thumbTop, setThumbTop] = useState(10);

  useEffect(() => {
    document.querySelector('.scroll').style.opacity = (thumbTop == 150) ? 0 : 1;

    const main = document.querySelector(".main");
    if (!main) return;
    const touchMoveHandler = (e) => handleTouchMove(e, setThumbTop, thumbTop);
    main.addEventListener("touchmove", touchMoveHandler, { passive: false });

    return () => {
      main.removeEventListener("touchmove", touchMoveHandler);
    }
  }, [thumbTop]);

  return (
    <>
      <div className="main relative w-screen h-[100%] overflow-hidden"
        onWheel={(e) => handleWheel(e, setThumbTop)}
        onTouchEnd={() => handleTouchEnd(setThumbTop)}
        onTouchStart={handleTouchStart}
      >
        <div className="scroll h-screen absolute top-0 right-0 z-30 transition-opacity duration-100 ease-linear">
          <ScrollBar setThumbTop={setThumbTop} thumbTop={thumbTop} />
        </div>
        <Image
          src="/Sponsors.svg"
          alt="Background"
          fill
          className="object-cover"
          draggable={false}
        />
        <nav></nav>

        <div className="bg-black z-10 absolute inset-0 w-screen h-screen"
          style={{ opacity: darkToLight(thumbTop) / 100 }}
        ></div>
        <div className="flex flex-1 justify-center items-center h-screen list">
          <div className="first relative z-30"
            style={{ transform: `scale(${getScale(thumbTop)}) translateY(${getTranslate(thumbTop)})` }}
          >
            <Sponsor />
          </div>
          <div className="second absolute origin-bottom z-20 backdrop-blur-md"
            style={{
              transform: `scale(${setScale(thumbTop)})`,
              opacity: setOpacity(thumbTop),
            }}
          >
            <Sponsor />
          </div>
        </div>
      </div>
    </>
  );
}
