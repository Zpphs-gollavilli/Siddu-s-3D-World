"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { IoMdOpen } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    slug: 'siddu-s-world',
    title: 'Siddharth-portfolio',
    image: '/my_project.png',
    repositoryUrl: "https://github.com/Zpphs-gollavilli/siddu-s-world",
    demoUrl: "https://siddu-s-world.com",
  },
  {
    slug: 'Badminton-tracker',
    title: 'Smashtrack',
    image: '/my_project1.png',
    repositoryUrl: "https://github.com/Zpphs-gollavilli/smashtrack",
    demoUrl: "https://zpphs-gollavilli.github.io/SmashTrack/",
  },
  {
    slug: 'XOXO-game',
    title: 'XOXO Clash',
    image: '/my_project2.png',
    repositoryUrl: "https://github.com/Zpphs-gollavilli/xoxo-clash",
    demoUrl: "https://zpphs-gollavilli.github.io/XOXO-CLASH/",
  },
  {
    slug: 'My school project',
    title: 'Zpphs-gollavilli',
    image: '/my_project3.png',
    repositoryUrl: "https://github.com/Zpphs-gollavilli",
    demoUrl: "https://zpphs-gollavilli.github.io/",
  },
];

export default function ProjectPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="px-4 py-16 max-w-7xl mx-auto">
      <div className="text-center">
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          My Projects
        </motion.h2>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="text-lg text-gray-600 max-w-xl mx-auto"
        >
          Take a look at something I&apos;ve worked on, such as real client projects and personal tools.
        </motion.p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <div className="flex gap-4 text-blue-600">
                <Link href={project.repositoryUrl} target="_blank">
                  <BsGithub size={20} title="View Source" />
                </Link>
                <Link href={project.demoUrl} target="_blank">
                  <IoMdOpen size={20} title="Live Demo" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
