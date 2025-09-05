"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { IoMdOpen } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import styles from "./home.module.css";
import suitcase from "@/assets/images/home/myLatestProject/suitcase.webp";
import figma from "@/assets/images/home/myLatestProject/figma.webp";
import rocket from "@/assets/images/home/myLatestProject/rocket.webp";
import DoraemonCanvas from "@/components/DoraemonModel";


/* ---------------- Projects (local data) ---------------- */
export type Project = {
  slug: string;
  title: string;
  image: string;
  repositoryUrl: string;
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
    slug: "my-school-project",
    title: "Zpphs-gollavilli",
    image: "/my_project3.png",
    repositoryUrl: "https://github.com/Zpphs-gollavilli",
    demoUrl: "https://zpphs-gollavilli.github.io/",
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

  // Sync tab with ?tab= in URL
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
      {/* Section Heading */}
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

      {/* Tabs + Content */}
      <div className="mt-[50px] h-full">
        <div className="flex flex-col items-center justify-center gap-9 md:flex-row md:items-start">
          {/* Left rail tabs */}
          <div className="flex flex-row gap-x-3 rounded-2xl bg-gray p-3 md:flex-col md:gap-x-0 md:gap-y-[26px] md:rounded-[25px] md:p-[26px]">
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

          {/* Right grid */}
          <div className="overflow-hidden">
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
                        {/* Mini browser chrome */}
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

                    {/* Hover overlay */}
                    <div className="pointer-events-none absolute inset-0 hidden rounded-2xl bg-gray/10 backdrop-blur-sm transition-all duration-300 group-hover:block md:rounded-[25px]">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <p className="px-6 text-center text-xl font-bold leading-tight line-clamp-1 text-gray-900 drop-shadow">
                          {item.title}
                        </p>
                        <div className="flex flex-row gap-3 text-lg">
                          {item.repositoryUrl && (
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
                          )}
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
        </div>
      </div>
    </section>
  );
}
