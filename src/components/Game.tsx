import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Stars } from '@react-three/drei'
import * as THREE from 'three'
import type { GameState, GameData } from '../App'
import Player from './Player'
import Enemy from './Enemy'
import Collectible from './Collectible'
import Arena from './Arena'

interface GameProps {
  gameState: GameState
  gameData: GameData
  updateGameData: (updates: Partial<GameData>) => void
  onGameOver: () => void
}

interface EnemyData {
  id: number
  position: [number, number, number]
  alive: boolean
}

interface CollectibleData {
  id: number
  position: [number, number, number]
  collected: boolean
}

export default function Game({ gameState, gameData, updateGameData }: GameProps) {
  const [playerPosition, setPlayerPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0))
  const [playerRotation, setPlayerRotation] = useState(0)
  const controlsRef = useRef<any>(null)
  const keysRef = useRef<Set<string>>(new Set())
  const { camera } = useThree()

  // Initialize enemies
  const [enemies, setEnemies] = useState<EnemyData[]>([])

  // Initialize collectibles
  const [collectibles, setCollectibles] = useState<CollectibleData[]>([])

  // Reset game state when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      setPlayerPosition(new THREE.Vector3(0, 0.5, 0))
      setPlayerRotation(0)
      setEnemies([
        { id: 1, position: [-6, 0.5, -6], alive: true },
        { id: 2, position: [6, 0.5, -6], alive: true },
        { id: 3, position: [-6, 0.5, 6], alive: true },
        { id: 4, position: [6, 0.5, 6], alive: true },
      ])
      setCollectibles([
        { id: 1, position: [-4, 0.8, 0], collected: false },
        { id: 2, position: [4, 0.8, 0], collected: false },
        { id: 3, position: [0, 0.8, -4], collected: false },
        { id: 4, position: [0, 0.8, 4], collected: false },
        { id: 5, position: [-3, 0.8, -3], collected: false },
        { id: 6, position: [3, 0.8, -3], collected: false },
        { id: 7, position: [-3, 0.8, 3], collected: false },
        { id: 8, position: [3, 0.8, 3], collected: false },
      ])
    }
  }, [gameState])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase())
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase())
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Touch controls state
  const touchRef = useRef<{ startX: number; startY: number; active: boolean }>({
    startX: 0,
    startY: 0,
    active: false
  })

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchRef.current = {
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          active: true
        }
      }
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (touchRef.current.active && e.touches.length > 0) {
        const dx = e.touches[0].clientX - touchRef.current.startX
        const dy = e.touches[0].clientY - touchRef.current.startY
        const threshold = 20

        keysRef.current.clear()
        if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
          if (Math.abs(dx) > Math.abs(dy)) {
            keysRef.current.add(dx > 0 ? 'd' : 'a')
          } else {
            keysRef.current.add(dy > 0 ? 's' : 'w')
          }
        }
      }
    }
    const handleTouchEnd = () => {
      touchRef.current.active = false
      keysRef.current.clear()
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  // Game loop
  useFrame((state, delta) => {
    if (gameState !== 'playing') return

    const speed = 5
    const keys = keysRef.current
    const moveDir = new THREE.Vector3()

    if (keys.has('w') || keys.has('arrowup')) moveDir.z -= 1
    if (keys.has('s') || keys.has('arrowdown')) moveDir.z += 1
    if (keys.has('a') || keys.has('arrowleft')) moveDir.x -= 1
    if (keys.has('d') || keys.has('arrowright')) moveDir.x += 1

    if (moveDir.length() > 0) {
      moveDir.normalize()
      const newPos = playerPosition.clone()
      newPos.x += moveDir.x * speed * delta
      newPos.z += moveDir.z * speed * delta

      // Arena bounds
      const bound = 8
      newPos.x = Math.max(-bound, Math.min(bound, newPos.x))
      newPos.z = Math.max(-bound, Math.min(bound, newPos.z))

      setPlayerPosition(newPos)
      setPlayerRotation(Math.atan2(moveDir.x, moveDir.z))
    }

    // Update camera to follow player
    const targetCamPos = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 8,
      playerPosition.z + 12
    )
    camera.position.lerp(targetCamPos, 0.05)
    camera.lookAt(playerPosition)

    // Collision with collectibles
    collectibles.forEach((c, index) => {
      if (c.collected) return
      const dist = playerPosition.distanceTo(new THREE.Vector3(...c.position))
      if (dist < 1.2) {
        setCollectibles(prev => prev.map((col, i) =>
          i === index ? { ...col, collected: true } : col
        ))
        updateGameData({
          collectibles: gameData.collectibles + 1,
          score: gameData.score + 100
        })
      }
    })
  })

  // Handle enemy collision with player
  const handleEnemyHitPlayer = () => {
    if (gameState === 'playing') {
      updateGameData({ health: Math.max(0, gameData.health - 10) })
    }
  }

  // Handle player attack on enemy
  const handleAttackEnemy = (enemyId: number) => {
    setEnemies(prev => prev.map(e =>
      e.id === enemyId ? { ...e, alive: false } : e
    ))
    updateGameData({
      score: gameData.score + 250,
      enemiesDefeated: gameData.enemiesDefeated + 1
    })
  }

  return (
    <>
      {/* Environment */}
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 15, 40]} />

      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Neon accent lights */}
      <pointLight position={[-8, 3, -8]} color="#00ffff" intensity={2} distance={15} />
      <pointLight position={[8, 3, -8]} color="#ff00ff" intensity={2} distance={15} />
      <pointLight position={[-8, 3, 8]} color="#39ff14" intensity={2} distance={15} />
      <pointLight position={[8, 3, 8]} color="#ff6600" intensity={2} distance={15} />

      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Arena */}
      <Arena />

      {/* Contact shadows */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={25}
        blur={2}
        far={10}
        color="#00ffff"
      />

      {/* Player */}
      <Player
        position={playerPosition}
        rotation={playerRotation}
        isPlaying={gameState === 'playing'}
        onAttack={handleAttackEnemy}
        enemies={enemies}
      />

      {/* Enemies */}
      {enemies.map(enemy => (
        enemy.alive && (
          <Enemy
            key={enemy.id}
            id={enemy.id}
            initialPosition={enemy.position}
            playerPosition={playerPosition}
            onHitPlayer={handleEnemyHitPlayer}
            isPlaying={gameState === 'playing'}
          />
        )
      ))}

      {/* Collectibles */}
      {collectibles.map(c => (
        !c.collected && (
          <Collectible
            key={c.id}
            position={c.position}
          />
        )
      ))}

      {/* Controls - only active when not playing */}
      {gameState !== 'playing' && (
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={10}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.2}
        />
      )}
    </>
  )
}
