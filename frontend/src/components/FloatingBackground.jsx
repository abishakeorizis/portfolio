import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ───── Individual 3D shapes ───── */

/** Floating translucent cube */
function FloatingCube({ position, size = 1, color = '#6366f1', speed = 1 }) {
    const ref = useRef();
    useFrame((state) => {
        ref.current.rotation.x += 0.003 * speed;
        ref.current.rotation.y += 0.005 * speed;
    });
    return (
        <Float speed={1.5} floatIntensity={2} rotationIntensity={0.4}>
            <mesh ref={ref} position={position}>
                <boxGeometry args={[size, size, size]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

/** Floating bar-chart group (3 bars) */
function BarChart({ position }) {
    const ref = useRef();
    useFrame(() => {
        ref.current.rotation.y += 0.002;
    });
    const heights = [1.2, 2, 1.5];
    const colors = ['#818cf8', '#a78bfa', '#c084fc'];
    return (
        <Float speed={1} floatIntensity={1.5}>
            <group ref={ref} position={position}>
                {heights.map((h, i) => (
                    <mesh key={i} position={[(i - 1) * 0.5, h / 2, 0]}>
                        <boxGeometry args={[0.3, h, 0.3]} />
                        <meshStandardMaterial
                            color={colors[i]}
                            transparent
                            opacity={0.2}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

/** Floating donut / torus chart ring */
function DonutChart({ position, color = '#c084fc' }) {
    const ref = useRef();
    useFrame(() => {
        ref.current.rotation.x += 0.004;
        ref.current.rotation.z += 0.002;
    });
    return (
        <Float speed={2} floatIntensity={1}>
            <mesh ref={ref} position={position}>
                <torusGeometry args={[0.8, 0.25, 16, 40]} />
                <meshStandardMaterial color={color} transparent opacity={0.18} />
            </mesh>
        </Float>
    );
}

/** Floating ambient particles */
function Particles({ count = 80 }) {
    const mesh = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 30;
        }
        return arr;
    }, [count]);

    useFrame(() => {
        mesh.current.rotation.y += 0.0003;
        mesh.current.rotation.x += 0.0001;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#818cf8" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

/* ───── Main scene ───── */

/**
 * FloatingBackground – Three.js scene rendered behind all page content.
 * Contains floating cubes, bar charts, donut rings, and ambient particles.
 */
export default function FloatingBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />

                {/* Floating cubes */}
                <FloatingCube position={[-5, 3, -3]} size={1.4} color="#6366f1" speed={0.8} />
                <FloatingCube position={[5, -2, -4]} size={1} color="#8b5cf6" speed={1.2} />
                <FloatingCube position={[3, 4, -5]} size={0.8} color="#c084fc" speed={1} />
                <FloatingCube position={[-4, -3, -2]} size={0.6} color="#818cf8" speed={0.6} />

                {/* Floating chart shapes */}
                <BarChart position={[-6, -1, -6]} />
                <BarChart position={[6, 2, -5]} />
                <DonutChart position={[4, -4, -4]} color="#a78bfa" />
                <DonutChart position={[-3, 4, -6]} color="#818cf8" />

                {/* Ambient particles */}
                <Particles count={100} />
            </Canvas>
        </div>
    );
}
