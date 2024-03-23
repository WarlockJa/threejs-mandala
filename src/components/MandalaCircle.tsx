import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

interface ICircleProps {
  number: number;
  radius: number;
  axis: THREE.Vector3;
  step: number;
  geometry: any;
  size: number;
}

export default function MandalaCircle({
  number,
  step,
  radius,
  axis,
  geometry,
  size,
}: ICircleProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!instancedMeshRef.current) return;

    const matrix = new THREE.Matrix4();
    const texLoader = new THREE.TextureLoader();
    const matcap = texLoader.load("./black-n-shiney2.jpg");
    const startHue = Math.random() * 0.5 + 0.5;
    const color = new THREE.Color().setHSL(startHue + 0 / 10, 1.0, 0.5);
    const material = new THREE.MeshMatcapMaterial({ matcap, color });

    // const instaMesh = new THREE.InstancedMesh(geometry, material, number);
    instancedMeshRef.current.geometry = geometry;
    instancedMeshRef.current.material = material;
    instancedMeshRef.current.count = number;

    Array.from({ length: number }).forEach((_, index) => {
      const x = Math.cos(index * step) * radius;
      const y = Math.sin(index * step) * radius;
      const position = new THREE.Vector3(x, y, 0);
      const quaterion = new THREE.Quaternion();
      quaterion.setFromAxisAngle(axis, index * step);
      const scale = new THREE.Vector3().setScalar(size);

      matrix.compose(position, quaterion, scale);
      // instaMesh.setMatrixAt(index, matrix);
      instancedMeshRef.current!.setMatrixAt(index, matrix);
    });
  }, [instancedMeshRef.current]);

  return <instancedMesh ref={instancedMeshRef} />;
}
