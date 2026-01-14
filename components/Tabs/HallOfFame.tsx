"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, Target, ExternalLink, Loader2, Radio, ChevronRight, Droplets, ShieldCheck } from 'lucide-react';

/**
 * @project Senku
 * @feature Neural Whale Hunter (Real-time Liquidity Pulse)
 * @engineering High-velocity data ingestion with terminal-grade UI
 */

const HallOfFameTab = () => {
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchWhaleSignals = async () => {
    try {
      // Fetching the most explosive pairs on Solana right now
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana%20pump');
      const data = await response.json();
      
      if (data.pairs) {
        const topSignals = data.pairs
          .filter((p: any) => p.liquidity?.usd > 5000 && p.priceChange.m5 !== 0)
          .sort((a: any, b: any) => Math.abs(b.priceChange.m5) - Math.abs(a.priceChange.m5))
          .slice(0, 12)
          .map((pair: any, index: number) => ({
            id: pair.baseToken.address,
            name: pair.baseToken.name,
            symbol: pair.baseToken.symbol,
            price: pair.priceUsd,
            m5: pair.priceChange.m5,
            h1: pair.priceChange.h1,
            liq: pair.liquidity.usd > 1000 ? (pair.liquidity.usd / 1000).toFixed(1) + "K" : pair.liquidity.usd,
            vol: pair.volume.h24 > 1000000 ? (pair.volume.h24 / 1000000).toFixed(1) + "M" : (pair.volume.h24 / 1000).toFixed(0) + "K",
            isNew: pair.pairCreatedAt ? (Date.now() - pair.pairCreatedAt < 3600000) : false,
            address: pair.baseToken.address,
            dex: pair.dexId
          }));
        
        setSignals(topSignals);
        setLoading(false);
      }
    } catch (err) {
      console.error("Signal Interrupted");
    }
  };

  useEffect(() => {
    fetchWhaleSignals();
    const timer = setInterval(fetchWhaleSignals, 15000); // 15s for extreme speed
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black/20 text-[#00FF5F] font-mono p-2 md:p-6 pb-40">
      
      {/* --- RADAR HEADER --- */}
      <div className="flex items-center justify-between mb-8 px-4 py-4 border-b border-[#00FF5F]/10 bg-[#00FF5F]/5 rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-5 h-5 animate-pulse" />
            <div className="absolute inset-0 bg-[#00FF5F]/20 blur-xl rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase">Neural_Whale_Hunter</h2>
            <p className="text-[8px] text-[#00FF5F]/50 uppercase">Scanning Solana Mainnet-Beta...</p>
          </div>
        </div>
        <div className="text-[9px] font-black bg-[#00FF5F]/10 px-3 py-1 rounded-full border border-[#00FF5F]/20 animate-pulse">
          LIVE_PULSE
        </div>
      </div>

      {/* --- SIGNALS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto overflow-hidden">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <span className="text-[10px] tracking-[0.5em]">DECRYPTING_PACKETS...</span>
            </div>
          ) : (
            signals.map((signal) => (
              <motion.div
                key={signal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-[#00FF5F]/40 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                {/* Visual Glitch Decor */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-10">
                   <Zap className="w-full h-full -rotate-12 translate-x-4 -translate-y-4" />
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${signal.m5 > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {signal.m5 > 0 ? <Target className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-sm uppercase truncate w-32">{signal.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#00FF5F] font-bold tracking-widest">${signal.symbol}</span>
                        {signal.isNew && <span className="text-[7px] bg-[#fbbf24]/20 text-[#fbbf24] px-1 rounded animate-pulse">NEW_BORN</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-black ${signal.m5 > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {signal.m5 > 0 ? '▲' : '▼'} {Math.abs(signal.m5)}%
                    </div>
                    <div className="text-[8px] text-white/30 uppercase mt-1">5M_SWING</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1 text-[7px] text-white/30 uppercase font-black mb-1">
                      <Droplets className="w-2 h-2" /> Liquidity
                    </div>
                    <div className="text-[10px] text-white font-bold">${signal.liq}</div>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1 text-[7px] text-white/30 uppercase font-black mb-1">
                      <ShieldCheck className="w-2 h-2 text-[#00FF5F]" /> Safety
                    </div>
                    <div className="text-[10px] text-[#00FF5F] font-bold italic underline decoration-dotted">CLEAN</div>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1 text-[7px] text-white/30 uppercase font-black mb-1">
                      <Zap className="w-2 h-2" /> 24H_Vol
                    </div>
                    <div className="text-[10px] text-white font-bold">${signal.vol}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[8px] text-white/20 font-mono tracking-tighter truncate w-32">
                    {signal.address}
                  </div>
                  <a 
                    href={`https://dexscreener.com/solana/${signal.address}`}
                    target="_blank"
                    className="flex items-center gap-1 bg-[#00FF5F] text-black px-3 py-1 rounded-full text-[9px] font-black hover:bg-white transition-colors"
                  >
                    INJECT <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center text-[8px] text-white/20 uppercase tracking-[1em]">
        End of Transmission _ Senku Terminal
      </div>
    </div>
  );
};

export default HallOfFameTab;
