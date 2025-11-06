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

/* ------------------- 3D: India Map (static, centered) ------------------- */
function IndiaMapModel({ url = "/indian_map_flag.glb" }: { url?: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D>(null);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.5}
      position={[0, -1.0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}
useGLTF.preload("/indian_map_flag.glb");

function IndiaMapCanvas() {
  return (
    <div className="mt-6 w-[300px] sm:w-[360px] md:w-[440px] lg:w-[520px] aspect-square">
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow ring-1 ring-black/5 bg-white">
        <Canvas
          camera={{ fov: 35, position: [0, 1.2, 5] }}
          gl={{ antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 6]} intensity={1.5} />

          <Suspense fallback={null}>
            <IndiaMapModel />
          </Suspense>

          {/* Static view only */}
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
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
          Do you have any questions or a project in mind? Let&apos;s connect
          through Live Chat. I’m here to help and excited to hear from you.
        </motion.p>
      </div>

      {/* Content */}
      <div className="h-full mt-6 flex flex-col items-center justify-center gap-6">
        {/* Avatar with glowing background */}
        <div className="relative flex items-center justify-center">
          {/* Glowing animated gradient background */}
          <div className="absolute w-[260px] sm:w-[340px] lg:w-[560px] h-[260px] sm:h-[340px] lg:h-[560px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-3xl opacity-80 animate-pulse" />
          {/* Avatar */}
          <AnimatedImage
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-[500px] lg:h-[500px] rounded-full"
            src={assets.home.letsConnect.avatarBigSmile}
            alt="Avatar"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* India Map (static, centered) */}
        <IndiaMapCanvas />

        {/* Social icons (only GitHub & Gmail) */}
        <div className="flex flex-row items-center justify-center gap-20 mt-6">
          {/* GitHub */}
          <AnimatedImage
            initial={{ y: -50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            className="hover:cursor-pointer w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
            src={assets.home.letsConnect.github}
            alt="GitHub"
            width={120}
            height={120}
            onClick={() => window.open("https://github.com/zpphs-gollavilli", "_blank")}
          />

          {/* Gmail */}
          <AnimatedImage
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="hover:cursor-pointer w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
            src={assets.home.letsConnect.gmail}
            alt="Gmail"
            width={120}
            height={120}
            onClick={() => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              if (isMobile) {
                window.location.href = "mailto:guttulasiddharth1109@email.com";
              } else {
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=guttulasiddharth1109@email.com",
                  "_blank"
                );
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
