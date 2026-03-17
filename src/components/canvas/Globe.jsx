import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  const { gl } = useThree();

  useMemo(() => {
    const canvas = gl.domElement;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging.current) {
        dragOffset.current.x += (e.clientY - lastMouse.current.y) * 0.008;
        dragOffset.current.y += (e.clientX - lastMouse.current.x) * 0.008;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onPointerDown = (e) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
    };
  }, [gl]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1 + smoothMouse.current.x * 0.4 + dragOffset.current.y;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + smoothMouse.current.y * 0.3 + dragOffset.current.x;
    }

    // Slow damping on drag offset
    dragOffset.current.x *= 0.98;
    dragOffset.current.y *= 0.98;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#151030"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {[1.3, 1.6, 1.9].map((radius, i) => (
        <mesh
          key={i}
          rotation={[
            Math.PI * (i * 0.3),
            Math.PI * (i * 0.5),
            Math.PI * (i * 0.2),
          ]}
        >
          <torusGeometry args={[radius, 0.01, 16, 64]} />
          <meshStandardMaterial
            color={i === 0 ? "#915EFF" : i === 1 ? "#00cea8" : "#bf61ff"}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      <pointLight position={[2, 2, 2]} intensity={0.5} color="#915EFF" />
      <pointLight position={[-2, -2, -2]} intensity={0.3} color="#00cea8" />
    </group>
  );
}

export default function GlobeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#915EFF" />
      <Globe />
    </Canvas>
  );
}
