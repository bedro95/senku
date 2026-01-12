import React from 'react';
import { motion } from 'framer-motion';

const RadarTab = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-black/40 border border-green-500/30 rounded-lg backdrop-blur-md"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <h2 className="text-xl font-bold text-green-400 uppercase tracking-widest">
          Senku Radar System
        </h2>
      </div>
      
      <div className="relative w-full h-64 border border-green-900 rounded-full flex items-center justify-center overflow-hidden">
        {/* Radar Sweep Animation */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,197,94,0.2)_100%)] animate-[spin_4s_linear_infinite]" />
        <p className="text-green-500/50 text-xs z-10">SCANNING FOR THREATS...</p>
      </div>
    </motion.div>
  );
};

export default RadarTab;
