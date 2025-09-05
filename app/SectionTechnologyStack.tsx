"use client";

import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./home.module.css";

/* 3D */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- Tech data ---------------- */
const tech = [
  {
    name: "HTML5",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Three.js",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg",
    url: "https://threejs.org/",
  },
  {
    name: "JavaScript",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    url: "https://react.dev/",
  },
  {
    name: "Tailwind",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "TypeScript",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/",
  },
];

/* ---------------- Doraemon 3D ---------------- */
function Doraemon({
  url = "/doremon.glb",
  scale = 0.9,
}: {
  url?: string;
  scale?: number;
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D>(null!);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return <primitive ref={ref} object={scene} scale={scale} position={[0, -0.4, 0]} />;
}
useGLTF.preload("/doremon.glb");

function DoraemonCanvas() {
  const [auto, setAuto] = useState(true);
  const ctrls = useRef<any>(null);
  let downAt = 0;

  const onPointerDown = () => {
    downAt = Date.now();
    setAuto(false);
  };
  const onPointerUp = () => {
    const dt = Date.now() - downAt;
    if (dt < 180) setAuto((v) => !v);
  };

  return (
    <div className="w-[180px] h-[200px] md:w-[200px] md:h-[220px] lg:w-[220px] lg:h-[240px] rounded-xl bg-white shadow-sm">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
        camera={{ fov: 35, position: [0, 1.2, 3.8] }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 6, 6]} intensity={0.9} />
        <Suspense fallback={null}>
          <Doraemon />
        </Suspense>
        <OrbitControls
          ref={ctrls}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate={auto}
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}

/* ---------------- Section ---------------- */
export default function SectionTechnologyStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const rowTop = tech.slice(0, 6);
  const ts = tech[6];

  return (
    <section
      ref={ref}
      className={`safe-x-padding ${styles.sectionDistance} min-h-[70vh] flex flex-col`}
      aria-label="Technology Stack"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={`${styles.sectionTitle}`}
        >
          Technology Stack
        </motion.h2>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className={`${styles.sectionDescription} max-w-[980px] mx-auto`}
        >
          I care deeply about web development, performance, and user experience.
          That&apos;s why I use modern and proven technologies in all my projects.
        </motion.p>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-between gap-6">
        {/* Left: icons */}
        <div className="flex-1">
          <div className="mx-auto max-w-[1000px] grid grid-cols-6 place-items-center gap-y-10">
            {rowTop.map((t, i) => (
              <motion.div
                key={t.name}
                className="group relative flex h-[110px] w-[110px] md:h-[130px] md:w-[130px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Default: Icon */}
                <Image
                  src={t.img}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="h-[60px] w-[60px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* On Hover: Name */}
                <Link
                  href={t.url}
                  target="_blank"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  {t.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* TypeScript below */}
          <div className="mt-10 flex justify-center">
            <motion.div
              className="group relative flex h-[120px] w-[120px] md:h-[140px] md:w-[140px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 6 * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={ts.img}
                alt={ts.name}
                width={90}
                height={90}
                className="h-[70px] w-[70px] object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <Link
                href={ts.url}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                {ts.name}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right: Doraemon */}
        <div className="shrink-0 pt-2 pr-1">
          <DoraemonCanvas />
        </div>
      </div>
    </section>
  );
}
