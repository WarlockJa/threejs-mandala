"use client";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import MandalaCircle from "./MandalaCircle";

const NUMBER = 30;
const RADIUS = 2;
const STEP = (Math.PI * 2) / NUMBER;
const AXIS = new THREE.Vector3(0, 0, 1);

export default function Mandala() {
  const testRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!testRef.current) return;
    testRef.current.rotation.z = clock.getElapsedTime() * 0.1;
  });

  return (
    <group position={[0, 0, 0]} ref={testRef}>
      <MandalaCircle
        number={NUMBER}
        radius={RADIUS}
        step={STEP}
        axis={AXIS}
        geometry={new THREE.BoxGeometry(0.1, 0.1, 0.1)}
        size={0.5}
      />
    </group>
  );
}
