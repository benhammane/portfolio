import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

/* Palette : anthracite glossy + articulations métal clair */
const BODY = '#16181d';
const GLOSS = '#050608';
const METAL = '#aab2bd';

function bodyMat() {
  return <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.32} />;
}
function metalMat() {
  return <meshStandardMaterial color={METAL} metalness={1} roughness={0.28} />;
}

/** Bras articulé (épaule -> avant-bras -> main). */
function Arm({ side }: { side: 1 | -1 }) {
  return (
    <group position={[0.95 * side, 1.2, 0]} rotation={[0.1, 0, side * -0.5]}>
      <mesh>
        <sphereGeometry args={[0.26, 24, 24]} />
        {metalMat()}
      </mesh>
      <group rotation={[0, 0, side * -0.5]}>
        <mesh position={[0.45 * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.16, 0.6, 8, 16]} />
          {bodyMat()}
        </mesh>
        <group position={[0.85 * side, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.17, 20, 20]} />
            {metalMat()}
          </mesh>
          <group rotation={[side * 1.15, 0, 0]}>
            <mesh position={[0.25 * side, 0.25, 0]} rotation={[0, 0, Math.PI / 2.3]}>
              <capsuleGeometry args={[0.13, 0.5, 8, 16]} />
              {bodyMat()}
            </mesh>
            <mesh position={[0.4 * side, 0.55, 0]} rotation={[0, 0, side * 0.3]}>
              <boxGeometry args={[0.26, 0.3, 0.12]} />
              {bodyMat()}
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Robot() {
  const root = useRef<THREE.Group>(null);
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
    const m = mouse.current;
    if (head.current) {
      head.current.rotation.y += (m.x * 0.55 - head.current.rotation.y) * 0.06;
      head.current.rotation.x += (m.y * 0.4 - head.current.rotation.x) * 0.06;
    }
    if (root.current) {
      root.current.rotation.y += (m.x * 0.18 - root.current.rotation.y) * 0.04;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={root} position={[0, -0.4, 0]}>
        {/* Tête */}
        <group ref={head} position={[0, 2.05, 0]}>
          <mesh scale={[0.68, 0.8, 0.64]}>
            <sphereGeometry args={[1, 48, 48]} />
            {bodyMat()}
          </mesh>
          {/* visière noir glossy (remplace les LEDs) */}
          <mesh position={[0, -0.02, 0.36]} scale={[0.56, 0.68, 0.46]}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial color={GLOSS} metalness={1} roughness={0.04} />
          </mesh>
        </group>

        {/* Cou */}
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.3, 20]} />
          {metalMat()}
        </mesh>

        {/* Torse */}
        <mesh position={[0, 1.15, 0]}>
          <capsuleGeometry args={[0.5, 0.5, 10, 24]} />
          {bodyMat()}
        </mesh>
        {/* plaque poitrine métal mat */}
        <mesh position={[0, 1.05, 0.42]}>
          <circleGeometry args={[0.12, 24]} />
          {metalMat()}
        </mesh>
        {/* abdomen */}
        <mesh position={[0, 0.45, 0]} scale={[0.85, 1, 0.7]}>
          <capsuleGeometry args={[0.42, 0.45, 10, 24]} />
          {bodyMat()}
        </mesh>
        {/* bande de taille métal */}
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.36, 0.03, 12, 32]} />
          {metalMat()}
        </mesh>
        {/* bassin */}
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.36, 0.2, 8, 20]} />
          {metalMat()}
        </mesh>

        {/* Bras */}
        <Arm side={1} />
        <Arm side={-1} />

        {/* Jambes */}
        {([1, -1] as const).map((s) => (
          <group key={s} position={[0.22 * s, -0.55, 0]}>
            <mesh>
              <sphereGeometry args={[0.2, 20, 20]} />
              {metalMat()}
            </mesh>
            <mesh position={[0, -0.55, 0]}>
              <capsuleGeometry args={[0.2, 0.7, 8, 20]} />
              {bodyMat()}
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

const HumanoidModel = () => (
  <Canvas
    dpr={[1, 1.6]}
    camera={{ position: [0, 1.05, 6.8], fov: 38 }}
    gl={{ antialias: true, alpha: true }}
    style={{ width: '100%', height: '100%' }}
  >
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 6, 5]} intensity={2.4} />
    <pointLight position={[-4, 2, 3]} intensity={30} color="#ffffff" distance={18} />
    <pointLight position={[3, -1, 4]} intensity={18} color="#8fa8ff" distance={18} />
    <Environment resolution={64}>
      <Lightformer intensity={2.6} position={[0, 3, 4]} scale={[8, 8, 1]} color="#ffffff" />
      <Lightformer intensity={1.8} position={[-4, 1, 2]} scale={[5, 7, 1]} color="#d0e8ff" />
      <Lightformer intensity={1.4} position={[4, -1, 3]} scale={[5, 7, 1]} color="#8fa8ff" />
      <Lightformer intensity={1} position={[0, -3, 2]} scale={[6, 3, 1]} color="#ffffff" />
    </Environment>
    <Robot />
  </Canvas>
);

export default HumanoidModel;
