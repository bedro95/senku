"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, ExternalLink, Loader2, Sparkles, Gem, ArrowUpRight, Activity } from 'lucide-react';

/**
 * @project Senku
 * @feature Live Solana Meme Radar
 * @engineering Real-time DexScreener integration with professional mobile optimization
 */

const HallOfFameTab = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveMemeData = async () => {
    try {
      // Fetching latest Solana pairs with high activity
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs) {
        // Professional Filtering: Volume > 50k & at least some liquidity
        const activeMemes = data.pairs
          .filter((p: any) => p.quoteToken.symbol === 'SOL' && p.liquidity?.usd > 5000)
          .sort((a: any, b: any) => b.volume.h24 - a.volume.h24) // Sort by 24h Volume
          .slice(0, 10)
          .map((pair: any, index: number) => ({
            rank: index + 1,
            name: pair.baseToken.name,
            symbol: pair.baseToken.symbol,
            price: pair.priceUsd,
            change: pair.priceChange.h24,
            volume: pair.volume.h24 > 1000000 ? (pair.volume.h24 / 1000000).toFixed(1) + "M" : (pair.volume.h24 / 1000).toFixed(0) + "K",
            liquidity: pair.liquidity.usd > 1000000 ? (pair.liquidity.usd / 1000000).toFixed(1) + "M" : (pair.liquidity.usd / 1000).toFixed(0) + "K",
            address: pair.baseToken.address,
            url: pair.url,
            marketCap: pair.fdv ? (pair.fdv / 1000000).toFixed(1) + "M" : "N/A"
          }));
        
        setTokens(activeMemes);
      }
      setLoading(false);
    } catch (err) {
      console.error("Pulse Link Failed");
    }
  };

  useEffect(() => {
    fetchLiveMemeData();
    const interval = setInterval(fetchLiveMemeData, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-y-auto touch-pan-y pb-44 md:pb-20 px-4 font-mono">
      
      {/* --- LIVE RADAR HEADER --- */}
      <div className="text-center py-10 md:py-16 relative">
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-yellow-500/5 blur-[100px] rounded-full" 
        />
        
        <div className="relative z-10 flex flex-col items-center">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 via-yellow-600 to-black rounded-[24px] md:rounded-[30px] flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.3)] mb-4 md:mb-6">
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-black" />
           </div>
           <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
             Solana Alpha Radar
           </h2>
           <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-yellow-500/60 text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase">Live On-Chain Stream</p>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center py-20 opacity-30">
              <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mb-4" />
              <span className="text-[8px] tracking-[0.5em] uppercase text-white">Syncing Neural Link...</span>
            </div>
          ) : (
            tokens.map((token, index) => (
              <motion.div 
                key={token.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-[24px] md:rounded-[35px] border ${index === 0 ? 'border-yellow-500/30 bg-yellow-500/[0.02]' : 'border-white/5 bg-black/40'} p-5 md:p-8 backdrop-blur-xl transition-all hover:bg-white/[0.02]`}
              >
                {/* Mobile Rank Badge */}
                <div className="absolute top-0 right-0 px-4 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-black rounded-bl-xl md:hidden">
                  #{token.rank}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="relative flex-shrink-0">
                       <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center border ${index === 0 ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-white/5'}`}>
                          {index === 0 ? <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" /> : <Activity className="w-5 h-5 md:w-6 md:h-6 text-white/20" />}
                       </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base md:text-xl font-black text-white truncate">{token.name}</h4>
                        <span className="text-[10px] text-yellow-500/80 font-bold italic">${token.symbol}</span>
                      </div>
                      <p className="text-[9px] text-white/30 font-bold mt-1 tracking-tighter truncate opacity-0 group-hover:opacity-100 transition-opacity">
                        {token.address}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 md:flex md:items-center gap-4 md:gap-8 border-t border-white/5 md:border-none pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                       <p className="text-[8px] text-white/20 font-black uppercase mb-1">Price</p>
                       <p className="text-[11px] md:text-sm font-bold text-white">${parseFloat(token.price).toFixed(6)}</p>
                    </div>
                    <div className="text-left md:text-right">
                       <p className="text-[8px] text-white/20 font-black uppercase mb-1">24h %</p>
                       <p className={`text-[11px] md:text-sm font-bold ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                         {token.change > 0 ? '+' : ''}{token.change}%
                       </p>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] text-white/20 font-black uppercase mb-1">M-Cap</p>
                       <p className="text-[11px] md:text-sm font-bold text-yellow-500 italic">${token.marketCap}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center border-t border-white/[0.02] pt-4">
                   <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-white/20 uppercase font-black">Liquidity</span>
                        <span className="text-[9px] text-white/60 font-bold">${token.liquidity}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] text-white/20 uppercase font-black">Volume 24h</span>
                        <span className="text-[9px] text-white/60 font-bold">${token.volume}</span>
                      </div>
                   </div>
                   <a href={token.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[9px] font-black text-yellow-500 uppercase hover:text-white transition-colors">
                      Live Chart <ArrowUpRight className="w-3 h-3" />
                   </a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 text-center opacity-20">
         <Sparkles className="w-5 h-5 text-yellow-500 mx-auto mb-2 animate-pulse" />
         <p className="text-[7px] font-black tracking-[0.5em] uppercase text-white">Neural Market Analysis • Senku Protocol</p>
      </div>
    </div>
  );
};

export default HallOfFameTab;
