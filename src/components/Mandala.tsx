"use client";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import MandalaCircle from "./MandalaCircle";

const NUMBER = 30;
const RADIUS = 2;
const STEP = (Math.PI * 2) / NUMBER;
const AXIS = new THREE.Vector3(0, 0, 1);
const box = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const ball = new THREE.SphereGeometry(0.1, 16, 16);
const knot = new THREE.TorusKnotGeometry(0.05, 0.03, 50, 16);
const cone = new THREE.ConeGeometry(0.1, 0.1, 4);
const geoms = [box, ball, knot, cone];

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
