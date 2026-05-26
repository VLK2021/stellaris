"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE =
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg";

const CLOUDS_TEXTURE =
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png";

const EarthModel = () => {
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    const earthTexture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);
    const cloudsTexture = useLoader(THREE.TextureLoader, CLOUDS_TEXTURE);

    useFrame(() => {
        if (earthRef.current) earthRef.current.rotation.y += 0.0018;
        if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0026;
    });

    return (
        <group>
            <mesh ref={earthRef}>
                <sphereGeometry args={[1.35, 96, 96]} />
                <meshStandardMaterial
                    map={earthTexture}
                    roughness={0.72}
                    metalness={0.04}
                />
            </mesh>

            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.39, 96, 96]} />
                <meshStandardMaterial
                    map={cloudsTexture}
                    transparent
                    opacity={0.26}
                    depthWrite={false}
                />
            </mesh>

            <mesh scale={1.18}>
                <sphereGeometry args={[1.35, 96, 96]} />
                <meshBasicMaterial
                    color="#38e8ff"
                    transparent
                    opacity={0.08}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
};

const SatelliteModel = () => {
    return (
        <group scale={0.12}>
            {/* body */}
            <mesh>
                <boxGeometry args={[1.2, 0.45, 0.45]} />
                <meshStandardMaterial
                    color="#dffcff"
                    emissive="#38e8ff"
                    emissiveIntensity={0.35}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* left panel */}
            <mesh position={[-1.15, 0, 0]}>
                <boxGeometry args={[1.1, 0.22, 0.04]} />
                <meshStandardMaterial
                    color="#1ddfff"
                    emissive="#1ddfff"
                    emissiveIntensity={0.25}
                />
            </mesh>

            {/* right panel */}
            <mesh position={[1.15, 0, 0]}>
                <boxGeometry args={[1.1, 0.22, 0.04]} />
                <meshStandardMaterial
                    color="#1ddfff"
                    emissive="#1ddfff"
                    emissiveIntensity={0.25}
                />
            </mesh>

            {/* antenna */}
            <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.6]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
        </group>
    );
};

const OrbitSystem = () => {
    const satelliteRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const radius = 2.15;

        if (satelliteRef.current) {
            satelliteRef.current.position.x = Math.cos(t * 0.65) * radius;
            satelliteRef.current.position.z = Math.sin(t * 0.65) * radius;
            satelliteRef.current.position.y = Math.sin(t * 1.3) * 0.28;

            satelliteRef.current.rotation.y = -t * 1.5;
        }
    });

    return (
        <>
            {/* clean orbit ring */}
            <mesh rotation={[Math.PI / 2.2, 0.3, -0.15]}>
                <torusGeometry args={[2.15, 0.004, 16, 220]} />
                <meshBasicMaterial
                    color="#39e6ff"
                    transparent
                    opacity={0.12}
                />
            </mesh>

            {/* ONE satellite */}
            <group ref={satelliteRef}>
                <SatelliteModel />
            </group>
        </>
    );
};

const LiveEarthScene = () => {
    return (
        <div className="absolute inset-0">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0.05, 5.2], fov: 36 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <ambientLight intensity={0.55} />
                <directionalLight position={[5, 3, 5]} intensity={2.4} />
                <pointLight
                    position={[-4, -2, 4]}
                    intensity={1.2}
                    color="#38e8ff"
                />

                <EarthModel />
                <OrbitSystem />
            </Canvas>
        </div>
    );
};

export default LiveEarthScene;