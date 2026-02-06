import type { GameData } from '../App'

interface GameOverScreenProps {
  gameData: GameData
  onRestart: () => void
}

export default function GameOverScreen({ gameData, onRestart }: GameOverScreenProps) {
  const isVictory = gameData.collectibles >= gameData.totalCollectibles

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isVictory
            ? 'radial-gradient(ellipse at center, rgba(0,50,50,0.7) 0%, rgba(10,10,15,0.98) 100%)'
            : 'radial-gradient(ellipse at center, rgba(50,0,0,0.7) 0%, rgba(10,10,15,0.98) 100%)'
        }}
      />

      {/* Glitch effect overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)'
        }}
      />

      {/* Content */}
      <div className="relative text-center max-w-lg w-full">
        {/* Status */}
        <div className="mb-6 md:mb-8">
          <h1
            className="font-['Orbitron'] text-3xl md:text-5xl lg:text-6xl font-black tracking-tight animate-pulse"
            style={{
              color: isVictory ? '#39ff14' : '#ff0055',
              textShadow: `0 0 60px ${isVictory ? 'rgba(57,255,20,0.8)' : 'rgba(255,0,85,0.8)'}`,
            }}
          >
            {isVictory ? 'MISSION COMPLETE' : 'SYSTEM FAILURE'}
          </h1>

          <div
            className="font-['Share_Tech_Mono'] text-xs md:text-sm mt-2 md:mt-3 tracking-widest uppercase"
            style={{ color: isVictory ? '#00ffff' : '#ff6600' }}
          >
            {isVictory ? '// All data cores retrieved' : '// Connection terminated'}
          </div>
        </div>

        {/* Stats panel */}
        <div className="relative mx-auto max-w-xs md:max-w-sm mb-6 md:mb-8">
          <div
            className="absolute inset-0 rounded-lg opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.1) 100%)',
              border: '1px solid rgba(0,255,255,0.3)',
            }}
          />

          <div className="relative p-4 md:p-6 space-y-3 md:space-y-4">
            {/* Final Score */}
            <div className="flex justify-between items-center border-b border-cyan-900/30 pb-3">
              <span className="font-['Orbitron'] text-xs md:text-sm text-cyan-400 tracking-wider uppercase">
                Final Score
              </span>
              <span
                className="font-['Share_Tech_Mono'] text-xl md:text-3xl font-bold"
                style={{ color: '#00ffff', textShadow: '0 0 20px rgba(0,255,255,0.5)' }}
              >
                {gameData.score.toString().padStart(6, '0')}
              </span>
            </div>

            {/* Collectibles */}
            <div className="flex justify-between items-center">
              <span className="font-['Orbitron'] text-xs md:text-sm text-green-400 tracking-wider uppercase">
                Data Cores
              </span>
              <span
                className="font-['Share_Tech_Mono'] text-base md:text-xl font-bold"
                style={{ color: '#39ff14' }}
              >
                {gameData.collectibles}/{gameData.totalCollectibles}
              </span>
            </div>

            {/* Enemies */}
            <div className="flex justify-between items-center">
              <span className="font-['Orbitron'] text-xs md:text-sm text-orange-400 tracking-wider uppercase">
                Threats Eliminated
              </span>
              <span
                className="font-['Share_Tech_Mono'] text-base md:text-xl font-bold"
                style={{ color: '#ff6600' }}
              >
                {gameData.enemiesDefeated}/4
              </span>
            </div>

            {/* Health remaining */}
            <div className="flex justify-between items-center">
              <span className="font-['Orbitron'] text-xs md:text-sm text-fuchsia-400 tracking-wider uppercase">
                Vitality Remaining
              </span>
              <span
                className="font-['Share_Tech_Mono'] text-base md:text-xl font-bold"
                style={{ color: gameData.health > 0 ? '#ff00ff' : '#ff0055' }}
              >
                {gameData.health}%
              </span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-fuchsia-500" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-fuchsia-500" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="group relative pointer-events-auto px-8 py-3 md:px-10 md:py-4 font-['Orbitron'] text-sm md:text-base tracking-widest uppercase transition-all duration-300 hover:scale-105 touch-manipulation"
        >
          <div
            className="absolute inset-0 rounded transition-all duration-300 group-hover:opacity-100 opacity-80"
            style={{
              background: isVictory
                ? 'linear-gradient(135deg, rgba(57,255,20,0.2) 0%, rgba(0,255,255,0.2) 100%)'
                : 'linear-gradient(135deg, rgba(255,0,85,0.2) 0%, rgba(255,102,0,0.2) 100%)',
              border: `2px solid ${isVictory ? 'rgba(57,255,20,0.6)' : 'rgba(255,0,85,0.6)'}`,
              boxShadow: `0 0 30px ${isVictory ? 'rgba(57,255,20,0.3)' : 'rgba(255,0,85,0.3)'}`,
            }}
          />

          <span
            className="relative text-white transition-colors"
            style={{ textShadow: `0 0 20px ${isVictory ? 'rgba(57,255,20,0.8)' : 'rgba(255,0,85,0.8)'}` }}
          >
            {isVictory ? 'Play Again' : 'Reinitialize'}
          </span>

          {/* Corner decorations */}
          <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isVictory ? 'border-green-400' : 'border-red-400'}`} />
          <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isVictory ? 'border-cyan-400' : 'border-orange-400'}`} />
          <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isVictory ? 'border-cyan-400' : 'border-orange-400'}`} />
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isVictory ? 'border-green-400' : 'border-red-400'}`} />
        </button>

        {/* Error codes for flavor */}
        <div className="mt-6 md:mt-8 font-['Share_Tech_Mono'] text-[10px] md:text-xs text-cyan-900/50">
          {isVictory
            ? 'STATUS: EXTRACTION_SUCCESSFUL // PROTOCOL: STANDBY'
            : 'ERR_0x7F2A: VITAL_SYSTEMS_COMPROMISED // REBOOT: REQUIRED'}
        </div>
      </div>
    </div>
  )
}
