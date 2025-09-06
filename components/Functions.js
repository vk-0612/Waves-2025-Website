"use client"

let wheelAnimationFrame = null;
const snapPoints = [10, 35, 60, 85, 110, 135, 160, 185];

export function handleWheel(e, setThumbTop) {
  const thumb = document.querySelector(".thumb");
  if (!thumb) return;

  const currentTop = parseFloat(thumb.style.top || 10);
  const currentIdx = snapPoints.findIndex(s => s === snapPoints.reduce((prev, curr) =>
    Math.abs(curr - currentTop) < Math.abs(prev - currentTop) ? curr : prev
  ));

  const direction = e.deltaY > 0 ? 1 : -1;

  let nextIdx = currentIdx + direction;
  if (nextIdx < 0) nextIdx = 0;
  if (nextIdx >= snapPoints.length) nextIdx = snapPoints.length - 1;
  const target = snapPoints[nextIdx];

  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);

  (function animate() {
    const current = parseFloat(thumb.style.top || 0);
    const diff = target - current;
    const step = Math.sign(diff) * Math.min(Math.abs(diff)*0.75, 1);

    if (Math.abs(diff) < 0.5) {
      thumb.style.top = `${target}px`;
      setThumbTop(target);
      wheelAnimationFrame = null;
      return;
    }

    thumb.style.top = `${current + step}px`;
    setThumbTop(current + step);
    wheelAnimationFrame = requestAnimationFrame(animate);
  })();

}

const MIN_SCALE = 1;
const MAX_SCALE = 2;
export function getScale(thumbTop, MIN_TOP, MAX_TOP) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const scale = MIN_SCALE + ((clampedTop - MIN_TOP) / (MAX_TOP - MIN_TOP)) * (MAX_SCALE - MIN_SCALE);
  return scale;
}


const MIN_SCALE_SP = 0.5;
const MAX_SCALE_SP = 1;

export function setScale(thumbTop, MIN_TOP, MAX_TOP) {
  if (thumbTop < MIN_TOP) return MIN_SCALE_SP;
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const scale = MIN_SCALE_SP + ((clampedTop - MIN_TOP) / (MAX_TOP - MIN_TOP)) * (MAX_SCALE_SP - MIN_SCALE_SP);
  return scale;
}

export function getTranslate(thumbTop, MIN_TOP, MAX_TOP) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const vhTranslate = ((clampedTop - MIN_TOP) / (MAX_TOP - MIN_TOP)) * 50;
  const percentTranslate = ((clampedTop - MIN_TOP) / (MAX_TOP - MIN_TOP)) * 50;
  return `calc(${vhTranslate}vh + ${percentTranslate}%)`;
}

const MAX_OPACITY = 51;

export function darkToLight(thumbTop, MIN_TOP, MAX_TOP) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const opacity = ((MAX_TOP - clampedTop) / (MAX_TOP - MIN_TOP)) * MAX_OPACITY;
  return opacity;
}

const MIN_OPACITY_SP = 0;
const MAX_OPACITY_SP = 1;

export function setOpacity(thumbTop, MIN_TOP, MAX_TOP) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  return ((clampedTop - MIN_TOP) / ((MAX_TOP) - MIN_TOP)) * (MAX_OPACITY_SP - MIN_OPACITY_SP) + MIN_OPACITY_SP;
}


let touchStartY = 0;
let velocity = 0;

export function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY;
  velocity = 0;
  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);
}

export function handleTouchMove(e, setThumbTop, thumbTop) {
  if (e.touches.length > 1) return;
  const thumb = document.querySelector(".thumb");
  if (!thumb) return;

  const touchY = e.touches[0].clientY;
  const delta = touchStartY - touchY;
  touchStartY = touchY;
  velocity = delta;

  if (!(thumbTop === snapPoints[0] && delta < 0)) e.preventDefault();

  let target = parseFloat(thumb.style.top || 0) + delta;
  const currentSnap = snapPoints.reduce((prev, curr) =>
    Math.abs(curr - parseFloat(thumb.style.top || 0)) < Math.abs(prev - parseFloat(thumb.style.top || 0)) ? curr : prev
  );

  const direction = delta > 0 ? 1 : -1;
  const currentIdx = snapPoints.indexOf(currentSnap);
  let nextIdx = currentIdx + direction;
  if (nextIdx < 0) nextIdx = 0;
  if (nextIdx >= snapPoints.length) nextIdx = snapPoints.length - 1;
  target = snapPoints[nextIdx];

  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);

  (function animate() {
    const current = parseFloat(thumb.style.top || 0);
    const diff = target - current;
    const step = Math.sign(diff) * Math.min(Math.abs(diff), 0.5);

    if (Math.abs(diff) < 0.5) {
      thumb.style.top = `${target}px`;
      setThumbTop(target);
      wheelAnimationFrame = null;
      return;
    }

    thumb.style.top = `${current + step}px`;
    setThumbTop(current + step);
    wheelAnimationFrame = requestAnimationFrame(animate);
  })();
}

export function handleTouchEnd(setThumbTop) {
  const thumb = document.querySelector(".thumb");
  if (!thumb) return;

  if (Math.abs(velocity) < 1) return;

  const currentSnap = snapPoints.reduce((prev, curr) =>
    Math.abs(curr - parseFloat(thumb.style.top || 0)) < Math.abs(prev - parseFloat(thumb.style.top || 0)) ? curr : prev
  );

  const direction = velocity > 0 ? 1 : -1;
  const currentIdx = snapPoints.indexOf(currentSnap);
  let nextIdx = currentIdx + direction;
  if (nextIdx < 0) nextIdx = 0;
  if (nextIdx >= snapPoints.length) nextIdx = snapPoints.length - 1;
  const target = snapPoints[nextIdx];

  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);

  (function animate() {
    const current = parseFloat(thumb.style.top || 0);
    const diff = target - current;
    const step = Math.sign(diff) * Math.min(Math.abs(diff), 1);

    if (Math.abs(diff) < 0.5) {
      thumb.style.top = `${target}px`;
      setThumbTop(target);
      wheelAnimationFrame = null;
      return;
    }

    thumb.style.top = `${current + step}px`;
    setThumbTop(current + step);
    requestAnimationFrame(animate);
  })();
}

