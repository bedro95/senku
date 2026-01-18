"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HologramAvatar() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[80]">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Hologram Core Image */}
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <img 
            src="/senku.png" 
            alt="Senku Hologram"
            className="w-full h-full object-contain opacity-80 filter drop-shadow-[0_0_20px_rgba(0,255,204,0.5)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
          
          {/* Glitch Overlay Effect */}
          <motion.div 
            animate={{ 
              opacity: [0, 0.2, 0, 0.1, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-[#00FFCC]/20 mix-blend-overlay pointer-events-none"
          />

          {/* Scan Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="w-full h-[200%] bg-[linear-gradient(0deg,transparent_0%,rgba(0,255,204,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_10s_linear_infinite]" />
          </div>

          {/* Neon Glow Rings */}
          <div className="absolute inset-0 border-4 border-[#00FFCC]/10 rounded-full animate-pulse scale-110" />
          <div className="absolute inset-0 border-2 border-[#00E0FF]/5 rounded-full animate-pulse delay-75 scale-125" />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes scan {
          from { transform: translateY(-50%); }
          to { transform: translateY(0%); }
        }
      `}</style>
    </div>
  );
}
