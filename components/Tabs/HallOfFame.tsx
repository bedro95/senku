"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, ExternalLink, Loader2, Sparkles, Activity, ArrowUpRight, AlertCircle } from 'lucide-react';

/**
 * @project Senku
 * @feature Hall of Fame - Solana Alpha Radar (Production Grade)
 * @engineering High-availability data fetching with mobile-first rendering
 */

const HallOfFameTab = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLiveMemeData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetching high-volume Solana pairs from DexScreener
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        const activeMemes = data.pairs
          .filter((p: any) => p.chainId === 'solana' && p.liquidity?.usd > 1000)
          .sort((a: any, b: any) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0))
          .slice(0, 10)
          .map((pair: any, index: number) => ({
            rank: index + 1,
            name: pair.baseToken.name || 'Unknown Asset',
            symbol: pair.baseToken.symbol || '???',
            price: pair.priceUsd || '0.00',
            change: pair.priceChange?.h24 || 0,
            volume: pair.volume?.h24 ? 
              (pair.volume.h24 > 1000000 ? (pair.volume.h24 / 1000000).toFixed(2) + "M" : (pair.volume.h24 / 1000).toFixed(1) + "K") 
              : "0",
            liquidity: pair.liquidity?.usd ? 
              (pair.liquidity.usd > 1000000 ? (pair.liquidity.usd / 1000000).toFixed(2) + "M" : (pair.liquidity.usd / 1000).toFixed(1) + "K") 
              : "0",
            address: pair.baseToken.address,
            url: pair.url,
            marketCap: pair.fdv ? (pair.fdv / 1000000).toFixed(2) + "M" : "N/A"
          }));
        
        setTokens(activeMemes);
        setError(false);
      } else {
        throw new Error('No pairs found');
      }
    } catch (err) {
      console.error("Senku Pulse Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveMemeData();
    const interval = setInterval(fetchLiveMemeData, 60000); // Refresh every 1 min to avoid rate limits
    return () => clearInterval(interval);
  }, [fetchLiveMemeData]);

  return (
    <div className="w-full min-h-screen overflow-y-auto touch-pan-y pb-44 px-4 font-mono select-none">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center py-12 relative">
        <div className="absolute inset-0 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
           <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-600 to-black rounded-[24px] flex items-center justify-center shadow-[0_10px_40px_rgba(234,179,8,0.2)] mb-4 border border-yellow-500/20">
              <Trophy className="w-8 h-8 text-black" />
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
             Solana Alpha Radar
           </h2>
           <div className="flex items-center gap-2 mt-2 py-1 px-3 bg-yellow-500/10 rounded-full border border-yellow-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-yellow-500 text-[8px] font-black tracking-widest uppercase italic">Live On-Chain Feed</p>
           </div>
        </motion.div>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        <AnimatePresence mode="wait">
          {loading && tokens.length === 0 ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-20"
            >
              <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
              <span className="text-[10px] tracking-[0.4em] text-yellow-500/50 uppercase animate-pulse">Initializing Pulse...</span>
            </motion.div>
          ) : error && tokens.length === 0 ? (
            <motion.div 
              key="error"
              className="p-8 text-center border border-red-500/20 bg-red-500/5 rounded-[30px] backdrop-blur-xl"
            >
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-white text-xs font-bold uppercase mb-4">Signal Lost in Space</p>
              <button 
                onClick={fetchLiveMemeData}
                className="px-6 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-[10px] font-black text-red-500 uppercase"
              >
                Reconnect Signal
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {tokens.map((token, index) => (
                <motion.div 
                  key={token.address}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative overflow-hidden rounded-[28px] border ${index === 0 ? 'border-yellow-500/40 bg-yellow-500/[0.03]' : 'border-white/5 bg-black/40'} p-5 backdrop-blur-3xl group`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border ${index === 0 ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-white/10 bg-white/5'}`}>
                        {index === 0 ? <Crown className="w-6 h-6 text-yellow-500" /> : <Activity className="w-5 h-5 text-white/20" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white truncate">{token.name}</h4>
                          <span className="text-[9px] text-yellow-500 font-bold italic">${token.symbol}</span>
                        </div>
                        <p className="text-[8px] text-white/30 font-bold mt-0.5 tracking-tighter truncate">
                          {token.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                       <p className={`text-sm font-black ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                         {token.change > 0 ? '+' : ''}{token.change}%
                       </p>
                       <p className="text-[10px] text-white/80 font-mono mt-0.5 tracking-tighter">${parseFloat(token.price).toFixed(6)}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.03] pt-4">
                    <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                      <p className="text-[7px] text-white/20 uppercase font-black mb-1">Vol 24h</p>
                      <p className="text-[10px] text-white/70 font-bold">${token.volume}</p>
                    </div>
                    <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                      <p className="text-[7px] text-white/20 uppercase font-black mb-1">Liquidity</p>
                      <p className="text-[10px] text-white/70 font-bold">${token.liquidity}</p>
                    </div>
                    <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                      <p className="text-[7px] text-white/20 uppercase font-black mb-1">M-Cap</p>
                      <p className="text-[10px] text-yellow-500/70 font-bold italic">${token.marketCap}</p>
                    </div>
                  </div>

                  <div className="absolute top-2 right-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <a href={token.url} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="w-4 h-4 text-yellow-500" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center pb-10">
         <Sparkles className="w-5 h-5 text-yellow-500/30 mx-auto mb-2" />
         <p className="text-[7px] font-black tracking-[0.5em] uppercase text-white/20 italic">Neural Market Analysis • Senku Protocol</p>
      </div>
    </div>
  );
};

export default HallOfFameTab;
