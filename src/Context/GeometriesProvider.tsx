import * as THREE from "three";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const box = new THREE.BoxGeometry(1, 1, 1);
const ball = new THREE.SphereGeometry(0.6, 16, 16);
const knot = new THREE.TorusKnotGeometry(0.5, 0.2, 50, 16);
const cone = new THREE.ConeGeometry(1, 1, 4);

interface IGeometriesContext {
  geometries: THREE.BufferGeometry[];
  addGeometry: (geometry: THREE.BufferGeometry) => void;
}

const GeometriesContext = createContext<IGeometriesContext | null>(null);

export function GeometriesProvider({ children }: PropsWithChildren<{}>) {
  const initialGeometries = [box, ball, knot, cone];
  const [geometries, setGeometries] =
    useState<THREE.BufferGeometry[]>(initialGeometries);

  const addGeometry = (newGeometry: THREE.BufferGeometry) => {
    setGeometries((prev) =>
      prev.findIndex((prev) => prev.name === newGeometry.name) === -1
        ? [...prev, newGeometry]
        : prev
    );
  };

  return (
    <GeometriesContext.Provider value={{ geometries, addGeometry }}>
      {children}
    </GeometriesContext.Provider>
  );
}

export function useGeometriesContext() {
  const context = useContext(GeometriesContext);

  if (!context)
    throw new Error("useGeometriesContext must be inside GeometriesProvider");

  return context;
}
