"use client";
import { useEffect } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { useGeometriesContext } from "../Context/GeometriesProvider";

const objNames = [
  "A_12",
  "B_01",
  "B_10",
  "D_08",
  "D_16",
  "goldfish3",
  "H_07",
  "skull2",
];
const loader = new OBJLoader();

export default function useGeometries() {
  const { addGeometry } = useGeometriesContext();

  useEffect(() => {
    objNames.forEach((objName) => {
      loader.load(`./obj/${objName}.obj`, (obj) => {
        obj.traverse((child: any) => {
          if (child.isMesh) {
            child.geometry.name = objName;
            addGeometry(child.geometry);
          }
        });
      });
    });
  }, []);

  return { objNames, objLength: objNames.length + 4 };
}
