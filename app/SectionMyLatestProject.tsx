"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { IoMdOpen } from "react-icons/io";
import styles from "./home.module.css";
import suitcase from "@/assets/images/home/myLatestProject/suitcase.webp";
import figma from "@/assets/images/home/myLatestProject/figma.webp";
import rocket from "@/assets/images/home/myLatestProject/rocket.webp";

/* three.js */
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
/* ---------------- 3D Mascot ---------------- */
function Mascot({ url = "/taj_mahal.glb" }: { url?: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D>(null);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.4}              // 👈 smaller size
      position={[0, -0.5, 0]}  // 👈 centered nicely
    />
  );
}
useGLTF.preload("/taj_mahal.glb");

function MascotCanvas() {
  const [auto, setAuto] = useState(true);
  let downAt = 0;

  // detect click vs drag
  const onPointerDown = () => {
    downAt = Date.now();
  };
  const onPointerUp = () => {
    const dt = Date.now() - downAt;
    if (dt < 200) {
      // quick click → toggle rotation
      setAuto((v) => !v);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow-md ring-1 ring-black/5">
      <div className="h-[220px] sm:h-[240px] md:h-[260px] lg:h-[300px]">
        <Canvas
          camera={{ fov: 40, position: [0, 1.5, 6] }}
          gl={{ antialias: true }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 6, 6]} intensity={1.2} />

          <Suspense fallback={null}>
            <Mascot />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={auto}        // 👈 auto-rotate toggle
            autoRotateSpeed={2}      // speed of rotation
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>
    </div>
  );
}


/* ---------------- Projects ---------------- */
export type Project = {
  slug: string;
  title: string;
  image: string;
  repositoryUrl: string; // "Private" means no link
  demoUrl?: string;
};

const PROJECTS: Project[] = [
  {
    slug: "siddu-s-world",
    title: "Siddharth-portfolio",
    image: "/my_project.png",
    repositoryUrl: "https://github.com/Zpphs-gollavilli/siddu-s-3D-world",
    demoUrl: "https://siddu-s-3-d-world.vercel.app",
  },
  {
    slug: "XOXO-game",
    title: "XOXO Clash",
    image: "/my_project1.png",
    repositoryUrl: "https://github.com/Zpphs-gollavilli/xoxo-clash",
    demoUrl: "https://zpphs-gollavilli.github.io/XOXO-CLASH/",
  },
  {
    slug: "smash-track",
    title: "Smash Track",
    image: "/my_project2.png",
    repositoryUrl: "https://github.com/Zpphs-gollavilli/smash-track",
    demoUrl: "https://zpphs-gollavilli.github.io/SmashTrack/",
  },
  {
    slug: "siddu-s-celebration",
    title: "Siddu-s-celebration",
    image: "/my_project4.png",
    repositoryUrl: "https://github.com/Zpphs-gollavilli/Siddu-s-Celebration",
    demoUrl: "https://zpphs-gollavilli.github.io/Siddu-s-Celebration/",
  },
  {
    slug: "shinobi-runner",
    title: "Shinobi Runner",
    image: "/my_project5.png",
    repositoryUrl: "https://github.com/Zpphs-gollavilli/shinobi-runner",
    demoUrl: "https://zpphs-gollavilli.github.io/shinobi-runner/",
  },
  {
    slug: "Evrybloom-Dairy",
    title: "Evrybloom Dairy",
    image: "/my_project6.png",
    repositoryUrl: "Private",
    demoUrl: "https://everbloom-diary-a2a8fbef.base44.app/",
  },
  {
    slug: "My Rupee Book",
    title: "My Rupee Book",
    image: "/my_project7.png",
    repositoryUrl: "Private",
    demoUrl: "https://my-rupee-book-fc5fce5d.base44.app/",
  },
  {
    slug: "Schedulify",
    title: "Schedulify",
    image: "/my_project8.png",
    repositoryUrl: "Private",
    demoUrl: "https://study-time-70b038c8.base44.app",
  },
  {
    slug: "Eclipse-Wanderer-Cosmic-Legacy",
    title: "Eclipse Wanderer: Cosmic Legacy",
    image: "/my_project9.png",
    repositoryUrl: "Private",
    demoUrl: "https://eclipse-wanderer-cosmic-legacy-d41897eb.base44.app",
  },
];

/* ---------------- Tabs ---------------- */
const TAB_ICONS = { project: suitcase, design: figma, more: rocket };

const tabs = [
  { name: "Project", image: TAB_ICONS.project, data: PROJECTS },
  { name: "Design", image: TAB_ICONS.design, data: PROJECTS },
  { name: "More", image: TAB_ICONS.more, data: PROJECTS },
];

