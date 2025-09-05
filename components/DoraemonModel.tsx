"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Doraemon({ url = "/doremon.glb" }: { url?: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D>(null!);
  useFrame(() => (ref.current.rotation.y += 0.01));
  return <primitive ref={ref} object={scene} scale={1.6} position={[0, -0.2, 0]} />;
}
useGLTF.preload("/doremon.glb");

export default function DoraemonCanvas() {
  return (
    <div
      style={{
        width: 220,       // smaller footprint
        height: 260,
        background: "#fff", // WHITE background
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true }}
      >
        {/* white background */}
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Doraemon />
        </Suspense>
        {/* keep orbit off for a clean always-rotating view */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
