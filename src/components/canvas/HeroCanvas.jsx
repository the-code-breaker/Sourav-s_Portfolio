import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  const { gl } = useThree();

  useMemo(() => {
    const canvas = gl.domElement;
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener("pointermove", onPointerMove);
    return () => canvas.removeEventListener("pointermove", onPointerMove);
  }, [gl]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth mouse tracking
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.4 + smoothMouse.current.y * 0.5;
      meshRef.current.rotation.y = t * 0.15 + smoothMouse.current.x * 0.5;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15 + smoothMouse.current.y * 0.2;
      meshRef.current.position.x = smoothMouse.current.x * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = Math.cos(t * 0.2) * 0.3 - smoothMouse.current.y * 0.3;
      wireframeRef.current.rotation.y = -t * 0.1 - smoothMouse.current.x * 0.3;
      wireframeRef.current.rotation.z = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#915EFF" />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#00cea8" />

      <mesh ref={meshRef} scale={1.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#915EFF"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh ref={wireframeRef} scale={2}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00cea8"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </>
  );
}

function Particles() {
  const ref = useRef();
  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count * 3; i++) {
      posArray[i] += velocities[i];
      if (Math.abs(posArray[i]) > 3) velocities[i] *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#915EFF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <FloatingGeometry />
      <Particles />
    </Canvas>
  );
}
