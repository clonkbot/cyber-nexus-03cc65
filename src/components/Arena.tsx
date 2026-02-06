import { useMemo } from 'react'
import * as THREE from 'three'

export default function Arena() {
  // Create grid pattern texture
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    // Dark background
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 512, 512)

    // Grid lines
    ctx.strokeStyle = '#1a3a4a'
    ctx.lineWidth = 1

    const gridSize = 32
    for (let i = 0; i <= 512; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(512, i)
      ctx.stroke()
    }

    // Bright accent lines
    ctx.strokeStyle = '#00ffff'
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.3

    for (let i = 0; i <= 512; i += gridSize * 4) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 512)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(512, i)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    return texture
  }, [])

  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          map={gridTexture}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Floor glow plane underneath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#001515" />
      </mesh>

      {/* Arena walls - cyber barriers */}
      {[
        { pos: [0, 1, -10] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
        { pos: [0, 1, 10] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number] },
        { pos: [-10, 1, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number] },
        { pos: [10, 1, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number] },
      ].map((wall, i) => (
        <group key={i} position={wall.pos} rotation={wall.rot}>
          {/* Wall base */}
          <mesh>
            <boxGeometry args={[20, 2, 0.2]} />
            <meshStandardMaterial
              color="#0a1520"
              metalness={0.9}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Neon edge top */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[20, 0.1, 0.25]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={2}
            />
          </mesh>

          {/* Neon edge bottom */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[20, 0.1, 0.25]} />
            <meshStandardMaterial
              color="#ff00ff"
              emissive="#ff00ff"
              emissiveIntensity={2}
            />
          </mesh>

          {/* Vertical accent lines */}
          {[-8, -4, 0, 4, 8].map((x, j) => (
            <mesh key={j} position={[x, 0, 0.05]}>
              <boxGeometry args={[0.1, 2, 0.1]} />
              <meshStandardMaterial
                color={j % 2 === 0 ? '#00ffff' : '#ff00ff'}
                emissive={j % 2 === 0 ? '#00ffff' : '#ff00ff'}
                emissiveIntensity={1}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Corner pillars */}
      {[
        [-9, -9],
        [9, -9],
        [-9, 9],
        [9, 9],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.3, 0.5, 4, 6]} />
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Pillar ring lights */}
          {[0.5, 1.5, 2.5, 3.5].map((y, j) => (
            <mesh key={j} position={[0, y, 0]}>
              <torusGeometry args={[0.4, 0.05, 8, 16]} />
              <meshStandardMaterial
                color={['#00ffff', '#ff00ff', '#39ff14', '#ff6600'][i]}
                emissive={['#00ffff', '#ff00ff', '#39ff14', '#ff6600'][i]}
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}

          {/* Top crystal */}
          <mesh position={[0, 4.3, 0]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={['#00ffff', '#ff00ff', '#39ff14', '#ff6600'][i]}
              emissive={['#00ffff', '#ff00ff', '#39ff14', '#ff6600'][i]}
              emissiveIntensity={2}
            />
          </mesh>

          <pointLight
            position={[0, 4.5, 0]}
            color={['#00ffff', '#ff00ff', '#39ff14', '#ff6600'][i]}
            intensity={1}
            distance={6}
          />
        </group>
      ))}

      {/* Center marker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.5, 2, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
