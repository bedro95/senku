"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Star, ExternalLink, Loader2 } from 'lucide-react';

const HallOfFameTab = () => {
  const [legends, setLegends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHallOfFame = async () => {
    try {
      // جلب العملات الأكثر ربحاً (Top Gainers) في آخر 24 ساعة على سولانا
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs) {
        // ترتيب العملات بناءً على نسبة التغيير في 24 ساعة
        const topPerformers = data.pairs
          .filter((p: any) => p.priceChange.h24 > 0)
          .sort((a: any, b: any) => b.priceChange.h24 - a.priceChange.h24)
          .slice(0, 5) // نأخذ أفضل 5 أساطير
          .map((pair: any, index: number) => ({
            rank: index + 1,
            name: pair.baseToken.name,
            symbol: pair.baseToken.symbol,
            pnl: `+${pair.priceChange.h24.toLocaleString()}%`,
            volume: `$${pair.volume.h24.toLocaleString()}`,
            address: pair.baseToken.address,
            status: index === 0 ? "LEGENDARY" : index < 3 ? "EPIC" : "RARE"
          }));
        
        setLegends(topPerformers);
      }
      setLoading(false);
    } catch (err) {
      console.error("Hall of Fame Connection Error");
    }
  };

  useEffect(() => {
    fetchHallOfFame();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-gradient-to-br from-black via-[#1a1405] to-black border border-yellow-500/20 rounded-[40px] backdrop-blur-3xl relative overflow-hidden shadow-2xl"
    >
      {/* Golden Aura Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-600/5 blur-[100px] rounded-full" />
      
      <div className="text-center mb-12 relative">
        <div className="inline-block p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 mb-4">
           <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-[0.4em] italic drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
          Solana Legends
        </h2>
        <p className="text-yellow-500/40 text-[9px] font-mono mt-2 tracking-[0.5em] uppercase">The Immortal Gainers of the Chain</p>
      </div>

      <div className="space-y-4 relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mb-4" />
              <p className="text-yellow-500/30 font-mono text-[10px] tracking-widest">QUERYING CHAIN ARCHIVES...</p>
            </div>
          ) : (
            legends.map((legend, index) => (
              <motion.div 
                key={legend.address}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(234, 179, 8, 0.03)" }}
                className="flex items-center justify-between p-5 border border-white/5 bg-black/40 rounded-[24px] group transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <span className={`text-2xl font-black italic ${index === 0 ? "text-yellow-400" : "text-white/20"}`}>
                      #{legend.rank}
                    </span>
                    {index === 0 && <Crown className="absolute -top-4 -left-2 w-4 h-4 text-yellow-400 rotate-[-20deg]" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-black text-sm tracking-tight">{legend.name}</p>
                      <span className="text-[9px] text-yellow-500/50 font-mono italic">${legend.symbol}</span>
                    </div>
                    <p className="text-[8px] text-white/20 font-mono mt-1 group-hover:text-white/40 transition-colors">
                      {legend.address.slice(0, 6)}...{legend.address.slice(-4)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-yellow-500 font-black font-mono text-lg leading-none mb-1">{legend.pnl}</p>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[8px] text-white/30 font-mono">VOL: {legend.volume}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-yellow-500 animate-pulse' : 'bg-white/10'}`} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-10 pt-6 border-t border-white/5 text-center">
        <a 
          href="https://solscan.io" 
          target="_blank" 
          className="inline-flex items-center gap-2 text-[9px] font-black font-mono text-yellow-500/40 hover:text-yellow-500 transition-all uppercase tracking-[0.3em] group"
        >
          Verify All Data on Solscan
          <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default HallOfFameTab;
