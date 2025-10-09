"use client";

import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import styles from "./home.module.css";

/* ---------------- Categorized Tech Stack ---------------- */
const techCategories = {
  Frontend: [
    { name: "HTML5", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org/" },
    { name: "React", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", url: "https://react.dev/" },
    { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", url: "https://nextjs.org/" },
    { name: "Redux", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg", url: "https://redux.js.org/" },
    { name: "Tailwind", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com/" },
    { name: "Bootstrap", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg", url: "https://getbootstrap.com/" },
    { name: "Three.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg", url: "https://threejs.org/" },
    { name: "Figma", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg", url: "https://figma.com/" },
  ],

  Backend: [
    { name: "Node.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org/" },
    { name: "Express", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", url: "https://expressjs.com/" },
    {
      name: "Next.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg",
      url: "https://nextjs.org/"
    },

    { name: "Python", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", url: "https://www.python.org/" },
    { name: "Flask", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg", url: "https://flask.palletsprojects.com/" },
    { name: "Django", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg", url: "https://www.djangoproject.com/" },
    { name: "Go", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg", url: "https://go.dev/" },
    { name: "Rust", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg", url: "https://www.rust-lang.org/" },
  ],

  Database: [
    { name: "MongoDB", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", url: "https://www.mongodb.com/" },
    { name: "MySQL", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg", url: "https://www.mysql.com/" },
    { name: "PostgreSQL", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", url: "https://www.postgresql.org/" },
    { name: "SQLite", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg", url: "https://www.sqlite.org/" },
    { name: "Redis", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg", url: "https://redis.io/" },
    { name: "Firebase", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com/" },
  ],

  "Cloud & DevOps": [
    { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", url: "https://aws.amazon.com/" },
    { name: "Azure", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg", url: "https://azure.microsoft.com/" },
    { name: "GCP", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg", url: "https://cloud.google.com/" },
    { name: "Docker", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", url: "https://www.docker.com/" },
    { name: "Kubernetes", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg", url: "https://kubernetes.io/" },
    { name: "GitHub Actions", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://github.com/features/actions" },
    { name: "Vercel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", url: "https://vercel.com/" },
  ],

  "AI / ML": [
    { name: "TensorFlow", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg", url: "https://www.tensorflow.org/" },
    { name: "PyTorch", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org/" },
    { name: "Jupyter", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg", url: "https://jupyter.org/" },
  ],

  "Tools & IDEs": [
    { name: "Git", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", url: "https://git-scm.com/" },
    { name: "VS Code", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com/" },
    { name: "Postman", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg", url: "https://postman.com/" },
    { name: "Linux", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", url: "https://www.linux.org/" },
    { name: "Notion", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/notion/notion-original.svg", url: "https://notion.so/" },
  ],
};

/* ---------------- 3D Doraemon ---------------- */
function Doraemon() {
  const { scene } = useGLTF("/doremon.glb");
  const ref = useRef<THREE.Object3D | null>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  return <primitive ref={ref} object={scene} scale={0.9} position={[0, -0.4, 0]} />;
=======
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./home.module.css";

/* 3D */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- Tech data ---------------- */
const tech = [
  { name: "HTML5", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS3", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Three.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg", url: "https://threejs.org/" },
  { name: "JavaScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "React", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", url: "https://react.dev/" },
  { name: "Tailwind", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com/" },
  { name: "TypeScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org/" },
];

/* ---------------- Doraemon 3D ---------------- */
function Doraemon({ url = "/doremon.glb", scale = 0.9 }: { url?: string; scale?: number }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D | null>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return <primitive ref={ref} object={scene} scale={scale} position={[0, -0.4, 0]} />;
>>>>>>> d8acb3f4544f9cb0dcf12bbed66a2c2c966f59da
}
useGLTF.preload("/doremon.glb");

function DoraemonCanvas() {
  const [auto, setAuto] = useState(true);
  const ctrls = useRef<any>(null);
<<<<<<< HEAD
  return (
    <div className="w-[200px] h-[220px] md:w-[220px] md:h-[240px] rounded-xl bg-white shadow-sm">
=======
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
    <div className="w-[140px] h-[160px] sm:w-[160px] sm:h-[180px] md:w-[200px] md:h-[220px] lg:w-[220px] lg:h-[240px] rounded-xl bg-white shadow-sm">
>>>>>>> d8acb3f4544f9cb0dcf12bbed66a2c2c966f59da
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
        camera={{ fov: 35, position: [0, 1.2, 3.8] }}
<<<<<<< HEAD
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.9} />
=======
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.95} />
>>>>>>> d8acb3f4544f9cb0dcf12bbed66a2c2c966f59da
        <directionalLight position={[5, 6, 6]} intensity={0.9} />
        <Suspense fallback={null}>
          <Doraemon />
        </Suspense>
        <OrbitControls
          ref={ctrls}
          enableZoom={false}
          enablePan={false}
<<<<<<< HEAD
          autoRotate={auto}
          autoRotateSpeed={2}
=======
          enableDamping
          dampingFactor={0.08}
          autoRotate={auto}
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
>>>>>>> d8acb3f4544f9cb0dcf12bbed66a2c2c966f59da
        />
      </Canvas>
    </div>
  );
}

<<<<<<< HEAD
/* ---------------- Main Component ---------------- */
export default function SectionTechnologyStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState<string | null>("Frontend");

  return (
    <section
  ref={ref}
  className={`safe-x-padding ${styles.sectionDistance} flex flex-col`}
>
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
      Explore my complete tech stack — categorized neatly for clarity.
    </p>
  </div>


      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Tech Categories */}
        <div className="flex-1 space-y-6">
          {Object.entries(techCategories).map(([category, items]) => (
            <div key={category}>
              <button
                onClick={() => setActive(active === category ? null : category)}
                className="w-full text-left text-xl font-semibold mb-2 flex justify-between items-center border-b pb-1"
              >
                <span>{category}</span>
                <span>{active === category ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {active === category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 mt-4"
                  >
                    {items.map((t, i) => (
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
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* 3D Doraemon */}
        <div className="w-full lg:w-auto flex justify-center">
=======
/* ---------------- Section ---------------- */
export default function SectionTechnologyStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const rowTop = tech.slice(0, 6);
  const ts = tech[6];

  return (
    <section
      ref={ref}
      className={`safe-x-padding ${styles.sectionDistance} min-h-[60vh] flex flex-col`}
      aria-label="Technology Stack"
    >
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.45 }}
          className={`${styles.sectionTitle} text-3xl sm:text-4xl md:text-5xl`}
        >
          Technology Stack
        </motion.h2>
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55 }}
          className={`${styles.sectionDescription} max-w-[980px] mx-auto text-sm sm:text-base`}
        >
          I care deeply about web development, performance, and user experience.
          That&apos;s why I use modern and proven technologies in all my projects.
        </motion.p>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        {/* Left: responsive icons grid */}
        <div className="w-full lg:flex-1">
          <div className="mx-auto max-w-[980px] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8">
            {rowTop.map((t, i) => (
              <motion.div
                key={t.name}
                className="group relative mx-auto flex h-[86px] w-[86px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] items-center justify-center overflow-hidden rounded-xl bg-white shadow md:shadow-md"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
              >
                {/* icon */}
                <Image
                  src={t.img}
                  alt={t.name}
                  width={84}
                  height={84}
                  className="h-[54px] w-[54px] sm:h-[64px] sm:w-[64px] md:h-[80px] md:w-[80px] object-contain transition-opacity duration-300 group-hover:opacity-0"
                  priority={i === 0}
                />
                {/* name overlay */}
                <Link
                  href={t.url}
                  target="_blank"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs sm:text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  {t.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* TypeScript centered below */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <motion.div
              className="group relative flex h-[92px] w-[92px] sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px] items-center justify-center overflow-hidden rounded-xl bg-white shadow md:shadow-md"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 6 * 0.06 }}
              whileHover={{ scale: 1.04 }}
            >
              <Image
                src={ts.img}
                alt={ts.name}
                width={90}
                height={90}
                className="h-[58px] w-[58px] sm:h-[70px] sm:w-[70px] md:h-[86px] md:w-[86px] object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <Link
                href={ts.url}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs sm:text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                {ts.name}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right on desktop / Bottom on mobile: Doraemon */}
        <div className="w-full flex justify-center lg:w-auto lg:shrink-0">
>>>>>>> d8acb3f4544f9cb0dcf12bbed66a2c2c966f59da
          <DoraemonCanvas />
        </div>
      </div>
    </section>
  );
}
