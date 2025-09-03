"use client";
import { useState, useEffect } from "react";

export default function ScrollBar({ setThumbTop, thumbTop }) {
  const [height, setHeight] = useState(0);
  const thumbHeight = 35;

  useEffect(() => {
    const track = document.querySelector(".track");
    if (track) {
      setHeight(track.clientHeight);
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startTop = thumbTop;

    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newTop = Math.min(
        Math.max(startTop + deltaY, 10),
        150
      );
      setThumbTop(newTop);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <div
        className="bg-[#D9D9D9] opacity-20 absolute right-0 z-20 h-full w-[5px] track"
      >
      </div>
      <div
        onMouseDown={handleDrag}
        className="absolute w-[5px] bg-[#D9D9D9] rounded-4xl cursor-pointer z-20 top-0 right-0 h-[35px] thumb"
        style={{

          top: `${thumbTop}px`,
        }}
      />
    </>
  );
}
