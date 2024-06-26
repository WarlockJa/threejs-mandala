"use client";
import { CameraShake, Cloud, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Mandala from "./Mandala/Mandala";
import useGeometries from "../hooks/useGeometries";
import { useGeometriesContext } from "../Context/GeometriesProvider";
import CameraZoom from "./CameraZoom/CameraZoom";

export default function Scene() {
  const { objLength } = useGeometries();
  const { geometries } = useGeometriesContext();

  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <OrbitControls />
      <pointLight position={[0, 0, 15]} intensity={200} />
      <Stars factor={4} saturation={0} fade speed={1} />
      {geometries.length < objLength ? null : (
        <>
          <Cloud position={[0, 0, -2]} />
          <CameraZoom />
          <CameraShake />
          <Mandala />
        </>
      )}
    </Canvas>
  );
}
