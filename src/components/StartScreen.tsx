interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(10,10,15,0.95) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative text-center max-w-md w-full">
        {/* Glitch title effect */}
        <div className="relative mb-6 md:mb-8">
          <h1
            className="font-['Orbitron'] text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text tracking-tight"
            style={{
              backgroundImage: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #39ff14 100%)',
              textShadow: '0 0 60px rgba(0,255,255,0.5)',
            }}
          >
            CYBER
          </h1>
          <h1
            className="font-['Orbitron'] text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text tracking-tight -mt-1 md:-mt-2"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 50%, #ff6600 100%)',
              textShadow: '0 0 60px rgba(255,0,255,0.5)',
            }}
          >
            NEXUS
          </h1>

          {/* Decorative lines */}
          <div className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
        </div>

        {/* Subtitle */}
        <p
          className="font-['Share_Tech_Mono'] text-sm md:text-base text-cyan-400/80 mb-8 md:mb-12 tracking-widest uppercase"
          style={{ textShadow: '0 0 20px rgba(0,255,255,0.3)' }}
        >
          [[ Enter the Grid ]]
        </p>

        {/* Start button */}
        <button
          onClick={onStart}
          className="group relative pointer-events-auto px-8 py-3 md:px-12 md:py-4 font-['Orbitron'] text-base md:text-lg tracking-widest uppercase transition-all duration-300 hover:scale-105 touch-manipulation"
        >
          {/* Button background */}
          <div
            className="absolute inset-0 rounded transition-all duration-300 group-hover:opacity-100 opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.2) 100%)',
              border: '2px solid rgba(0,255,255,0.6)',
              boxShadow: '0 0 30px rgba(0,255,255,0.3), inset 0 0 30px rgba(0,255,255,0.1)',
            }}
          />

          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: '0 0 50px rgba(0,255,255,0.5), 0 0 100px rgba(255,0,255,0.3)',
            }}
          />

          {/* Button text */}
          <span
            className="relative text-white group-hover:text-cyan-300 transition-colors"
            style={{ textShadow: '0 0 20px rgba(0,255,255,0.8)' }}
          >
            Initialize
          </span>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 group-hover:border-white transition-colors" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-fuchsia-400 group-hover:border-white transition-colors" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-fuchsia-400 group-hover:border-white transition-colors" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 group-hover:border-white transition-colors" />
        </button>

        {/* Instructions */}
        <div className="mt-8 md:mt-12 space-y-2 md:space-y-3 font-['Share_Tech_Mono'] text-xs md:text-sm">
          <div className="text-cyan-600/70">
            <span className="text-cyan-400">[ WASD / Swipe ]</span> Navigate
          </div>
          <div className="text-fuchsia-600/70">
            <span className="text-fuchsia-400">[ SPACE / 2-Touch ]</span> Attack
          </div>
          <div className="text-green-600/70">
            <span className="text-green-400">[ Objective ]</span> Collect data cores. Eliminate threats.
          </div>
        </div>

        {/* Animated scan line */}
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"
          style={{
            top: '30%',
            animation: 'scanline 3s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scanline {
          0%, 100% { top: 10%; opacity: 0; }
          50% { top: 90%; opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
