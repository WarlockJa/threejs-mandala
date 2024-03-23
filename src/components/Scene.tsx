"use client";
import { CameraShake, Cloud, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Mandala from "./Mandala";
import CameraZoom from "./CameraZoom";
import { Instances } from "./Instances";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5000] }}>
      <OrbitControls />
      <Stars factor={4} saturation={0} fade speed={1} />
      <pointLight position={[0, 0, 15]} intensity={200} />
      <CameraZoom />
      <CameraShake />
      <Cloud />
      {/* <Mandala /> */}
      <Instances />
    </Canvas>
  );
}
