import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

const RADIUS = 15;

export function Instances({ count = 10000, temp = new THREE.Object3D() }) {
  const box = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const ball = new THREE.SphereGeometry(1, 16, 16);
  const knot = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
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

  useLayoutEffect(() => {
    // Set positions
    for (let i = 0; i < count; i++) {
      const longitude = Math.random() * 2 * Math.PI;
      const latitude = Math.acos(2 * Math.random() - 1);
      temp.position.set(
        RADIUS * Math.sin(latitude) * Math.cos(longitude),
        RADIUS * Math.sin(latitude) * Math.sin(longitude),
        RADIUS * Math.cos(longitude)
      );
      temp.updateMatrix();
      instancedMeshRef.current?.setMatrixAt(i, temp.matrix);
    }
    // Update the instance
    // instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[null, null, count]}
      position={[-7.5, -7.5, -10]}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      {/* <boxGeometry args={[0.1, 0.1, 0.1]} /> */}
      {/* <meshPhongMaterial /> */}
      <meshMatcapMaterial matcap={matcap} color={color} />
    </instancedMesh>
  );
}
