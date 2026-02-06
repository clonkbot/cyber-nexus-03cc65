import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EnemyProps {
  id: number
  initialPosition: [number, number, number]
  playerPosition: THREE.Vector3
  onHitPlayer: () => void
  isPlaying: boolean
}

export default function Enemy({ initialPosition, playerPosition, onHitPlayer, isPlaying }: EnemyProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const [position, setPosition] = useState(new THREE.Vector3(...initialPosition))
  const hitCooldownRef = useRef(false)
  const timeRef = useRef(Math.random() * 100)

  useEffect(() => {
    setPosition(new THREE.Vector3(...initialPosition))
  }, [initialPosition])

  useFrame((state, delta) => {
    if (!isPlaying || !meshRef.current) return

    timeRef.current += delta

    // Simple AI: move toward player
    const direction = new THREE.Vector3()
      .subVectors(playerPosition, position)
      .normalize()

    // Add some wobble to movement
    const wobble = new THREE.Vector3(
      Math.sin(timeRef.current * 3) * 0.3,
      0,
      Math.cos(timeRef.current * 2.5) * 0.3
    )

    const speed = 1.5 + Math.sin(timeRef.current) * 0.5
    const newPos = position.clone()
    newPos.add(direction.multiplyScalar(speed * delta))
    newPos.add(wobble.multiplyScalar(delta))

    // Arena bounds
    const bound = 8
    newPos.x = Math.max(-bound, Math.min(bound, newPos.x))
    newPos.z = Math.max(-bound, Math.min(bound, newPos.z))
    newPos.y = 0.5

    setPosition(newPos)
    meshRef.current.position.copy(newPos)

    // Rotation to face player
    meshRef.current.lookAt(playerPosition)

    // Floating animation
    meshRef.current.position.y = newPos.y + Math.sin(timeRef.current * 4) * 0.1

    // Scale pulsing
    const scalePulse = 1 + Math.sin(timeRef.current * 6) * 0.05
    meshRef.current.scale.setScalar(scalePulse)

    // Check collision with player
    const distToPlayer = newPos.distanceTo(playerPosition)
    if (distToPlayer < 1.2 && !hitCooldownRef.current) {
      onHitPlayer()
      hitCooldownRef.current = true
      setTimeout(() => {
        hitCooldownRef.current = false
      }, 1000)
    }
  })

  return (
    <group ref={meshRef} position={initialPosition}>
      {/* Enemy body - angular, menacing */}
      <mesh castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 8, 16]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Danger indicator spikes */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.4,
            0,
            Math.sin((i * Math.PI) / 2) * 0.4
          ]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <coneGeometry args={[0.1, 0.3, 4]} />
          <meshStandardMaterial
            color="#ff6600"
            emissive="#ff6600"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Glow */}
      <pointLight
        color="#ff00ff"
        intensity={2}
        distance={4}
      />
    </group>
  )
}
