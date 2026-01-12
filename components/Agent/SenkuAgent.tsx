"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SenkuAgentProps {
  activeTab: string;
}

const SenkuAgent = ({ activeTab }: SenkuAgentProps) => {
  return (
    <div className="relative group flex flex-col items-center">
      {/* فقاعة كلام عصرية */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeTab}
        className="mb-4 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-[10px] font-mono text-green-400 tracking-wider uppercase shadow-2xl"
      >
        System: {activeTab} <span className="text-white/40">Optimized</span>
      </motion.div>

      {/* نواة الوكيل (Senku Core) */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative w-16 h-16 flex items-center justify-center"
      >
        {/* حلقات الطاقة الخارجية */}
        <div className="absolute inset-0 border-2 border-green-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-2 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        
        {/* النواة المضيئة */}
        <motion.div 
          animate={{ 
            boxShadow: ["0 0 20px rgba(34,197,94,0.2)", "0 0 40px rgba(34,197,94,0.5)", "0 0 20px rgba(34,197,94,0.2)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center relative z-10"
        >
          <div className="w-4 h-4 bg-black rounded-full animate-pulse flex items-center justify-center">
             <div className="w-1 h-1 bg-green-500 rounded-full" />
          </div>
        </motion.div>

        {/* تأثير المسح (Scanner Beam) */}
        <div className="absolute -inset-4 bg-green-500/5 rounded-full blur-xl group-hover:bg-green-500/10 transition-all duration-500" />
      </motion.div>
    </div>
  );
};

export default SenkuAgent;
