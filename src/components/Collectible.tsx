import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface CollectibleProps {
  position: [number, number, number]
}

export default function Collectible({ position }: CollectibleProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 3
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <Float
      speed={4}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <group ref={meshRef}>
        {/* Core crystal */}
        <mesh castShadow>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner glow */}
        <mesh scale={0.6}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#39ff14"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Outer ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.4, 0.03, 8, 24]} />
          <meshStandardMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.02, 8, 24]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* Point light for glow effect */}
        <pointLight
          color="#39ff14"
          intensity={2}
          distance={4}
        />
      </group>
    </Float>
  )
}
