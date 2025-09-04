"use client"
const MIN_TOP = 10;
const MAX_TOP = 75;
const MIN_SCALE = 1;
const MAX_SCALE = 2;
const MIN_TRANSLATE = 0;
const MAX_TRANSLATE = 50;

let wheelAnimationFrame = null, wheelTargetTop = null;

export function handleWheel(e, setThumbTop) {
  const thumb = document.querySelector(".thumb");
  if (!thumb) return;

  wheelTargetTop = Math.max(10, Math.min((parseInt(thumb.style.top || 0, 10) + (e.deltaY > 0 ? 30 : -30)), 150));
  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);

  (function animate() {
    let current = parseFloat(thumb.style.top || 0), diff = wheelTargetTop - current;
    if (Math.abs(diff) < 1) { thumb.style.top = `${wheelTargetTop}px`; setThumbTop(wheelTargetTop); wheelAnimationFrame = null; return; }
    thumb.style.top = `${current + diff * 0.2}px`; setThumbTop(current + diff * 0.2);
    wheelAnimationFrame = requestAnimationFrame(animate);
  })();
}


export function getScale(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const scale = MIN_SCALE + ((clampedTop - MIN_TOP) / (MAX_TOP - MIN_TOP)) * (MAX_SCALE - MIN_SCALE);
  return scale;
}

const MIN_SCALE_SP = 0.5;
const MAX_SCALE_SP = 1;

export function setScale(thumbTop) {
  const clampedTop = Math.max(75, Math.min(thumbTop, 150));
  const scale = MIN_SCALE_SP + ((clampedTop - 75) / (150 - 75)) * (MAX_SCALE_SP - MIN_SCALE_SP);
  return scale;
}

export function getTranslate(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, 150));
  const vhTranslate = ((clampedTop - MIN_TOP) / (150 - MIN_TOP)) * 50; 
  const percentTranslate = ((clampedTop - MIN_TOP) / (150 - MIN_TOP)) * 25;
  return `calc(${vhTranslate}vh + ${percentTranslate}%)`;
}


const MAX_OPACITY = 25;

export function darkToLight(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP));
  const opacity = ((MAX_TOP - clampedTop) / (MAX_TOP - MIN_TOP)) * MAX_OPACITY;
  return opacity;
}



const MIN_OPACITY_SP = 0;
const MAX_OPACITY_SP = 1;

export function setOpacity(thumbTop) {
  const clampedTop = Math.max(MIN_TOP, Math.min(thumbTop, MAX_TOP / 2));
  return ((clampedTop - MIN_TOP) / ((MAX_TOP / 2) - MIN_TOP)) * (MAX_OPACITY_SP - MIN_OPACITY_SP) + MIN_OPACITY_SP;
}




let touchStartY = 0;
let velocity = 0;

export function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY;
  velocity = 0;
  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);
}

export function handleTouchMove(e, setThumbTop, thumbTop) {
  
  const thumb = document.querySelector(".thumb");
  if (!thumb) return;

  const touchY = e.touches[0].clientY;
  const delta = touchStartY - touchY;
  touchStartY = touchY;

  velocity = delta;

  const isPullingDown = delta < 0;
  if (!(thumbTop === MIN_TOP && isPullingDown)) e.preventDefault();


  wheelTargetTop = Math.max(10, Math.min(parseFloat(thumb.style.top || 0) + delta, 150));

  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);

  (function animate() {
    let current = parseFloat(thumb.style.top || 0);
    let diff = wheelTargetTop - current;
    if (Math.abs(diff) < 1) {
      thumb.style.top = `${wheelTargetTop}px`;
      setThumbTop(wheelTargetTop);
      wheelAnimationFrame = null;
      return;
    }
    thumb.style.top = `${current + diff * 0.5}px`;
    setThumbTop(current + diff * 0.5);
    wheelAnimationFrame = requestAnimationFrame(animate);
  })();
}

export function handleTouchEnd(setThumbTop) {
  const thumb = document.querySelector(".thumb");
  if (!thumb) return;

  if (Math.abs(velocity) < 1) return;

  wheelTargetTop = Math.max(10, Math.min(parseFloat(thumb.style.top || 0) + velocity * 5, 150));

  if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);

  (function animate() {
    let current = parseFloat(thumb.style.top || 0);
    let diff = wheelTargetTop - current;

    velocity *= 0.95;

    if (Math.abs(diff) < 0.5 || Math.abs(velocity) < 0.5) {
      thumb.style.top = `${wheelTargetTop}px`;
      setThumbTop(wheelTargetTop);
      wheelAnimationFrame = null;
      return;
    }

    thumb.style.top = `${current + diff * 0.2}px`;
    setThumbTop(current + diff * 0.2);
    wheelAnimationFrame = requestAnimationFrame(animate);
  })();
}
