"use client";

import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import styles from "./home.module.css";

/* ---------------- Tech Stack (Flat Array) ---------------- */
const techCategories = [
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
    name: "JavaScript",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "React",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    url: "https://react.dev/",
  },
  {
    name: "Next.js",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg",
    url: "https://nextjs.org/",
  },
  {
    name: "Redux",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
    url: "https://redux.js.org/",
  },
  {
    name: "Tailwind",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Bootstrap",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg",
    url: "https://getbootstrap.com/",
  },
  {
    name: "Three.js",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg",
    url: "https://threejs.org/",
  },
  {
    name: "Figma",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg",
    url: "https://figma.com/",
  },
];

/* ---------------- 3D Doraemon ---------------- */
function Doraemon() {
  const { scene } = useGLTF("/doremon.glb");
  const ref = useRef<THREE.Object3D | null>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.9}
      position={[0, -0.4, 0]}
    />
  );
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
    <div className="w-[200px] h-[220px] md:w-[220px] md:h-[240px] rounded-xl bg-white shadow-sm">
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

/* ---------------- Main Component ---------------- */
export default function SectionTechnologyStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className={`safe-x-padding ${styles.sectionDistance} flex flex-col`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
        >
          ⚙️ Technology Stack ⚙️
        </motion.h2>

        <p className="text-gray-500 max-w-[800px] mx-auto">
          Explore my complete tech stack — neatly displayed below.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5"
        >
          {techCategories.map((t) => (
            <motion.div
              key={t.name}
              className="group relative flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-xl bg-white shadow hover:shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={t.img}
                alt={t.name}
                width={60}
                height={60}
                className="object-contain transition-opacity group-hover:opacity-0"
                onError={(e) => (e.currentTarget.src = "/fallback-tech.svg")}
              />
              <Link
                href={t.url}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold opacity-0 group-hover:opacity-100"
              >
                {t.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Doraemon */}
        <div className="w-full lg:w-auto flex justify-center">
          <DoraemonCanvas />
        </div>
      </div>
    </section>
  );
}
