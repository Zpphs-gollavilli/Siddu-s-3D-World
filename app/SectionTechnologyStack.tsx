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

  { name: "Node.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org/" },
  { name: "Express.js", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", url: "https://expressjs.com/" },
  { name: "Python", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", url: "https://python.org/" },

  { name: "MySQL", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg", url: "https://www.mysql.com/" },
  { name: "SQL", img: "https://www.svgrepo.com/show/331760/sql-database-generic.svg", url: "https://www.w3schools.com/sql/" },
  { name: "MongoDB", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", url: "https://mongodb.com/" },
  { name: "Firebase", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com/" },

  { name: "Git", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", url: "https://git-scm.com/" },
  { name: "GitHub", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg", url: "https://github.com/" },
  { name: "Docker", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", url: "https://www.docker.com/" },
];

/* ---------------- 3D Doraemon (Auto-center + Fit) ---------------- */
function Doraemon() {
  // load the glb
  const { scene } = useGLTF("/doremon.glb");
  const group = useRef<THREE.Group | null>(null);

  // once the scene is available, compute bounding box center and size,
  // shift the group so model center -> (0,0,0) and scale to fit nicely.
  React.useEffect(() => {
    if (!scene || !group.current) return;

    // clone scene to avoid mutating original cached scene (safer)
    const local = scene.clone(true) as THREE.Object3D;

    // compute bounding box for the whole model
    const box = new THREE.Box3().setFromObject(local);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // move the model so its center is at origin
    // we'll apply this to the group container instead of to the primitive directly.
    // keep a small vertical offset so the model sits a bit above center if needed.
    const verticalOffset = size.y * 0.05; // small lift so it doesn't look sunk
    if (group.current) {
      group.current.position.set(-center.x, -center.y + verticalOffset, -center.z);
    }

    // optional: scale to fit a target box size (so very big or very small models fit)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 1.6; // tweak this: larger -> model appears larger in view
    if (maxDim > 0) {
      const scaleFactor = targetSize / maxDim;
      if (group.current) group.current.scale.setScalar(scaleFactor);
    }

    // cleanup not required because we didn't add listeners
  }, [scene]);

  // subtle auto rotation in render loop (keeps consistent with OrbitControls)
  useFrame(() => {
    if (group.current) {
      // a tiny continuous spin so auto-rotate + manual drag feel smooth
      group.current.rotation.y += 0.004;
    }
  });

  // Render a group wrapper and the model primitive inside it.
  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
useGLTF.preload("/doremon.glb");

function DoraemonCanvas() {
  const [auto, setAuto] = useState(true);
  const ctrls = useRef<any>(null);

  // handle pointer logic
  let downAt = 0;
  const onPointerDown = () => {
    downAt = Date.now();
    setAuto(false);
  };
  const onPointerUp = () => {
    if (Date.now() - downAt < 180) setAuto((v) => !v);
  };

  // The wrapper div centers canvas visually (flex) and has rounded border
  return (
    <div
      className="
        w-[200px] h-[220px] md:w-[240px] md:h-[260px]
        rounded-2xl border-[4px] border-blue-400
        shadow-xl bg-white overflow-hidden flex items-center justify-center
      "
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 40, position: [0, 0.9, 3.2] }} // camera tuned for fitted model
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 6]} intensity={1} />
        <directionalLight position={[-6, -4, -6]} intensity={0.4} />

        <Suspense fallback={null}>
          <Doraemon />
        </Suspense>

        <OrbitControls
          ref={ctrls}
          enableZoom={false}
          enablePan={false}
          autoRotate={auto}
          autoRotateSpeed={2}
          enableDamping
          dampingFactor={0.08}
          // lock vertical rotation so user can only rotate horizontally
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          // optionally restrict azimuth if you want: minAzimuthAngle / maxAzimuthAngle
        />
      </Canvas>
    </div>
  );
}

/* ---------------- Main Component ---------------- */
export default function SectionTechnologyStack() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className={`safe-x-padding ${styles.sectionDistance} flex flex-col items-center w-full`}>
      <div className="text-center mb-10 px-4">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
        >
          ⚙️ Technology Stack ⚙️
        </motion.h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-[800px] mx-auto">
          Explore my complete tech stack — neatly displayed below.
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 items-center">
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
