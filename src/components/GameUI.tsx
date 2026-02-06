import type { GameData } from '../App'

interface GameUIProps {
  gameData: GameData
}

export default function GameUI({ gameData }: GameUIProps) {
  const healthPercent = (gameData.health / gameData.maxHealth) * 100
  const healthColor = healthPercent > 50 ? '#00ffff' : healthPercent > 25 ? '#ff6600' : '#ff0055'

  return (
    <div className="absolute inset-0 pointer-events-none z-30 p-3 md:p-6">
      {/* Top HUD */}
      <div className="flex justify-between items-start gap-4">
        {/* Health Panel */}
        <div className="relative">
          {/* Holographic panel background */}
          <div
            className="absolute inset-0 rounded-lg opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,255,0.3) 0%, rgba(255,0,255,0.1) 100%)',
              boxShadow: 'inset 0 0 20px rgba(0,255,255,0.2)',
              border: '1px solid rgba(0,255,255,0.3)'
            }}
          />

          <div className="relative px-3 py-2 md:px-5 md:py-3">
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse" style={{ backgroundColor: healthColor, boxShadow: `0 0 10px ${healthColor}` }} />
              <span className="font-['Orbitron'] text-[10px] md:text-xs text-cyan-400 tracking-widest uppercase">
                Vitality
              </span>
            </div>

            {/* Health bar */}
            <div className="w-32 md:w-48 h-2 md:h-3 bg-black/50 rounded overflow-hidden border border-cyan-900/50">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${healthPercent}%`,
                  background: `linear-gradient(90deg, ${healthColor}, ${healthColor}aa)`,
                  boxShadow: `0 0 20px ${healthColor}`,
                }}
              />
            </div>

            <div className="mt-1 font-['Share_Tech_Mono'] text-xs md:text-sm" style={{ color: healthColor }}>
              {gameData.health}/{gameData.maxHealth}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500" />
        </div>

        {/* Score Panel */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-lg opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,255,0.3) 0%, rgba(0,255,255,0.1) 100%)',
              boxShadow: 'inset 0 0 20px rgba(255,0,255,0.2)',
              border: '1px solid rgba(255,0,255,0.3)'
            }}
          />

          <div className="relative px-3 py-2 md:px-5 md:py-3 text-right">
            <span className="font-['Orbitron'] text-[10px] md:text-xs text-fuchsia-400 tracking-widest uppercase">
              Score
            </span>
            <div
              className="font-['Share_Tech_Mono'] text-xl md:text-3xl font-bold text-white"
              style={{ textShadow: '0 0 20px #ff00ff' }}
            >
              {gameData.score.toString().padStart(6, '0')}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-fuchsia-500" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-fuchsia-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-fuchsia-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-fuchsia-500" />
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-12 md:bottom-16 left-3 md:left-6 right-3 md:right-6 flex justify-between items-end">
        {/* Collectibles */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-lg opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(57,255,20,0.3) 0%, rgba(0,255,255,0.1) 100%)',
              boxShadow: 'inset 0 0 20px rgba(57,255,20,0.2)',
              border: '1px solid rgba(57,255,20,0.3)'
            }}
          />

          <div className="relative px-3 py-2 md:px-4 md:py-3">
            <div className="flex items-center gap-2 md:gap-3">
              <svg className="w-4 h-4 md:w-6 md:h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
              <div>
                <span className="font-['Orbitron'] text-[10px] md:text-xs text-green-400 tracking-widest uppercase block">
                  Data Cores
                </span>
                <span
                  className="font-['Share_Tech_Mono'] text-lg md:text-2xl font-bold"
                  style={{ color: '#39ff14', textShadow: '0 0 10px #39ff14' }}
                >
                  {gameData.collectibles}/{gameData.totalCollectibles}
                </span>
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500" />
        </div>

        {/* Enemies defeated */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-lg opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,102,0,0.3) 0%, rgba(255,0,85,0.1) 100%)',
              boxShadow: 'inset 0 0 20px rgba(255,102,0,0.2)',
              border: '1px solid rgba(255,102,0,0.3)'
            }}
          />

          <div className="relative px-3 py-2 md:px-4 md:py-3 text-right">
            <div className="flex items-center gap-2 md:gap-3 justify-end">
              <div>
                <span className="font-['Orbitron'] text-[10px] md:text-xs text-orange-400 tracking-widest uppercase block">
                  Eliminated
                </span>
                <span
                  className="font-['Share_Tech_Mono'] text-lg md:text-2xl font-bold"
                  style={{ color: '#ff6600', textShadow: '0 0 10px #ff6600' }}
                >
                  {gameData.enemiesDefeated}/4
                </span>
              </div>
              <svg className="w-4 h-4 md:w-6 md:h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-orange-500" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-orange-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-orange-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-orange-500" />
        </div>
      </div>

      {/* Controls hint - show on desktop only */}
      <div className="hidden md:block absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-4 text-cyan-600/60 font-['Share_Tech_Mono'] text-xs">
          <span>WASD to move</span>
          <span className="text-fuchsia-600/60">|</span>
          <span>SPACE to attack</span>
        </div>
      </div>

      {/* Mobile controls hint */}
      <div className="md:hidden absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-cyan-600/60 font-['Share_Tech_Mono'] text-[10px]">
          <span>Swipe to move</span>
          <span className="text-fuchsia-600/60">|</span>
          <span>2-finger tap to attack</span>
        </div>
      </div>
    </div>
  )
}