/* ---------------- Component ---------------- */
export default function SectionMyLatestProject() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    if (tab && parseInt(tab) < tabs.length) setActiveTab(parseInt(tab));
  }, []);

  return (
    <section
      ref={ref}
      className={`safe-x-padding ${styles.sectionDistance}`}
      aria-label="My Latest Project Section"
    >
      {/* Heading */}
      <div className="text-center">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={styles.sectionTitle}
        >
          My Latest Project
        </motion.h2>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className={`${styles.sectionDescription} max-w-[706px] mx-auto`}
        >
          Take a look at something I&apos;ve worked on, such as a case study,
          real project, and more
        </motion.p>
      </div>

      <div className="mt-[40px]">
        <div className="flex flex-col gap-9 md:flex-row">
          {/* Left Tabs */}
          <div className="flex flex-row gap-3 rounded-2xl bg-gray p-3 md:flex-col md:gap-y-[26px] md:rounded-[25px] md:p-[26px] md:shrink-0">
            {tabs.map((tab, index) => (
              <motion.button
                key={index}
                className={`relative flex h-[75px] w-[75px] items-center justify-center overflow-hidden rounded-2xl shadow-xl md:h-[150px] md:w-[150px] md:rounded-[25px] ${
                  activeTab === index ? "gradient-bg" : "bg-white"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(index);
                  window.history.pushState({}, "", `?tab=${index}`);
                }}
              >
                <Image
                  src={tab.image}
                  alt={tab.name}
                  width={100}
                  height={100}
                  style={{ height: "auto" }}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-gray/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 md:rounded-[25px] md:text-2xl">
                  <p
                    className={`${
                      activeTab === index ? "text-white" : "text-accent"
                    } font-bold transition-colors`}
                  >
                    {tab.name}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Projects + Mascot */}
          <div className="flex-1">
            <div className="mb-6 md:hidden">
              <MascotCanvas />
            </div>
            <div className="flex gap-6">
              {/* Projects */}
              <div className="min-w-0 flex-1">
                <div className="h-[600px] w-full overflow-y-auto rounded-[36px] bg-gray p-[26px]">
                  <div className="grid grid-flow-row grid-cols-12 gap-[26px]">
                    {tabs[activeTab].data.map((item, dataIndex) => (
                      <motion.div
                        key={item.slug}
                        className="group relative col-span-12 overflow-hidden xl:col-span-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * dataIndex }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="col-span-6">
                          <div className="h-[261px] overflow-hidden rounded-2xl bg-white p-[18px] shadow md:rounded-[25px]">
                            <div className="mb-3 flex h-4 items-center gap-2 px-1">
                              <span className="h-3 w-3 rounded-full bg-red-400" />
                              <span className="h-3 w-3 rounded-full bg-amber-400" />
                              <span className="h-3 w-3 rounded-full bg-emerald-400" />
                            </div>
                            <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={441}
                                height={200}
                                className="h-full w-full object-contain"
                                priority={dataIndex === 0}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="pointer-events-none absolute inset-0 hidden rounded-2xl bg-gray/10 backdrop-blur-sm transition-all duration-300 group-hover:block md:rounded-[25px]">
                          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                            <p className="px-6 text-center text-xl font-bold leading-tight line-clamp-1 text-gray-900 drop-shadow">
                              {item.title}
                            </p>
                            <div className="flex flex-row gap-3 text-lg">
                              {/* Repo button */}
                              {item.repositoryUrl && item.repositoryUrl !== "Private" ? (
                                <Link
                                  href={item.repositoryUrl}
                                  target="_blank"
                                  title="Repository"
                                  className="pointer-events-auto rounded-2xl bg-gray-100 px-4 py-3 text-gray-800 shadow hover:bg-gray-200"
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <BsGithub /> <span>Source</span>
                                  </span>
                                </Link>
                              ) : (
                                <span className="pointer-events-none rounded-2xl bg-gray-300 px-4 py-3 text-gray-600 shadow">
                                  <BsGithub /> <span>Private</span>
                                </span>
                              )}

                              {/* Live button */}
                              {item.demoUrl && (
                                <Link
                                  href={item.demoUrl}
                                  target="_blank"
                                  title="Demo"
                                  className="pointer-events-auto rounded-2xl bg-gray-900 px-4 py-3 text-white shadow hover:bg-black"
                                >
                                  <span className="inline-flex items-center gap-2">
                                    <IoMdOpen /> <span>Live</span>
                                  </span>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mascot on desktop */}
              <div className="hidden md:block md:w-[320px] lg:w-[360px] xl:w-[380px] shrink-0">
                <div className="sticky top-24">
                  <MascotCanvas />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
