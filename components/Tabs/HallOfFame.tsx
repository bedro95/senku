import React from 'react';
import { motion } from 'framer-motion';

const HallOfFameTab = () => {
  // بيانات حقيقية تحاكي كبار المتداولين على سولانا
  const topLegends = [
    { 
      rank: 1, 
      address: "6p6W...5YtZ", 
      label: "Whale Master", 
      pnl: "+12,450 SOL", 
      status: "Legendary" 
    },
    { 
      rank: 2, 
      address: "4jK2...m9Qp", 
      label: "Early Sniper", 
      pnl: "+8,120 SOL", 
      status: "Epic" 
    },
    { 
      rank: 3, 
      address: "8vR9...w2Xn", 
      label: "Solana OG", 
      pnl: "+5,300 SOL", 
      status: "Rare" 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-gradient-to-br from-black to-yellow-950/20 border border-yellow-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden"
    >
      {/* تأثير خلفية ذهبية */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full" />
      
      <div className="text-center mb-8 relative">
        <h2 className="text-2xl font-black text-yellow-500 uppercase tracking-[0.3em] italic">
          Solana Legends
        </h2>
        <p className="text-yellow-700 text-[10px] font-mono mt-1">THE HALL OF IMMORTAL TRADERS</p>
      </div>

      <div className="space-y-4 relative z-10">
        {topLegends.map((legend, index) => (
          <motion.div 
            key={index}
            whileHover={{ x: 10, backgroundColor: "rgba(234, 179, 8, 0.05)" }}
            className="flex items-center justify-between p-4 border border-yellow-500/10 bg-black/40 rounded-xl transition-all"
          >
            <div className="flex items-center space-x-4">
              <span className={`text-xl font-black ${index === 0 ? "text-yellow-400" : "text-yellow-700"}`}>
                #{legend.rank}
              </span>
              <div>
                <p className="text-white font-mono text-sm">{legend.label}</p>
                <p className="text-[10px] text-gray-500 font-mono">{legend.address}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-yellow-500 font-bold font-mono text-sm">{legend.pnl}</p>
              <span className="text-[9px] uppercase px-2 py-0.5 border border-yellow-500/20 rounded text-yellow-600">
                {legend.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-yellow-500/10 text-center">
        <button className="text-[10px] font-mono text-yellow-700 hover:text-yellow-500 transition-colors uppercase tracking-widest">
          View All Chain Records on Solscan ↗
        </button>
      </div>
    </motion.div>
  );
};

export default HallOfFameTab;
