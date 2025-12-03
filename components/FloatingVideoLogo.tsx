"use client";
import { useEffect, useRef, useState } from "react";

export default function FloatingVideoLogo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [intro, setIntro] = useState(true);
  const [show, setShow] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);
  const [hoverYellow, setHoverYellow] = useState(false);
  const [hoverRed, setHoverRed] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  /* -----------------------------------------
     SHOW SKIP BUTTON
  ----------------------------------------- */
  useEffect(() => {
    if (intro) {
      const timer = setTimeout(() => setShowSkip(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [intro]);

  /* -----------------------------------------
     DISABLE SCROLL IN INTRO
  ----------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "auto";
  }, [intro]);

  /* -----------------------------------------
     DRAG ONLY WHEN FLOATING + LIMIT EDGES
  ----------------------------------------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || intro) return;

    let dragging = false,
      offsetX = 0,
      offsetY = 0;

    const start = (e: any) => {
      dragging = true;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = x - el.offsetLeft;
      offsetY = y - el.offsetTop;
    };

    const move = (e: any) => {
      if (!dragging) return;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      const x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;

      // limit edges (never cut)
      const maxX = viewportW - el.offsetWidth - 10;
      const maxY = viewportH - el.offsetHeight - 10;

      el.style.left = `${Math.min(Math.max(10, x), maxX)}px`;
      el.style.top = `${Math.min(Math.max(10, y), maxY)}px`;
    };

    const stop = () => (dragging = false);

    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);

    return () => {
      el.removeEventListener("mousedown", start);
      el.removeEventListener("touchstart", start);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [intro]);

  const endIntro = () => {
    setIntro(false);
    setPlayedOnce(true);
    videoRef.current?.pause();
  };

  const handleEnded = () => {
    if (intro) endIntro();
    else setPlayedOnce(true);
  };

  if (!show) return null;

  /* -----------------------------------------
     RESPONSIVE SIZE CALCULATION
  ----------------------------------------- */
  const floatingWidth = minimized ? 80 : 260; // desktop
  const floatingHeight = minimized ? 60 : 150;

  const mobileWidth = minimized ? 65 : 180; // mobile
  const mobileHeight = minimized ? 45 : 110;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  return (
    <div
      ref={containerRef}
      className={`fixed transition-all duration-300 z-[5000]
        ${intro ? "top-0 left-0 w-screen h-screen" : "cursor-grab"}
      `}
      style={{
        width: intro ? "100vw" : isMobile ? `${mobileWidth}px` : `${floatingWidth}px`,
        height: intro ? "100vh" : isMobile ? `${mobileHeight}px` : `${floatingHeight}px`,
        top: intro ? 0 : "12px",
        right: intro ? 0 : "12px",
        borderRadius: intro ? "0px" : "18px",
      }}
    >

      {/* SKIP BUTTON */}
      {intro && showSkip && (
        <button
          onClick={endIntro}
          className="absolute bottom-8 right-8 bg-white/80 text-black font-semibold text-lg px-5 py-2 rounded-lg backdrop-blur-md"
        >
          Skip ⏭
        </button>
      )}

      {/* FLOATING BUTTONS */}
      {!intro && (
        <div className="absolute top-2 left-2 flex gap-2 z-[6000] pointer-events-auto">
          <button
            onMouseEnter={() => setHoverYellow(true)}
            onMouseLeave={() => setHoverYellow(false)}
            onClick={(e) => {
              e.stopPropagation();
              setMinimized((p) => !p);
            }}
            className="relative w-4 h-4 rounded-full bg-yellow-400 border border-black/40 hover:bg-yellow-300"
          >
            {hoverYellow && (
              <span className="absolute text-black text-[12px] font-bold left-1 top-[-3px]">–</span>
            )}
          </button>

          <button
            onMouseEnter={() => setHoverRed(true)}
            onMouseLeave={() => setHoverRed(false)}
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
            className="relative w-4 h-4 rounded-full bg-red-500 border border-black/40 hover:bg-red-400"
          >
            {hoverRed && (
              <span className="absolute text-black text-[11px] font-bold left-[5px] top-[-4px]">×</span>
            )}
          </button>
        </div>
      )}

      {/* VIDEO */}
      {!minimized && (
        <video
          ref={videoRef}
          src="/logo.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover 
            ${intro ? "pointer-events-none" : "rounded-xl pointer-events-none"}
          `}
        />
      )}

      {/* REPLAY BUTTON */}
      {playedOnce && !intro && !minimized && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPlayedOnce(false);
            videoRef.current?.play();
          }}
          className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-3 py-[2px] rounded-md hover:bg-black/75 backdrop-blur-md"
        >
          Replay 🔁
        </button>
      )}
    </div>
  );
}
