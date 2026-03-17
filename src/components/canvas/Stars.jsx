import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef();
  const count = 3000;
  const mouse = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const { gl } = useThree();

  // Register drag events on the canvas DOM element
  useMemo(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e) => {
      isDragging.current = true;
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;
      dragOffset.current.x += dy * 0.003;
      dragOffset.current.y += dx * 0.003;
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (ref.current) {
      // Base auto-rotation
      ref.current.rotation.x -= delta * 0.05;
      ref.current.rotation.y -= delta * 0.08;

      // Apply drag offset with damping (smooth return)
      ref.current.rotation.x += dragOffset.current.x;
      ref.current.rotation.y += dragOffset.current.y;

      // Dampen the drag offset so it doesn't stay permanently shifted
      dragOffset.current.x *= 0.95;
      dragOffset.current.y *= 0.95;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#915EFF"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]" style={{ cursor: "grab" }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
}
