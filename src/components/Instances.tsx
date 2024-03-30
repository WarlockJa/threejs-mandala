import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

const RADIUS = 15;

export function Instances({ count = 10000, temp = new THREE.Object3D() }) {
  const box = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const ball = new THREE.SphereGeometry(0.1, 16, 16);
  const knot = new THREE.TorusKnotGeometry(0.05, 0.03, 50, 16);
  const cone = new THREE.ConeGeometry(0.1, 0.1, 4);

  const geoms = [box, ball, knot, cone];

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const texLoader = new THREE.TextureLoader();
  const matcap = texLoader.load("./black-n-shiney2.jpg");
  const startHue = Math.random() * 0.5 + 0.5;
  const color = new THREE.Color().setHSL(startHue + 0 / 10, 1.0, 0.5);
  const material = new THREE.MeshMatcapMaterial({ matcap, color });

  //   const materials: THREE.Material[] = Array.from({ length: count }).fill(
  //     material
  //   );
  const axis = new THREE.Vector3(0, 0, 1);

  useLayoutEffect(() => {
    // Set positions
    for (let i = 0; i < count; i++) {
      const longitude = Math.random() * 2 * Math.PI;
      const latitude = Math.acos(2 * Math.random() - 1);

      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, i * (Math.PI / 2) * 3);

      const position = new THREE.Vector3(
        RADIUS * Math.sin(latitude) * Math.cos(longitude),
        RADIUS * Math.sin(latitude) * Math.sin(longitude),
        RADIUS * Math.cos(latitude)
      );
      const scale = new THREE.Vector3().setScalar(1);

      const matrix = new THREE.Matrix4();

      // temp.position.set(
      //   RADIUS * Math.sin(latitude) * Math.cos(longitude),
      //   RADIUS * Math.sin(latitude) * Math.sin(longitude),
      //   RADIUS * Math.cos(latitude)
      //   // RADIUS * Math.sin(latitude) * Math.cos(longitude),
      //   // RADIUS * Math.sin(latitude) * Math.sin(longitude),
      //   // RADIUS * Math.cos(longitude)
      // );
      matrix.compose(position, quaternion, scale);
      // temp.updateMatrix();
      instancedMeshRef.current?.setMatrixAt(i, matrix);
    }
    // Update the instance
    // instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      // @ts-ignore
      args={[cone, material, count]}
      position={[-7.5, -7.5, -10]}
    />
  );
}
