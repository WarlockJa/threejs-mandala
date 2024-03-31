import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

interface ICircleProps {
  axis: THREE.Vector3;
  geometry: any;
  size: number;
  index: number;
  startHue: number;
  matcap: THREE.Texture;
  randomSpeedValue: number;
}

export default function MandalaCircle({
  axis,
  geometry,
  size,
  index,
  startHue,
  matcap,
  randomSpeedValue,
}: ICircleProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const numObjs = 8 + index * 4;
  const step = (Math.PI * 2) / numObjs;
  const radius = 1 + index * 0.6;

  const color = new THREE.Color().setHSL(startHue + index / 10, 1.0, 0.5);
  const material = new THREE.MeshMatcapMaterial({ matcap, color });
  const z = -0.5 + index * -0.25;

  useLayoutEffect(() => {
    // Set positions
    for (let i = 0; i < numObjs; i++) {
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, i * step);

      const x = Math.cos(step * i) * radius;
      const y = Math.sin(step * i) * radius;

      const position = new THREE.Vector3(x, y, z);
      const scale = new THREE.Vector3().setScalar(size);

      const matrix = new THREE.Matrix4();

      matrix.compose(position, quaternion, scale);
      instancedMeshRef.current?.setMatrixAt(i, matrix);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!instancedMeshRef.current) return;
    const direction = index % 2 === 0 ? 1 : -1;
    // const randomSpeedValue = Math.random() * 0.01;
    instancedMeshRef.current.rotation.z =
      clock.getElapsedTime() * (0.01 + randomSpeedValue) * direction;
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, numObjs]}
      position={[0, 0, 0]}
    />
  );
}
