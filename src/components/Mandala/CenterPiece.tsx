"use client";
import * as THREE from "three";
import { useGeometriesContext } from "@/Context/GeometriesProvider";
import useGeometries from "@/hooks/useGeometries";

interface ICenterPieceProps {
  startHue: number;
  matcap: THREE.Texture;
}

export default function CenterPiece({ startHue, matcap }: ICenterPieceProps) {
  const { geometries } = useGeometriesContext();
  const { objNames } = useGeometries();

  const randomGeometryIndex = Math.floor(Math.random() * (objNames.length - 1));
  const randomGeometry = geometries.find(
    (geometry) => geometry.name === objNames[randomGeometryIndex]
  );

  const color = new THREE.Color().setHSL(startHue, 1.0, 0.5);

  return (
    <mesh geometry={randomGeometry} scale={0.5}>
      <meshMatcapMaterial matcap={matcap} color={color} />
    </mesh>
  );
}
