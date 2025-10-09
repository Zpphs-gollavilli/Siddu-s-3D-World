"use client";

import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./home.module.css";

/* 3D Imports */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

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
    { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", url: "https://nextjs.org/" },
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
    { name: "Keras", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/keras/keras-original.svg", url: "https://keras.io/" },
    { name: "Scikit-learn", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/scikit-learn/scikit-learn-original.svg", url: "https://scikit-learn.org/" },
    { name: "OpenCV", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg", url: "https://opencv.org/" },
    { name: "Hugging Face", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/huggingface/huggingface-original.svg", url: "https://huggingface.co/" },
    { name: "Jupyter", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg", url: "https://jupyter.org/" },
    { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg", url: "https://openai.com/" },
    { name: "LangChain", img: "https://raw.githubusercontent.com/langchain-ai/langchain-assets/main/langchain.png", url: "https://www.langchain.com/" },
    { name: "Weights & Biases", img: "https://raw.githubusercontent.com/wandb/assets/main/logo.png", url: "https://wandb.ai/" },
  ],

  "3D / Graphics / Animation": [
    { name: "Blender", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg", url: "https://www.blender.org/" },
    { name: "Maya", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Autodesk_Maya_logo.svg", url: "https://www.autodesk.com/products/maya/overview" },
    { name: "Cinema 4D", img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Cinema_4D_Logo.svg", url: "https://www.maxon.net/en/cinema-4d" },
    { name: "Three.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg", url: "https://threejs.org/" },
  ],

  "Tools & IDEs": [
    { name: "Git", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", url: "https://git-scm.com/" },
    { name: "VS Code", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com/" },
    { name: "Postman", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg", url: "https://postman.com/" },
    { name: "Linux", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", url: "https://www.linux.org/" },
    { name: "Notion", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/notion/notion-original.svg", url: "https://notion.so/" },
    { name: "Figma", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg", url: "https://figma.com/" },
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
  const [active, setActive] = useState<string | null>("Frontend");

  return (
    <section ref={ref} className={`safe-x-padding ${styles.sectionDistance} flex flex-col`}>
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
                    {items.map((t) => (
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
          <DoraemonCanvas />
        </div>
      </div>
    </section>
  );
}


// Notes:// - This component showcases a categorized technology stack with interactive 3D Doraemon model.
// - Uses Framer Motion for animations, React Three Fiber for 3D rendering, and Intersection Observer for scroll-based animations.
// - Tech stack items are displayed in collapsible sections for better organization and user experience.