// import * as THREE from "three";
// import React, { useMemo, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Text, Html, Line } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

// type NodeId = string;

// type SkillNode = {
//     id: NodeId;
//     label: string;
//     group: "Frontend" | "Backend" | "Data" | "Project";
//     level: 1 | 2 | 3 | 4 | 5;
//     position: [number, number, number];
// };

// type Link = { from: NodeId; to: NodeId };

// const NODES: SkillNode[] = [
//     { id: "react", label: "React", group: "Frontend", level: 5, position: [-1.4, 0.6, 0.2] },
//     { id: "ts", label: "TypeScript", group: "Frontend", level: 4, position: [-0.6, 1.2, -0.4] },
//     { id: "node", label: "Node.js", group: "Backend", level: 4, position: [1.2, 0.4, 0.1] },
//     { id: "api", label: "REST/API", group: "Backend", level: 4, position: [0.8, 1.2, -0.2] },
//     { id: "sql", label: "SQL", group: "Data", level: 4, position: [0.2, -0.8, 0.6] },
//     { id: "db", label: "Data modeling", group: "Data", level: 3, position: [1.0, -1.2, 0.2] },
//     { id: "agile", label: "Agile", group: "Project", level: 4, position: [-0.8, -1.0, -0.3] },
//     { id: "gp", label: "Gestion projet", group: "Project", level: 3, position: [-1.6, -0.6, -0.1] },
// ];

// const LINKS: Link[] = [
//     { from: "react", to: "ts" },
//     { from: "react", to: "api" },
//     { from: "node", to: "api" },
//     { from: "sql", to: "db" },
//     { from: "agile", to: "gp" },
//     { from: "api", to: "sql" },
//     { from: "react", to: "node" },
// ];

// function colorByGroup(group: SkillNode["group"]) {
//     switch (group) {
//         case "Frontend":
//             return new THREE.Color("#22c55e"); // vert
//         case "Backend":
//             return new THREE.Color("#60a5fa"); // bleu
//         case "Data":
//             return new THREE.Color("#f59e0b"); // amber
//         case "Project":
//             return new THREE.Color("#a78bfa"); // violet
//     }
// }

// function SkillGraph() {
//     const [hovered, setHovered] = useState<SkillNode | null>(null);

//     // Particules (ambiance)
//     const particles = useMemo(() => {
//         const pts: number[] = [];
//         for (let i = 0; i < 220; i++) {
//             pts.push(
//                 (Math.random() - 0.5) * 10,
//                 (Math.random() - 0.5) * 6,
//                 (Math.random() - 0.5) * 10
//             );
//         }
//         return new Float32Array(pts);
//     }, []);

//     return (
//         <>
//             {/* Fond */}
//             <color attach="background" args={["#05070f"]} />

//             {/* Particules */}
//             <points>
//                 <bufferGeometry>
//                     <bufferAttribute
//                         attach="attributes-position"
//                         array={particles}
//                         count={particles.length / 3}
//                         itemSize={3}
//                     />
//                 </bufferGeometry>
//                 <pointsMaterial size={0.02} color="#9ca3af" transparent opacity={0.35} />
//             </points>

//             {/* Liens (FIX: utiliser <Line /> de drei) */}
//             {LINKS.map((l, idx) => {
//                 const a = NODES.find((n) => n.id === l.from)!;
//                 const b = NODES.find((n) => n.id === l.to)!;

//                 return (
//                     <Line
//                         key={idx}
//                         points={[a.position, b.position]}
//                         color="#94a3b8"
//                         transparent
//                         opacity={0.35}
//                         lineWidth={1}
//                     />
//                 );
//             })}

//             {/* Nodes */}
//             {NODES.map((n) => (
//                 <SkillNode3D key={n.id} node={n} onHover={(v) => setHovered(v)} />
//             ))}

//             {/* Tooltip */}
//             {hovered && (
//                 <Html position={hovered.position} center>
//                     <div
//                         style={{
//                             padding: "8px 10px",
//                             borderRadius: 12,
//                             background: "rgba(17, 24, 39, 0.82)",
//                             border: "1px solid rgba(255,255,255,0.10)",
//                             color: "#e5e7eb",
//                             fontSize: 12,
//                             width: 180,
//                             backdropFilter: "blur(8px)",
//                         }}
//                     >
//                         <div style={{ fontWeight: 800, marginBottom: 4 }}>{hovered.label}</div>
//                         <div style={{ opacity: 0.85 }}>Domaine : {hovered.group}</div>
//                         <div style={{ opacity: 0.85 }}>Niveau : {"★".repeat(hovered.level)}</div>
//                     </div>
//                 </Html>
//             )}
//         </>
//     );
// }

// function SkillNode3D({
//     node,
//     onHover,
// }: {
//     node: SkillNode;
//     onHover: (v: SkillNode | null) => void;
// }) {
//     const ref = useRef<THREE.Mesh>(null);
//     const baseColor = useMemo(() => colorByGroup(node.group), [node.group]);

//     const radius = 0.12 + node.level * 0.02;

//     useFrame(({ clock }) => {
//         const t = clock.getElapsedTime();
//         if (ref.current) {
//             ref.current.scale.setScalar(1 + Math.sin(t * 1.2 + node.position[0] * 2) * 0.06);
//         }
//     });

//     return (
//         <group position={node.position}>
//             <mesh ref={ref} onPointerEnter={() => onHover(node)} onPointerLeave={() => onHover(null)}>
//                 <sphereGeometry args={[radius, 32, 32]} />
//                 <meshStandardMaterial
//                     color={baseColor}
//                     emissive={baseColor}
//                     emissiveIntensity={0.9}
//                     roughness={0.25}
//                     metalness={0.2}
//                 />
//             </mesh>

//             <Text
//                 position={[0, radius + 0.16, 0]}
//                 fontSize={0.12}
//                 color="#e5e7eb"
//                 anchorX="center"
//                 anchorY="middle"
//             >
//                 {node.label}
//             </Text>
//         </group>
//     );
// }

// export default function Brain3D() {
//     return (
//         <div style={{ width: "100%", height: "70vh", borderRadius: 18, overflow: "hidden" }}>
//             <Canvas camera={{ position: [0, 0.4, 4.2], fov: 50 }}>
//                 <ambientLight intensity={0.4} />
//                 <directionalLight position={[3, 4, 2]} intensity={1.2} />

//                 <SkillGraph />

//                 {/* Wow effect */}
//                 <EffectComposer>
//                     <Bloom intensity={1.2} luminanceThreshold={0.15} luminanceSmoothing={0.7} />
//                 </EffectComposer>

//                 <OrbitControls enablePan={false} minDistance={2.6} maxDistance={7} />
//             </Canvas>
//         </div>
//     );
// }