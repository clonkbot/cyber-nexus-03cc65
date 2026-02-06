import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EnemyData {
  id: number
  position: [number, number, number]
  alive: boolean
}

interface PlayerProps {
  position: THREE.Vector3
  rotation: number
  isPlaying: boolean
  onAttack: (enemyId: number) => void
  enemies: EnemyData[]
}

export default function Player({ position, rotation, isPlaying, onAttack, enemies }: PlayerProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [isAttacking, setIsAttacking] = useState(false)
  const attackCooldownRef = useRef(false)

  // Attack animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !attackCooldownRef.current && isPlaying) {
        setIsAttacking(true)
        attackCooldownRef.current = true

        // Check for enemy hits
        enemies.forEach(enemy => {
          if (!enemy.alive) return
          const enemyPos = new THREE.Vector3(...enemy.position)
          const dist = position.distanceTo(enemyPos)
          if (dist < 2.5) {
            onAttack(enemy.id)
          }
        })

        setTimeout(() => {
          setIsAttacking(false)
        }, 200)

        setTimeout(() => {
          attackCooldownRef.current = false
        }, 500)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, enemies, position, onAttack])

  // Touch attack
  useEffect(() => {
    const handleDoubleTap = (e: TouchEvent) => {
      if (e.touches.length >= 2 && !attackCooldownRef.current && isPlaying) {
        setIsAttacking(true)
        attackCooldownRef.current = true

        enemies.forEach(enemy => {
          if (!enemy.alive) return
          const enemyPos = new THREE.Vector3(...enemy.position)
          const dist = position.distanceTo(enemyPos)
          if (dist < 2.5) {
            onAttack(enemy.id)
          }
        })

        setTimeout(() => {
          setIsAttacking(false)
        }, 200)

        setTimeout(() => {
          attackCooldownRef.current = false
        }, 500)
      }
    }

    window.addEventListener('touchstart', handleDoubleTap)
    return () => window.removeEventListener('touchstart', handleDoubleTap)
  }, [isPlaying, enemies, position, onAttack])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.copy(position)
      groupRef.current.rotation.y = rotation

      // Bobbing animation
      const bobAmount = Math.sin(state.clock.elapsedTime * 4) * 0.05
      groupRef.current.position.y = position.y + bobAmount
    }
  })

  return (
    <group ref={groupRef}>
      {/* Player body - stylized low-poly character */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={isAttacking ? 1 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 1.1, 0]}>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.08, 1.15, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-0.08, 1.15, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Attack aura */}
      {isAttacking && (
        <mesh position={[0, 0.5, 0]} scale={[2.5, 2.5, 2.5]}>
          <ringGeometry args={[0.8, 1, 16]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Glow effect underneath */}
      <pointLight
        position={[0, 0.2, 0]}
        color="#00ffff"
        intensity={isAttacking ? 3 : 1}
        distance={3}
      />
    </group>
  )
}
