"use client";
import { useState, useEffect } from "react";

export default function ScrollBar({ setThumbTop, thumbTop }) {
  const handleDrag = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startTop = thumbTop;

    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newTop = Math.min(
        Math.max(startTop + deltaY, 10),
         200
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
        onMouseDown={handleDrag}
        className="absolute w-[12px] bg-[#D9D9D9] rounded-4xl cursor-pointer z-20 top-0 right-0 h-[75px] thumb"
        style={{

          top: `${thumbTop}px`,
        }}
      />
    </>
  );
}
