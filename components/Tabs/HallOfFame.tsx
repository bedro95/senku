"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Star, ExternalLink, Loader2, Sparkles, Gem } from 'lucide-react';

/**
 * @project Senku
 * @feature Hall of Fame - The Golden Pantheon of Solana
 * @engineering Professional grade scrolling & live blockchain data integration
 */

const HallOfFameTab = () => {
  const [legends, setLegends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHallOfFame = async () => {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs) {
        // Advanced Filtering: High liquidity & 24h performance
        const topPerformers = data.pairs
          .filter((p: any) => p.priceChange.h24 > 0 && p.liquidity?.usd > 10000)
          .sort((a: any, b: any) => b.priceChange.h24 - a.priceChange.h24)
          .slice(0, 10)
          .map((pair: any, index: number) => ({
            rank: index + 1,
            name: pair.baseToken.name,
            symbol: pair.baseToken.symbol,
            pnl: pair.priceChange.h24.toFixed(0),
            multiplier: (pair.priceChange.h24 / 100 + 1).toFixed(1),
            volume: pair.volume.h24 > 1000000 ? (pair.volume.h24 / 1000000).toFixed(1) + "M" : (pair.volume.h24 / 1000).toFixed(0) + "K",
            address: pair.baseToken.address,
            liquidity: pair.liquidity.usd.toLocaleString(),
            tier: index === 0 ? "DIVINE" : index < 3 ? "ASCENDED" : "IMMORTAL"
          }));
        
        setLegends(topPerformers);
      }
      setLoading(false);
    } catch (err) {
      console.error("Archive Access Denied");
    }
  };

  useEffect(() => {
    fetchHallOfFame();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-y-auto touch-pan-y pb-40 px-4 font-mono">
      
      {/* --- PANTHEON HEADER --- */}
      <div className="text-center py-16 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-yellow-500/10 blur-[120px] rounded-full" 
        />
        
        <div className="relative z-10 flex flex-col items-center">
           <div className="w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-[30px] flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)] mb-6">
              <Trophy className="w-10 h-10 text-black" />
           </div>
           <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
             The Immortal Hall
           </h2>
           <p className="text-yellow-500/50 text-[10px] font-black tracking-[0.5em] uppercase">Solana High-Yield Archives</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center py-20 opacity-20">
              <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
              <span className="text-[9px] tracking-[1em]">DECRYPTING...</span>
            </div>
          ) : (
            legends.map((legend, index) => (
              <motion.div 
                key={legend.address}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-[35px] border ${index === 0 ? 'border-yellow-500/40 bg-yellow-500/[0.03]' : 'border-white/5 bg-[#080808]'} p-6 md:p-8 transition-all hover:border-yellow-500/60`}
              >
                {/* Visual Rank Background */}
                <span className="absolute -right-4 -bottom-4 text-[120px] font-black text-white/[0.02] italic pointer-events-none group-hover:text-yellow-500/[0.04] transition-colors">
                  #{legend.rank}
                </span>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${index === 0 ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-black'}`}>
                          {index === 0 ? <Crown className="w-8 h-8 text-yellow-500" /> : <Gem className="w-6 h-6 text-white/20" />}
                       </div>
                       {index < 3 && <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -inset-2 border border-dashed border-yellow-500/20 rounded-full" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black text-white tracking-tighter">{legend.name}</h4>
                        <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] text-white/40 font-bold tracking-widest uppercase">{legend.tier}</span>
                      </div>
                      <p className="text-yellow-500/40 text-[10px] font-bold mt-1 tracking-widest italic">${legend.symbol} • {legend.address.slice(0, 10)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 border-t border-white/5 md:border-none pt-4 md:pt-0">
                    <div className="text-right">
                       <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Growth</p>
                       <p className="text-2xl font-black text-yellow-500">+{legend.pnl}%</p>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
                    <div className="text-right min-w-[80px]">
                       <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Multiplier</p>
                       <p className="text-xl font-black text-white italic">{legend.multiplier}X</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-4">
                      <div className="text-[8px] text-white/30 font-bold uppercase tracking-widest">Liq: ${legend.liquidity}</div>
                      <div className="text-[8px] text-white/30 font-bold uppercase tracking-widest">Vol: ${legend.volume}</div>
                   </div>
                   <a href={`https://solscan.io/token/${legend.address}`} target="_blank" className="flex items-center gap-2 text-[9px] font-black text-yellow-500 uppercase tracking-widest">
                      View Relic <ExternalLink className="w-3 h-3" />
                   </a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-20 text-center opacity-30">
         <Sparkles className="w-6 h-6 text-yellow-500 mx-auto mb-4 animate-pulse" />
         <p className="text-[8px] font-black tracking-[0.8em] uppercase">The Science of Wealth • Senku Protocol</p>
      </div>
    </div>
  );
};

export default HallOfFameTab;
