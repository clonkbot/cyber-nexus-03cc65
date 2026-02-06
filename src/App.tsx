import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback } from 'react'
import Game from './components/Game'
import GameUI from './components/GameUI'
import StartScreen from './components/StartScreen'
import GameOverScreen from './components/GameOverScreen'

export type GameState = 'start' | 'playing' | 'gameover'

export interface GameData {
  health: number
  maxHealth: number
  score: number
  collectibles: number
  totalCollectibles: number
  enemiesDefeated: number
}

function App() {
  const [gameState, setGameState] = useState<GameState>('start')
  const [gameData, setGameData] = useState<GameData>({
    health: 100,
    maxHealth: 100,
    score: 0,
    collectibles: 0,
    totalCollectibles: 8,
    enemiesDefeated: 0,
  })

  const startGame = useCallback(() => {
    setGameData({
      health: 100,
      maxHealth: 100,
      score: 0,
      collectibles: 0,
      totalCollectibles: 8,
      enemiesDefeated: 0,
    })
    setGameState('playing')
  }, [])

  const endGame = useCallback(() => {
    setGameState('gameover')
  }, [])

  const updateGameData = useCallback((updates: Partial<GameData>) => {
    setGameData(prev => {
      const newData = { ...prev, ...updates }
      if (newData.health <= 0) {
        setTimeout(() => setGameState('gameover'), 500)
      }
      return newData
    })
  }, [])

  return (
    <div className="w-screen h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)'
        }}
      />

      {/* Vignette effect */}
      <div className="pointer-events-none absolute inset-0 z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,15,0.4) 70%, rgba(10,10,15,0.9) 100%)'
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 8, 12], fov: 50 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Game
            gameState={gameState}
            gameData={gameData}
            updateGameData={updateGameData}
            onGameOver={endGame}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      {gameState === 'start' && <StartScreen onStart={startGame} />}
      {gameState === 'playing' && <GameUI gameData={gameData} />}
      {gameState === 'gameover' && <GameOverScreen gameData={gameData} onRestart={startGame} />}

      {/* Footer */}
      <footer className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-50">
        <p className="text-[10px] md:text-xs text-cyan-900/60 font-mono tracking-wider">
          Requested by <span className="text-cyan-700/70">@onlybased_god</span> · Built by <span className="text-magenta-700/70 text-fuchsia-700/70">@clonkbot</span>
        </p>
      </footer>
    </div>
  )
}

export default App
