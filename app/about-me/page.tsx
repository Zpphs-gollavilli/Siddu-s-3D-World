"use client";

import React, { Suspense, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- Easing (TS-safe cubic-beziers) ---------------- */
const easeOutCubic = [0.16, 1, 0.3, 1] as const;
const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

/* ---------------- 3D: Shinchan + Shiro + Grass (single GLB) ---------------- */
function ShinchanWorld({
  url = "/shinchan_world.glb",
  scale = 0.5,
}: {
  url?: string;
  scale?: number;
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D | null>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  return <primitive ref={ref} object={scene} scale={scale} position={[0, -0.2, 0]} />;
}
useGLTF.preload("/shinchan_world.glb");

function ShinchanWorldCanvas() {
  const [auto, setAuto] = useState(true);
  const controls = useRef<any>(null);
  let downAt = 0;

  const onDown = () => {
    downAt = Date.now();
    setAuto(false);
  };
  const onUp = () => {
    const dt = Date.now() - downAt;
    if (dt < 180) setAuto((v) => !v); // quick click toggles play/pause
  };

  return (
    <div className="w-[160px] h-[180px] md:w-[200px] md:h-[220px] lg:w-[240px] lg:h-[260px] mx-auto">
      <Canvas
        shadows
        camera={{ fov: 40, position: [2.2, 1.5, 3.2] }}
        gl={{ antialias: true }}
        onPointerDown={onDown}
        onPointerUp={onUp}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 6]} intensity={1.1} />
        <Suspense fallback={null}>
          <ShinchanWorld />
        </Suspense>
        <OrbitControls
          ref={controls}
          enablePan={false}
          enableZoom={false}
          autoRotate={auto}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}

/* ---------------- Animation helpers ---------------- */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { y: 18, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: easeOutCubic },
  },
};

const floatPulse: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

export default function AboutMe() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="safe-layout px-4 py-14 md:py-20 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="text-center">
        <motion.h2
          initial={{ scale: 0.96, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, ease: easeOutCubic }}
          className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat"
        >
          <span className="bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: easeOutCubic }}
          className="font-medium text-lg md:text-xl text-gray-800/90 max-w-[980px] mx-auto"
        >
          “A powerful smash on the court, a smart move on the chessboard, a melody in the heart,
          and code in the mind — that’s me!”
        </motion.p>
      </div>

      {/* Layout */}
      <div ref={ref} className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Text (2/3 width on desktop) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="lg:col-span-2 space-y-6 text-[1.02rem] md:text-lg leading-relaxed text-gray-900 font-medium"
        >
          <motion.p variants={fadeUp}>
            Hello! I’m <strong className="text-sky-600">G Siddharth</strong>, a passionate and energetic 7th-grade student at{" "}
            <em>Zilla Parishad High School, Gollavilli</em>. I believe in growing every day — not just in the classroom, but in
            everything I love: <strong>Badminton</strong>, <strong>Chess</strong>, <strong>Music</strong>, and{" "}
            <strong>Technology</strong>. I’m curious, consistent, and excited to build meaningful things.
          </motion.p>

          <motion.p variants={fadeUp}>
            <span className="font-semibold text-blue-700">🏸 Badminton — My Drive to Excel:</span>{" "}
            I’ve proudly represented my school in state-level tournaments. Training sharpens my discipline and focus. My favorite
            move? The smash — fast, powerful, and just like how I chase my dreams!
          </motion.p>

          <motion.p variants={fadeUp}>
            <span className="font-semibold text-purple-700">♟️ Chess — My Mind’s Playground:</span>{" "}
            Chess trains strategy, patience, and planning. I review games, study openings and endgames, and keep a growth mindset.
            I’ve competed at the district level and I’m steadily leveling up like a future grandmaster.
          </motion.p>

          <motion.p variants={fadeUp}>
            <span className="font-semibold text-pink-600">🎶 Music — My Soul’s Rhythm:</span>{" "}
            I’m deeply connected to Carnatic classical music — from Sarali Swaras to Varnams. Music keeps me balanced and calm,
            and helps me bring emotion and clarity into everything I do.
          </motion.p>

          <motion.p variants={fadeUp}>
            <span className="font-semibold text-cyan-600">💻 Tech — My Digital Playground:</span>{" "}
            I’m a self-taught developer who learns by building. I’ve launched a 3D portfolio, a badminton tracker, a tic-tac-toe
            game, and even my school website. Every click and line of code teaches me something new.
          </motion.p>

          {/* New richer content */}
          <motion.div variants={fadeUp} className="rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 p-5 shadow-sm">
            <p className="font-semibold text-emerald-700 mb-2">🚀 What I’m Working Toward</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Smarter footwork and consistency in badminton — training log, recovery, and form.</li>
              <li>Stronger chess fundamentals: tactics (30/day), opening prep, clean endgame play.</li>
              <li>Music discipline: daily riyaz, voice control, and confident performance.</li>
              <li>Shipping 3 polished web apps with React + Three.js + TypeScript.</li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5 shadow-sm">
            <p className="font-semibold text-indigo-700 mb-2">🤝 How I Work</p>
            <p>
              I love pair-learning and sharing with friends. I keep notes, track progress, and ask great questions. If I don’t know
              something, I’ll research, experiment, and iterate until I do. Teamwork makes projects meaningful.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="border border-amber-200 bg-amber-50 rounded-2xl p-5 shadow-sm">
            <p className="italic text-amber-700">My Motto:</p>
            <p className="font-semibold">
              “Balance body, mind, soul, and tech — and you’ll unlock your full potential.”
            </p>
          </motion.div>

          <motion.p variants={fadeUp}>
            Whether I’m smashing shuttles, solving puzzles, composing tunes, or building websites, I’m always learning, creating,
            and dreaming big. If you’re curious too, let’s connect and build something extraordinary together.
          </motion.p>

          {/* subtle looping accent under final line */}
          <motion.div
            variants={floatPulse}
            animate={{ y: [0, -3, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 3, ease: easeInOutCubic }}
            className="h-[3px] w-40 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full"
          />
        </motion.div>

        {/* 3D canvas (right column) */}
        <motion.div
          initial={{ x: 24, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: easeOutCubic }}
          className="flex justify-center lg:justify-end"
        >
          <ShinchanWorldCanvas />
        </motion.div>
      </div>
    </section>
  );
}
