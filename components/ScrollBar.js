"use client";
import { useState, useEffect, useRef } from "react";

export default function ScrollBar() {
  const thumbHeight = useRef(0);
  useEffect(() => {
    document.querySelector('.thumb').style.height = `${(document.querySelector('.main').clientHeight/document.querySelector('.list').childElementCount)-20}px`
    thumbHeight.current = parseInt(document.querySelector('.thumb').style.height);

  }, [])

  const [height, setHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(10);

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
        height - thumbHeight.current - 10
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
        className="bg-[#D9D9D9] opacity-20 absolute right-0 z-20 h-screen w-[5px] track"
      >
      </div>
      <div
        onMouseDown={handleDrag}
        className="absolute w-[5px] bg-[#D9D9D9] rounded-2xl cursor-pointer z-20 top-0 right-0 thumb"
        style={{

          top: `${thumbTop}px`,
        }}
      />
    </>
  );
}
