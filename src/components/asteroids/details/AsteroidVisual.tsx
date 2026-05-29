"use client";

import {useMemo, useRef} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Stars} from "@react-three/drei";
import {
    BufferAttribute,
    IcosahedronGeometry,
    Mesh,
    Points,
    Vector3,
} from "three";
import {motion} from "framer-motion";

const AsteroidBody = () => {
    const meshRef = useRef<Mesh>(null);
    const wireRef = useRef<Mesh>(null);

    const geometry = useMemo(() => {
        const base = new IcosahedronGeometry(1.2, 4);
        const position = base.attributes.position as BufferAttribute;
        const vector = new Vector3();

        for (let i = 0; i < position.count; i++) {
            vector.fromBufferAttribute(position, i);

            const distortion =
                1 +
                Math.sin(vector.x * 5.1) * 0.09 +
                Math.cos(vector.y * 4.4) * 0.12 +
                Math.sin(vector.z * 6.2) * 0.08;

            vector.multiplyScalar(distortion);
            position.setXYZ(i, vector.x, vector.y, vector.z);
        }

        base.computeVertexNormals();
        return base;
    }, []);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.12;
            meshRef.current.rotation.y += delta * 0.28;
            meshRef.current.rotation.z += delta * 0.05;
        }

        if (wireRef.current) {
            wireRef.current.rotation.x -= delta * 0.06;
            wireRef.current.rotation.y -= delta * 0.14;
        }
    });

    return (
        <group position={[0, 0, 0]} scale={1.27}>
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial
                    color="#8a5a32"
                    roughness={0.95}
                    metalness={0.05}
                    emissive="#1f0d05"
                    emissiveIntensity={0.22}
                />
            </mesh>

            <mesh ref={wireRef} geometry={geometry} scale={1.02}>
                <meshBasicMaterial
                    color="#38bdf8"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </group>
    );
};

const DustField = () => {
    const pointsRef = useRef<Points>(null);

    const positions = useMemo(() => {
        const count = 520;
        const array = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 2.1 + Math.random() * 2.8;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 1.6;

            array[i * 3] = Math.cos(angle) * radius;
            array[i * 3 + 1] = height;
            array[i * 3 + 2] = Math.sin(angle) * radius;
        }

        return array;
    }, []);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.04;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.018}
                color="#38bdf8"
                transparent
                opacity={0.55}
                depthWrite={false}
            />
        </points>
    );
};

const OrbitRing = ({
                       scale,
                       rotation,
                       opacity,
                   }: {
    scale: number;
    rotation: [number, number, number];
    opacity: number;
}) => {
    const ref = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * 0.07;
        }
    });

    return (
        <mesh ref={ref} scale={scale} rotation={rotation}>
            <torusGeometry args={[1.85, 0.006, 16, 160]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={opacity} />
        </mesh>
    );
};

export const AsteroidVisual = () => {
    return (
        <div className="relative h-[460px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card-deep)] shadow-[var(--shadow-card)] sm:h-[520px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-soft),transparent_34%),radial-gradient(circle_at_72%_22%,rgba(234,88,12,0.18),transparent_30%)]" />

            <Canvas
                className="absolute inset-0 h-full w-full"
                camera={{position: [0, 0, 5.6], fov: 40}}
            >
                <ambientLight intensity={0.58} />
                <directionalLight position={[4, 4, 5]} intensity={2.4} />
                <pointLight position={[-3, -2, 3]} intensity={1.7} color="#38bdf8" />
                <pointLight position={[2.5, 1.2, 1.5]} intensity={1.2} color="#fb923c" />

                <Stars radius={85} depth={42} count={1200} factor={3.8} fade speed={0.9} />

                <OrbitRing scale={1} rotation={[1.28, 0.15, 0.2]} opacity={0.22} />
                <OrbitRing scale={1.24} rotation={[1.42, -0.35, -0.22]} opacity={0.14} />
                <OrbitRing scale={1.48} rotation={[1.08, 0.45, 0.45]} opacity={0.1} />

                <DustField />
                <AsteroidBody />

                <OrbitControls
                    target={[0, 0, 0]}
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.55}
                />
            </Canvas>

            <motion.div
                className="pointer-events-none absolute left-0 top-0 h-full w-[32%] bg-gradient-to-r from-transparent via-[var(--color-accent)]/12 to-transparent blur-sm"
                animate={{x: ["-120%", "360%"], opacity: [0, 0.8, 0]}}
                transition={{duration: 4.8, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/25"
                animate={{scale: [0.92, 1.08, 0.92], opacity: [0.25, 0.65, 0.25]}}
                transition={{duration: 3.6, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="pointer-events-none absolute inset-5 rounded-[1.5rem] border border-[var(--color-border)]" />

            <div className="absolute left-5 top-5 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)] backdrop-blur-xl">
                Live object render
            </div>

            <div className="absolute bottom-5 left-5 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-xl">
                Procedural 3D visual · not a real photo
            </div>

            <div className="absolute bottom-5 right-5 hidden rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-xl sm:block">
                NASA data only
            </div>
        </div>
    );
};