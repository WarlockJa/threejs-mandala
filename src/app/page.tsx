"use client";
import { GeometriesProvider } from "@/Context/GeometriesProvider";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <main className="h-screen bg-slate-900">
      <GeometriesProvider>
        <Scene />
      </GeometriesProvider>
    </main>
  );
}
