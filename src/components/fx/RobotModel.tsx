import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const BRAND = '#16e0c4';
const DARK = '#11151f';

/** Robot sur-mesure : tête + buste, yeux lumineux, suit le curseur du regard. */
function Robot() {
  const head = useRef<THREE.Group>(null);
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
    if (!head.current) return;
    // Le regard suit la souris (amorti)
    head.current.rotation.y += (mouse.current.x * 0.5 - head.current.rotation.y) * 0.06;
    head.current.rotation.x += (mouse.current.y * 0.35 - head.current.rotation.x) * 0.06;
  });

  const glossy = { metalness: 0.85, roughness: 0.25 };

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={head} scale={1.15}>
        {/* ---- Tête ---- */}
        <RoundedBox args={[1.7, 1.45, 1.45]} radius={0.34} smoothness={6} position={[0, 0.55, 0]}>
          <meshStandardMaterial color={DARK} {...glossy} />
        </RoundedBox>

        {/* Visière noire glossy */}
        <RoundedBox args={[1.45, 0.62, 0.25]} radius={0.18} smoothness={5} position={[0, 0.6, 0.68]}>
          <meshStandardMaterial color="#05070c" metalness={1} roughness={0.05} />
        </RoundedBox>

        {/* Yeux lumineux */}
        {[-0.32, 0.32].map((x) => (
          <group key={x} position={[x, 0.6, 0.83]}>
            <mesh>
              <capsuleGeometry args={[0.075, 0.12, 8, 16]} />
              <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={3.2} toneMapped={false} />
            </mesh>
            {/* halo additif */}
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color={BRAND} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        ))}

        {/* Oreilles / casque */}
        {[-0.92, 0.92].map((x) => (
          <mesh key={x} position={[x, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.22, 24]} />
            <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
        {[-1.0, 1.0].map((x) => (
          <mesh key={x} position={[x, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.16, 0.035, 12, 24]} />
            <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={2} toneMapped={false} />
          </mesh>
        ))}

        {/* Antenne */}
        <mesh position={[0, 1.42, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.66, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* ---- Cou ---- */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.28, 0.34, 0.4, 24]} />
          <meshStandardMaterial color={DARK} {...glossy} />
        </mesh>

        {/* ---- Buste ---- */}
        <RoundedBox args={[1.8, 0.95, 1.05]} radius={0.28} smoothness={5} position={[0, -1.05, 0]}>
          <meshStandardMaterial color={DARK} {...glossy} />
        </RoundedBox>
        {/* Réacteur poitrine */}
        <mesh position={[0, -1.0, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.06, 24]} />
          <meshStandardMaterial color={BRAND} emissive={BRAND} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
        {/* Épaules */}
        {[-1.0, 1.0].map((x) => (
          <mesh key={x} position={[x, -0.9, 0]}>
            <sphereGeometry args={[0.34, 24, 24]} />
            <meshStandardMaterial color={DARK} {...glossy} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

const RobotModel = () => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 6.2], fov: 38 }}
    gl={{ antialias: true, alpha: true }}
    style={{ width: '100%', height: '100%' }}
  >
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 6, 5]} intensity={2} />
    <pointLight position={[-4, 2, 3]} intensity={45} color={BRAND} distance={16} />
    <pointLight position={[3, -2, 4]} intensity={22} color="#6d8bff" distance={16} />
    {/* Environnement généré en interne (réflexions sur le métal, sans réseau) */}
    <Environment resolution={64}>
      <Lightformer intensity={2.4} position={[0, 2, 4]} scale={[7, 7, 1]} color="#ffffff" />
      <Lightformer intensity={2} position={[-4, 1, 2]} scale={[4, 6, 1]} color={BRAND} />
      <Lightformer intensity={1.4} position={[4, -1, 2]} scale={[4, 6, 1]} color="#6d8bff" />
      <Lightformer intensity={1} position={[0, -3, 2]} scale={[6, 3, 1]} color="#ffffff" />
    </Environment>
    <Robot />
  </Canvas>
);

export default RobotModel;
