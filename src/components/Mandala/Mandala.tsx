"use client";
import * as THREE from "three";
import { useRef } from "react";
import MandalaCircle from "./MandalaCircle";
import { useGeometriesContext } from "../../Context/GeometriesProvider";
import CenterPiece from "./CenterPiece";

const AXIS = new THREE.Vector3(0, 0, 1);
const numRings = 10;
const startHue = Math.random() * 0.5 + 0.5;
const texLoader = new THREE.TextureLoader();
const matcap = texLoader.load("./black-n-shiney2.jpg");

export default function Mandala() {
  const { geometries: geoms } = useGeometriesContext();

  const mandalaRings = Array.from({ length: numRings }).map((_, index) => (
    <MandalaCircle
      key={index}
      geometry={geoms[Math.floor(Math.random() * geoms.length)]}
      axis={AXIS}
      size={0.4}
      index={index}
      startHue={startHue}
      matcap={matcap}
      randomSpeedValue={Math.random() * 0.06}
    />
  ));

  return (
    <group position={[0, 0, 0]}>
      {mandalaRings}
      <CenterPiece matcap={matcap} startHue={startHue} />
    </group>
  );
}
