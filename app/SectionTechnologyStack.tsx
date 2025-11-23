"use client";

import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import styles from "./home.module.css";

/* ---------------- Tech Stack (Flat Array) ---------------- */
const techCategories = [
  /* ---------- FRONTEND ---------- */
  { name: "HTML5", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS3", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TypeScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org/" },
  { name: "React", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", url: "https://react.dev/" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", url: "https://nextjs.org/" },

  { name: "Tailwind", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com/" },
  { name: "Bootstrap", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg", url: "https://getbootstrap.com/" },
  { name: "Three.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg", url: "https://threejs.org/" },
  { name: "Figma", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg", url: "https://figma.com/" },

  /* ---------- BACKEND ---------- */
  { name: "Node.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org/" },
  { name: "Express.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", url: "https://expressjs.com/" },
  { name: "Python", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", url: "https://python.org/" },
  
  /* ---------- DATABASE ---------- */
  { name: "MySQL", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg", url: "https://www.mysql.com/" },
  { name: "SQL", img: "https://www.svgrepo.com/show/331760/sql-database-generic.svg", url: "https://www.w3schools.com/sql/" },
  { name: "MongoDB", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", url: "https://mongodb.com/" },
  { name: "Firebase", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com/" },

  /* ---------- DEVOPS / CLOUD ---------- */
  { name: "Git", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", url: "https://git-scm.com/" },
  { name: "GitHub", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg", url: "https://github.com/" },
  { name: "Docker", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", url: "https://www.docker.com/" },

];

/* ---------------- 3D Doraemon ---------------- */
function Doraemon() {
  const { scene } = useGLTF("/doremon.glb");
  const ref = useRef<THREE.Object3D | null>(null);
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.01; });
  return <primitive ref={ref} object={scene} scale={0.9} position={[0, -0.4, 0]} />;
}
useGLTF.preload("/doremon.glb");

function DoraemonCanvas() {
  const [auto, setAuto] = useState(true);
  const ctrls = useRef<any>(null);
  let downAt = 0;
  const onPointerDown = () => { downAt = Date.now(); setAuto(false); };
  const onPointerUp = () => { if (Date.now() - downAt < 180) setAuto((v) => !v); };
  return (
    <div className="w-[200px] h-[220px] md:w-[240px] md:h-[260px] rounded-xl bg-white shadow-lg">
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
        <OrbitControls ref={ctrls} enableZoom={false} enablePan={false} autoRotate={auto} autoRotateSpeed={2} enableDamping dampingFactor={0.08} />
      </Canvas>
    </div>
  );
}

/* ---------------- Main Component ---------------- */
export default function SectionTechnologyStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className={`safe-x-padding ${styles.sectionDistance} flex flex-col items-center w-full`}>
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <motion.h2 initial={{ y: 60, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
        >
          ⚙️ Technology Stack ⚙️
        </motion.h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-[800px] mx-auto">
          Explore my complete tech stack — neatly displayed below.
        </p>
      </div>

      {/* Grid + 3D Layout */}
      <div className="w-full flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 items-center">
        
        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="
            grid 
            grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 
            gap-5 sm:gap-6 md:gap-7
            max-w-[780px]
            justify-items-center
          "
        >
          {techCategories.map((t) => (
            <motion.div
              key={t.name}
              className="group relative flex h-[82px] w-[82px] sm:h-[95px] sm:w-[95px] md:h-[102px] md:w-[102px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition"
              whileHover={{ scale: 1.07 }}
            >
              <Image
                src={t.img}
                alt={t.name}
                width={65}
                height={65}
                className="object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <Link
                href={t.url}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold opacity-0 group-hover:opacity-100 transition duration-300"
              >
                {t.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Doraemon */}
        <div className="flex justify-center w-full lg:w-auto">
          <DoraemonCanvas />
        </div>

      </div>
    </section>
  );
}
