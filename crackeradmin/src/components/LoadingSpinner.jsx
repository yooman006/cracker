// components/LoadingSpinner.jsx
import { Package, Sparkles } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main loading animation */}
        <div className="relative mb-12">
          {/* Outer rotating ring */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
            <div 
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-spin"
              style={{ 
                mask: 'linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%)',
                maskComposite: 'intersect'
              }}
            ></div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl animate-pulse">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform -translate-x-1/2 animate-spin origin-center" style={{ transformOrigin: '50% 64px' }}>
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transform -translate-x-1/2 animate-spin origin-center" style={{ transformOrigin: '50% 64px', animationDelay: '0.5s', animationDirection: 'reverse' }}>
              <div className="w-full h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 mr-2 animate-pulse" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Loading Orders
            </h3>
            <Sparkles className="w-6 h-6 text-yellow-400 ml-2 animate-pulse" />
          </div>
          
          <p className="text-white/70 mb-6 leading-relaxed">
            Fetching the latest order data for you...
          </p>

          {/* Progress bar animation */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-60" style={{ animation: 'slide 2s ease-in-out infinite' }}></div>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Floating status indicators */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-3 border border-green-400/30">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-3 border border-blue-400/30">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-3 border border-purple-400/30">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Custom keyframes for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}