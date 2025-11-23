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

  const [showSkip, setShowSkip] = useState(false); // NEW

  // Show Skip button after 4 sec
  useEffect(() => {
    if (intro) {
      const timer = setTimeout(() => setShowSkip(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [intro]);

  // Disable scrolling during intro
  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "auto";
  }, [intro]);

  // Drag logic (only floating mode)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || intro) return;

    let dragging = false,
      offsetX = 0,
      offsetY = 0;

    const mouseDown = (e: any) => {
      dragging = true;
      const posX = e.touches ? e.touches[0].clientX : e.clientX;
      const posY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = posX - el.offsetLeft;
      offsetY = posY - el.offsetTop;
    };

    const mouseMove = (e: any) => {
      if (!dragging) return;
      const posX = e.touches ? e.touches[0].clientX : e.clientX;
      const posY = e.touches ? e.touches[0].clientY : e.clientY;
      el.style.left = `${posX - offsetX}px`;
      el.style.top = `${posY - offsetY}px`;
    };

    const stop = () => (dragging = false);

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("touchstart", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", mouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("touchstart", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", mouseMove);
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

  return (
    <div
      ref={containerRef}
      className={`fixed transition-all duration-300 z-[5000] ${
        intro ? "top-0 left-0 w-screen h-screen" : "top-4 right-4 cursor-grab"
      }`}
      style={{
        width: intro ? "100vw" : minimized ? "80px" : "260px",
        height: intro ? "100vh" : minimized ? "60px" : "150px",
      }}
    >
      {/* Skip button inside intro */}
      {intro && showSkip && (
        <button
          onClick={endIntro}
          className="absolute bottom-6 right-6 bg-white/80 text-black font-semibold text-lg px-4 py-2 rounded-md backdrop-blur-md"
        >
          Skip ⏭
        </button>
      )}

      {/* Buttons (only floating) */}
      {!intro && (
        <div className="absolute top-2 left-2 flex gap-2 z-[6000] pointer-events-auto">
          {/* Minimize (Yellow) */}
          <button
            onMouseEnter={() => setHoverYellow(true)}
            onMouseLeave={() => setHoverYellow(false)}
            onClick={(e) => {
              e.stopPropagation();
              setMinimized((prev) => !prev);
            }}
            className="relative w-[15px] h-[15px] rounded-full bg-yellow-400 border border-black/40 hover:bg-yellow-300"
          >
            {hoverYellow && (
              <span className="absolute text-black text-[12px] font-bold left-[4.5px] top-[-3px]">
                –
              </span>
            )}
          </button>

          {/* Close (Red) */}
          <button
            onMouseEnter={() => setHoverRed(true)}
            onMouseLeave={() => setHoverRed(false)}
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
            className="relative w-[15px] h-[15px] rounded-full bg-red-500 border border-black/40 hover:bg-red-400"
          >
            {hoverRed && (
              <span className="absolute text-black text-[11px] font-bold left-[4px] top-[-4px]">
                ×
              </span>
            )}
          </button>
        </div>
      )}

      {/* Video */}
      {!minimized && (
        <video
          ref={videoRef}
          src="/logo.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover ${intro ? "pointer-events-none" : "rounded-xl pointer-events-none"}`}


        />
      )}

      {/* Replay */}
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
