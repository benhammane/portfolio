import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const BRAND = '#16e0c4';
const DARK = '#11151f';

/** Hélice qui tourne vite (disque flou + pales). */
function Rotor() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.9;
  });
  return (
    <group ref={ref} position={[0, 0.13, 0]}>
      {/* disque de flou de mouvement */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.52, 32]} />
        <meshBasicMaterial color={BRAND} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* pales */}
      {[0, Math.PI / 2].map((r) => (
        <mesh key={r} rotation={[0, r, 0]}>
          <boxGeometry args={[1.02, 0.02, 0.07]} />
          <meshStandardMaterial color="#0a0d14" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Drone() {
  const drone = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!drone.current) return;
    const m = mouse.current;
    // banking : le drone s'incline et s'oriente vers le curseur
    drone.current.rotation.y += (m.x * 0.5 - drone.current.rotation.y) * 0.05;
    drone.current.rotation.z += (-m.x * 0.35 - drone.current.rotation.z) * 0.05;
    drone.current.rotation.x += (m.y * 0.3 - drone.current.rotation.x) * 0.05;
  });

  const glossy = { metalness: 0.85, roughness: 0.25 };

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.9}>
      <group ref={drone} scale={1.4}>
        {/* ---- Corps central ---- */}
        <RoundedBox args={[1.5, 0.55, 1.5]} radius={0.26} smoothness={6}>
          <meshStandardMaterial color={DARK} {...glossy} />
        </RoundedBox>
        {/* dôme supérieur glossy */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#05070c" metalness={1} roughness={0.08} />
        </mesh>

        {/* ---- Œil / caméra à l'avant ---- */}
        <group position={[0, -0.05, 0.78]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.05, 16, 32]} />
            <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={3.2} toneMapped={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color={BRAND} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>

        {/* ---- Underglow ---- */}
        <mesh position={[0, -0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.06, 16, 40]} />
          <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>

        {/* ---- 4 bras + moteurs + hélices ---- */}
        {[0, 1, 2, 3].map((i) => {
          const angle = Math.PI / 4 + (i * Math.PI) / 2;
          return (
            <group key={i} rotation={[0, angle, 0]}>
              {/* bras */}
              <mesh position={[0.78, 0, 0]}>
                <boxGeometry args={[1.5, 0.12, 0.18]} />
                <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
              </mesh>
              {/* moteur + hélice */}
              <group position={[1.45, 0, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.17, 0.2, 0.22, 20]} />
                  <meshStandardMaterial color={DARK} {...glossy} />
                </mesh>
                <mesh position={[0, 0.13, 0]}>
                  <torusGeometry args={[0.1, 0.025, 12, 20]} />
                  <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={2} toneMapped={false} />
                </mesh>
                <Rotor />
              </group>
            </group>
          );
        })}
      </group>
    </Float>
  );
}

const DroneModel = () => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 0.8, 4.8], fov: 40 }}
    gl={{ antialias: true, alpha: true }}
    style={{ width: '100%', height: '100%' }}
  >
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 6, 5]} intensity={2} />
    <pointLight position={[-4, 2, 3]} intensity={45} color={BRAND} distance={16} />
    <pointLight position={[3, -2, 4]} intensity={22} color="#6d8bff" distance={16} />
    <Environment resolution={64}>
      <Lightformer intensity={2.4} position={[0, 2, 4]} scale={[7, 7, 1]} color="#ffffff" />
      <Lightformer intensity={2} position={[-4, 1, 2]} scale={[4, 6, 1]} color={BRAND} />
      <Lightformer intensity={1.4} position={[4, -1, 2]} scale={[4, 6, 1]} color="#6d8bff" />
      <Lightformer intensity={1} position={[0, -3, 2]} scale={[6, 3, 1]} color="#ffffff" />
    </Environment>
    <Drone />
  </Canvas>
);

export default DroneModel;
