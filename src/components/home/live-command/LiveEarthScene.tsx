"use client";

import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {useRef} from "react";
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
                <meshStandardMaterial map={earthTexture} roughness={0.72} metalness={0.04} />
            </mesh>

            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.39, 96, 96]} />
                <meshStandardMaterial
                    map={cloudsTexture}
                    transparent={true}
                    opacity={0.26}
                    depthWrite={false}
                />
            </mesh>

            <mesh scale={1.18}>
                <sphereGeometry args={[1.35, 96, 96]} />
                <meshBasicMaterial
                    color="#38e8ff"
                    transparent={true}
                    opacity={0.08}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
};

const OrbitRing = () => (
    <mesh rotation={[0.95, 0.15, -0.45]}>
        <torusGeometry args={[2.15, 0.01, 16, 240]} />
        <meshBasicMaterial color="#39e6ff" transparent={true} opacity={0.22} />
    </mesh>
);

const Satellite = () => {
    const satelliteRef = useRef<THREE.Group>(null);

    useFrame(({clock}) => {
        const time = clock.getElapsedTime();
        const angle = time * 0.72;
        const radius = 2.15;

        if (!satelliteRef.current) return;

        const front = Math.max(0, Math.sin(angle));

        satelliteRef.current.position.x = Math.cos(angle) * radius;
        satelliteRef.current.position.y = Math.sin(angle) * radius * 0.55;
        satelliteRef.current.position.z = Math.sin(angle) * 1.75;

        satelliteRef.current.scale.setScalar(0.42 + front * 0.22);
        satelliteRef.current.rotation.z = -angle;
        satelliteRef.current.rotation.y = time * 0.5;
    });

    return (
        <group ref={satelliteRef}>
            <mesh>
                <boxGeometry args={[0.38, 0.18, 0.18]} />
                <meshStandardMaterial
                    color="#dffcff"
                    emissive="#38e8ff"
                    emissiveIntensity={0.35}
                    roughness={0.35}
                    metalness={0.6}
                />
            </mesh>

            <mesh position={[-0.42, 0, 0]}>
                <boxGeometry args={[0.38, 0.12, 0.02]} />
                <meshStandardMaterial color="#1ddfff" emissive="#1ddfff" emissiveIntensity={0.3} />
            </mesh>

            <mesh position={[0.42, 0, 0]}>
                <boxGeometry args={[0.38, 0.12, 0.02]} />
                <meshStandardMaterial color="#1ddfff" emissive="#1ddfff" emissiveIntensity={0.3} />
            </mesh>

            <mesh position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.18]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            <mesh scale={1.8}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color="#38e8ff" transparent={true} opacity={0.08} />
            </mesh>
        </group>
    );
};

const LiveEarthScene = () => {
    return (
        <div className="absolute inset-0">
            <Canvas
                dpr={[1, 1.5]}
                camera={{position: [0, 0.05, 5.2], fov: 36}}
                gl={{antialias: true, alpha: true, powerPreference: "high-performance"}}
            >
                <ambientLight intensity={0.55} />
                <directionalLight position={[5, 3, 5]} intensity={2.4} />
                <pointLight position={[-4, -2, 4]} intensity={1.2} color="#38e8ff" />

                <EarthModel />
                <OrbitRing />
                <Satellite />
            </Canvas>
        </div>
    );
};

export default LiveEarthScene;