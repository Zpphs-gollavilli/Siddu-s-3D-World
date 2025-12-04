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
  const [muted, setMuted] = useState(false);

  // Show skip button after 4 seconds
  useEffect(() => {
    if (intro) {
      const timer = setTimeout(() => setShowSkip(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [intro]);

  // Disable scroll during intro
  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "auto";
  }, [intro]);

  // Dragging logic
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

  // Handle video end
  const handleEnded = () => {
    setIntro(false);
    setPlayedOnce(true);
  };

  // End intro manually
  const endIntro = () => {
    setIntro(false);
    setPlayedOnce(true);
    videoRef.current?.pause();
  };

  if (!show) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  const floatingWidth = minimized ? 80 : 260;
  const floatingHeight = minimized ? 60 : 150;
  const mobileWidth = minimized ? 65 : 180;
  const mobileHeight = minimized ? 45 : 110;

  return (
    <div
      ref={containerRef}
      className={`fixed transition-all duration-300 z-[5000] ${intro ? "top-0 left-0 w-screen h-screen" : "cursor-grab"
        }`}
      style={{
        width: intro ? "100vw" : isMobile ? `${mobileWidth}px` : `${floatingWidth}px`,
        height: intro ? "100vh" : isMobile ? `${mobileHeight}px` : `${floatingHeight}px`,
        top: intro ? 0 : "12px",
        right: intro ? 0 : "12px",
        borderRadius: intro ? "0px" : "18px",
      }}
    >
      {/* Video */}
      {!minimized && (
        <video
          ref={videoRef}
          src="/logo.mp4"
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover ${intro ? "pointer-events-none" : "rounded-xl pointer-events-none"
            }`}
        />
      )}

      {/* Skip button */}
      {intro && showSkip && (
        <button
          onClick={endIntro}
          className="absolute bottom-8 right-8 bg-white/80 text-black font-semibold text-lg px-5 py-2 rounded-lg backdrop-blur-md"
        >
          Skip ⏭
        </button>
      )}

      {/* Play with sound */}
      {intro && (
        <button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.play();
            }
            setMuted(false);
            // DO NOT EXIT INTRO
          }}
          className="absolute bottom-20 right-8 bg-white/80 text-black font-semibold text-lg px-5 py-2 rounded-lg backdrop-blur-md"
        >
          Play with Sound 🔊
        </button>
      )}


      {/* Control buttons after intro */}
      {!intro && !minimized && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 z-[6000] pointer-events-auto">
          {/* Minimize */}
          <button
            onMouseEnter={() => setHoverYellow(true)}
            onMouseLeave={() => setHoverYellow(false)}
            onClick={(e) => {
              e.stopPropagation();
              setMinimized((p) => !p);
            }}
            className="relative w-6 h-6 rounded-full bg-yellow-400 border border-black/40 hover:bg-yellow-300 flex items-center justify-center"
          >
            {hoverYellow && <span className="text-black text-lg font-bold">–</span>}
          </button>

          {/* Close */}
          <button
            onMouseEnter={() => setHoverRed(true)}
            onMouseLeave={() => setHoverRed(false)}
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
            className="relative w-6 h-6 rounded-full bg-red-500 border border-black/40 hover:bg-red-400 flex items-center justify-center"
          >
            {hoverRed && <span className="text-black text-lg font-bold">×</span>}
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
                setMuted(videoRef.current.muted);
              }
            }}
            className="relative w-6 h-6 rounded-full bg-blue-400 border border-black/40 hover:bg-blue-300 flex items-center justify-center"
          >
            <span className="text-black text-lg font-bold">{muted ? "🔇" : "🔊"}</span>
          </button>

          {/* Replay */}
          {playedOnce && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlayedOnce(false);
                videoRef.current?.play();
              }}
              className="relative w-6 h-6 rounded-full bg-black/60 text-white hover:bg-black/75 flex items-center justify-center"
            >
              🔁
            </button>
          )}
        </div>
      )}
    </div>
  );
}
