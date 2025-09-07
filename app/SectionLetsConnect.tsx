"use client";

import React, { Suspense, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { assets } from "@/constant/assets";
import styles from "./home.module.css";

const AnimatedImage = motion(Image);

/* ------------------- 3D: Shinchan (fit nicely) ------------------- */
function ShinchanModel({
  url = "/connect_car.glb",
  scale = 0.4,
}: {
  url?: string;
  scale?: number;
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D>(null);
  return <primitive ref={ref} object={scene} scale={scale} position={[0, -0.6, 0]} />;
}
useGLTF.preload("/connect_car.glb");

function ShinchanCanvas() {
  return (
    <div className="mt-4 w-[160px] aspect-square sm:w-[180px] md:w-[200px] lg:w-[220px]">
      <div className="w-full h-full rounded-2xl bg-white shadow ring-1 ring-black/5 overflow-hidden">
        <Canvas
          camera={{ fov: 35, position: [0, 1.4, 3.5] }}
          gl={{ antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} />
          <Suspense fallback={null}>
            <ShinchanModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>
    </div>
  );
}

/* ----------------------------- Section UI ----------------------------- */
export default function SectionLetsConnect() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className={`safe-x-padding ${styles.sectionDistance} overflow-y-hidden`}
      aria-label="Let's Connect Section"
    >
      {/* Heading */}
      <div className="text-center">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className={`${styles.sectionDescription} max-w-[730px] mx-auto`}
        >
          Do you have any questions or a project in mind? Let&apos;s connect! through Live Chat.  
          I’m here to help and excited to hear from you.
        </motion.p>
      </div>

      {/* Content */}
      <div className="h-full mt-6 flex flex-col items-center justify-center gap-6">
        {/* Avatar */}
        <AnimatedImage
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-52 h-52 sm:w-72 sm:h-72 lg:w-[530px] lg:h-[530px] rounded-full bg-gray lg:bg-transparent"
          src={assets.home.letsConnect.avatarBigSmile}
          alt="Avatar"
          width={530}
          height={530}
          priority
        />

        {/* Shinchan GLB (fits square) */}
        <ShinchanCanvas />

        {/* Social icons (responsive) */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-6 mt-6">
          {/* GitHub */}
          <AnimatedImage
            initial={{ y: -50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hover:cursor-pointer w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
            src={assets.home.letsConnect.github}
            alt="GitHub"
            width={140}
            height={140}
            tabIndex={0}
            onClick={() => window.open("https://github.com/zpphs-gollavilli", "_blank")}
          />

          {/* Gmail */}
          <AnimatedImage
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hover:cursor-pointer w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
            src={assets.home.letsConnect.gmail}
            alt="Gmail"
            width={140}
            height={140}
            tabIndex={0}
            onClick={() => (window.location.href = "mailto:guttulasiddharth1109@email.com")}
          />
        </div>
      </div>
    </section>
  );
}
