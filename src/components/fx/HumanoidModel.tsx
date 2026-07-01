import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

/* Palette : anthracite glossy + accents teal lumineux + articulations métal clair */
const BODY = '#16181d';
const GLOSS = '#050608';
const METAL = '#aab2bd';
const TEAL = '#17e1c5';

function bodyMat() {
  return <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.32} />;
}
function metalMat() {
  return <meshStandardMaterial color={METAL} metalness={1} roughness={0.28} />;
}
function tealMat(i = 2.6) {
  return <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={i} toneMapped={false} />;
}

/** Visage LED dot-matrix (deux yeux faits de petits points lumineux). */
function FaceMatrix() {
  const dots = useMemo(() => {
    const arr: [number, number][] = [];
    for (const cx of [-0.2, 0.2]) {
      for (let col = 0; col < 6; col++) {
        for (let row = 0; row < 2; row++) {
          arr.push([cx + (col - 2.5) * 0.05, 0.04 + (row - 0.5) * 0.07]);
        }
      }
    }
    return arr;
  }, []);
  return (
    <group position={[0, 0, 0.005]}>
      {dots.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <sphereGeometry args={[0.03, 10, 10]} />
          {tealMat(4)}
        </mesh>
      ))}
    </group>
  );
}

/** Bras articulé (épaule -> avant-bras -> main), posé en geste d'accueil. */
function Arm({ side }: { side: 1 | -1 }) {
  return (
    <group position={[0.95 * side, 1.2, 0]} rotation={[0.1, 0, side * -0.5]}>
      {/* épaule */}
      <mesh>
        <sphereGeometry args={[0.26, 24, 24]} />
        {metalMat()}
      </mesh>
      {/* bras */}
      <group rotation={[0, 0, side * -0.5]}>
        <mesh position={[0.45 * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.16, 0.6, 8, 16]} />
          {bodyMat()}
        </mesh>
        {/* coude */}
        <group position={[0.85 * side, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.17, 20, 20]} />
            {metalMat()}
          </mesh>
          {/* avant-bras relevé */}
          <group rotation={[side * 1.15, 0, 0]}>
            <mesh position={[0.25 * side, 0.25, 0]} rotation={[0, 0, Math.PI / 2.3]}>
              <capsuleGeometry args={[0.13, 0.5, 8, 16]} />
              {bodyMat()}
            </mesh>
            {/* main (paume ouverte) */}
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
        {/* ---------- Tête ---------- */}
        <group ref={head} position={[0, 2.05, 0]}>
          {/* crâne */}
          <mesh scale={[0.68, 0.8, 0.64]}>
            <sphereGeometry args={[1, 48, 48]} />
            {bodyMat()}
          </mesh>
          {/* faceplate noir glossy */}
          <mesh position={[0, -0.02, 0.36]} scale={[0.56, 0.68, 0.46]}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial color={GLOSS} metalness={1} roughness={0.04} />
          </mesh>
          <group position={[0, 0, 0.86]}>
            <FaceMatrix />
          </group>
        </group>

        {/* ---------- Cou ---------- */}
        <mesh position={[0, 1.55, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.3, 20]} />
          {metalMat()}
        </mesh>

        {/* ---------- Torse ---------- */}
        {/* haut du torse (épaules) */}
        <mesh position={[0, 1.15, 0]}>
          <capsuleGeometry args={[0.5, 0.5, 10, 24]} />
          {bodyMat()}
        </mesh>
        {/* poitrine / réacteur */}
        <mesh position={[0, 1.05, 0.42]}>
          <circleGeometry args={[0.12, 24]} />
          {tealMat(2.8)}
        </mesh>
        {/* abdomen */}
        <mesh position={[0, 0.45, 0]} scale={[0.85, 1, 0.7]}>
          <capsuleGeometry args={[0.42, 0.45, 10, 24]} />
          {bodyMat()}
        </mesh>
        {/* bande teal taille */}
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.36, 0.03, 12, 32]} />
          {tealMat(2)}
        </mesh>
        {/* bassin */}
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.36, 0.2, 8, 20]} />
          {metalMat()}
        </mesh>

        {/* ---------- Bras ---------- */}
        <Arm side={1} />
        <Arm side={-1} />

        {/* ---------- Jambes (haut, cadré) ---------- */}
        {[1, -1].map((s) => (
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
    <ambientLight intensity={0.55} />
    <directionalLight position={[5, 6, 5]} intensity={2.2} />
    <pointLight position={[-4, 2, 3]} intensity={45} color={TEAL} distance={18} />
    <pointLight position={[3, -1, 4]} intensity={22} color="#6d8bff" distance={18} />
    <Environment resolution={64}>
      <Lightformer intensity={2.6} position={[0, 3, 4]} scale={[8, 8, 1]} color="#ffffff" />
      <Lightformer intensity={2} position={[-4, 1, 2]} scale={[5, 7, 1]} color={TEAL} />
      <Lightformer intensity={1.4} position={[4, -1, 3]} scale={[5, 7, 1]} color="#6d8bff" />
      <Lightformer intensity={1} position={[0, -3, 2]} scale={[6, 3, 1]} color="#ffffff" />
    </Environment>
    <Robot />
  </Canvas>
);

export default HumanoidModel;
