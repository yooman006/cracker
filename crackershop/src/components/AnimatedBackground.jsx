import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const AnimatedBackground = ({ isMobile }) => {
  const [crackers, setCrackers] = useState([]);

  // Create cracker animation effect
  useEffect(() => {
    const createCracker = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
      const newCracker = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: colors[Math.floor(Math.random() * colors.length)], 
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4,
        life: 100
      };
      return newCracker;
    };

    const maxCrackers = isMobile ? 8 : 15;
    const interval = setInterval(() => {
      setCrackers(prev => {
        const newCrackers = prev
          .map(cracker => ({
            ...cracker,
            x: cracker.x + cracker.speedX,
            y: cracker.y + cracker.speedY,
            life: cracker.life - 1
          }))
          .filter(cracker => cracker.life > 0);

        if (newCrackers.length < maxCrackers) {
          newCrackers.push(createCracker());
        }

        return newCrackers;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <>
      {/* Animated Cracker Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {crackers.map(cracker => (
          <div
            key={cracker.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${cracker.x}px`,
              top: `${cracker.y}px`,
              width: `${cracker.size}px`,
              height: `${cracker.size}px`,
              backgroundColor: cracker.color,
              opacity: cracker.life / 100,
              boxShadow: `0 0 ${cracker.size * 2}px ${cracker.color}`,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="h-2 w-2 xs:h-3 xs:w-3 sm:h-4 sm:w-4 text-yellow-400 opacity-70" />
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimatedBackground;