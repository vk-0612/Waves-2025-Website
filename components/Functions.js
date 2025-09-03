"use client"
const MIN_TOP = 10;
const MAX_TOP = 110;
const MIN_SCALE = 1;
const MAX_SCALE = 2;
const MAX_TOP_TY = 150;
const MIN_TRANSLATE = 0;
const MAX_TRANSLATE = 100;

export function handleWheel(e, setThumbTop) {
  const thumb = document.querySelector(".thumb");
  const main = document.querySelector(".main");
  if (!thumb || !main) return;

  let currentTop = parseInt(thumb.style.top || "0", 10);
  let delta = e.deltaY > 0 ? 10 : -10;

  currentTop += delta;

  if (currentTop < 10) {
    currentTop = 10;
  }
  if (currentTop > 150) {
    currentTop = 150;
  }

  thumb.style.top = `${currentTop}px`;
  setThumbTop(currentTop);

};

export function getScale(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const scale = MIN_SCALE + ((clampedTop - MIN_TOP) / (MAX_TOP - MIN_TOP)) * (MAX_SCALE - MIN_SCALE);
  return scale;
}

export function getTranslate(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP_TY));
  const translate = ((clampedTop - MIN_TRANSLATE - 10) / (MAX_TOP_TY - MIN_TOP)) * (MAX_TRANSLATE - MIN_TRANSLATE);
  return translate;
}

const MAX_OPACITY = 25;

export function darkToLight(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const opacity = ((MAX_TOP - clampedTop) / (MAX_TOP - MIN_TOP)) * MAX_OPACITY;
  return opacity;
}

const MIN_SCALE_SP = 0.5;
const MAX_SCALE_SP = 1;
const MIN_TOP_SP = 110
const MAX_TOP_SP = 150

export function setScale(thumbTop) {
  const clampedTop = Math.max(MIN_TOP_SP, Math.min(thumbTop, MAX_TOP_SP));
  const scale = MIN_SCALE_SP + ((clampedTop - MIN_TOP_SP) / (MAX_TOP_SP - MIN_TOP_SP)) * (MAX_SCALE_SP - MIN_SCALE_SP);
  return scale;
}

const MIN_OPACITY_SP = 0;
const MAX_OPACITY_SP = 1;

export function setOpacity(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP / 2));
  return ((clampedTop - MIN_TOP) / ((MAX_TOP / 2) - MIN_TOP)) * (MAX_OPACITY_SP - MIN_OPACITY_SP) + MIN_OPACITY_SP;
}

