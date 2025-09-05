"use client";
import Image from "next/image";
import Sponsor from "../../../components/Sponsor";
import ScrollBar from "../../../components/ScrollBar";
import { handleWheel, getScale, getTranslate, setScale, setOpacity, handleTouchStart, handleTouchMove, handleTouchEnd, darkToLight } from "../../../components/Functions";
import { useState, useEffect, useRef } from "react";
import { Cinzel } from "next/font/google";
import { useMediaQuery } from "../../../components/useMediaQuery";

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'] });

export default function Sponsors() {
  const isLargeScreen = useMediaQuery("(min-width: 115vh)");
  const [thumbTop, setThumbTop] = useState(10);

  const list = [
    { range: [10, 35], translate: [35, 60] },
    { range: [35, 60], translate: [60, 85] },
    { range: [60, 85], translate: [85, 110] },
    { range: [85, 110], translate: [110, 135] },
    { range: [110, 135], translate: [135, 160] },
    { range: [135, 160], translate: [160, 185] },
    { range: [160, 185] },
  ];

  useEffect(() => {
    document.querySelector('.scroll').style.opacity = (thumbTop == 185) ? 0 : 0.23;
    console.log(thumbTop);

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
        onTouchStart={handleTouchStart}
        onTouchEnd={() => handleTouchEnd(setThumbTop)}
      >
        <div className="scroll h-screen absolute top-0 right-0 z-30 transition-opacity duration-200 ease-linear">
          <ScrollBar setThumbTop={setThumbTop} thumbTop={thumbTop} />
        </div>
        <div>
          <Image
            src="/Sponsors.svg"
            alt="Background"
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        <div className="flex justify-center items-center flex-col h-screen list">
          <div className={`title relative z-30 ${cinzel.className} md:w-[70vw] w-[80vw] flex flex-wrap text-center relative md:top-[10vh] font-bold text-[#E1C473] xl:text-[5vw] lg:text-[90px] text-[50px] sm:text-[70px]`}
            style={{
              transform: `scale(${getScale(thumbTop, 10, 50)}) translateY(${getTranslate(thumbTop, 10, 50)})`,
              opacity: darkToLight(thumbTop, 10, 35) / 100,
            }}
          >
            OUR SPONSORS & MEDIA PARTNERS
          </div>

          {list.map((style, i) =>
            isLargeScreen ? (
              <div
                key={i}
                className="absolute origin-top z-30 flex gap-[2vw] backdrop-blur-lg"
                style={{
                  transform: `scale(${setScale(
                    thumbTop,
                    style.range[0],
                    style.range[1]
                  )}) ${style.translate
                    ? `translateY(${getTranslate(
                      thumbTop,
                      style.translate[0],
                      style.translate[1]
                    )})`
                    : ""
                    }`,
                  opacity: setOpacity(thumbTop, style.range[0], style.range[1]),
                }}
              >
                <Sponsor />
                <Sponsor />
                <Sponsor />
              </div>
            ) : 
            <div
              key={i}
              className="grid grid-cols-2 gap-[2vw] absolute w-full h-full"
              style={{
                  transform: `scale(${setScale(
                    thumbTop,
                    style.range[0],
                    style.range[1]
                  )}) ${style.translate
                    ? `translateY(${getTranslate(
                      thumbTop,
                      style.translate[0],
                      style.translate[1]
                    )})`
                    : ""
                    }`,
                  opacity: setOpacity(thumbTop, style.range[0], style.range[1]),
                }}
            >
              <div className="w-full h-full flex items-end justify-end">
                <Sponsor />
              </div>
              <div className="w-full h-full flex items-end justify-start">
                <Sponsor />
              </div>
              <div className="w-full h-full flex items-start justify-end">
                <Sponsor />
              </div>
              <div className="w-full h-full flex items-start justify-start">
                <Sponsor />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
