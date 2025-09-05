"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Doraemon({ url = "/doremon.glb" }: { url?: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D | null>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return <primitive ref={ref} object={scene} scale={0.9} position={[0, -0.4, 0]} />;
}

export default function DoraemonCanvas() {
  return (
    <div className="w-[180px] h-[200px] rounded-xl bg-white">
      <Canvas camera={{ fov: 35, position: [0, 1.2, 3.8] }}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 6, 6]} intensity={0.9} />
        <Suspense fallback={null}>
          <Doraemon />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// optional but nice for faster loads:
useGLTF.preload("/doremon.glb");
