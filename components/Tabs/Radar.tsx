"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, ChevronRight, TrendingUp, Zap, Target, Waves, Disc } from 'lucide-react';

const RadarTab = () => {
  const [topGainer, setTopGainer] = useState({ name: "LOADING", volume: "0", change: "0%", m5: 0 });
  const [whaleMovements, setWhaleMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveRadarData = async () => {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        const sortedPairs = data.pairs.sort((a: any, b: any) => b.volume.h1 - a.volume.h1);
        const leader = sortedPairs[0];
        
        setTopGainer({
          name: leader.baseToken.symbol,
          volume: leader.volume.h24 > 1000000 ? (leader.volume.h24 / 1000000).toFixed(1) + "M" : (leader.volume.h24 / 1000).toFixed(1) + "K",
          change: leader.priceChange.h1 > 0 ? `+${leader.priceChange.h1}%` : `${leader.priceChange.h1}%`,
          m5: leader.priceChange.m5 || 0
        });

        const logs = sortedPairs.slice(1, 15).map((pair: any) => ({
          id: pair.pairAddress,
          platform: pair.dexId.toUpperCase(),
          action: pair.priceChange.m5 > 0 ? "BULLISH" : "BEARISH",
          amount: "$" + (pair.volume.m5 > 1000 ? (pair.volume.m5 / 1000).toFixed(1) + "K" : pair.volume.m5.toFixed(0)),
          token: pair.baseToken.symbol,
          color: pair.priceChange.m5 > 0 ? "#00FF5F" : "#ef4444",
          isHot: pair.volume.m5 > 20000
        }));
        
        setWhaleMovements(logs);
      }
      setLoading(false);
    } catch (err) { console.error("Signal Lost"); }
  };

  useEffect(() => {
    fetchLiveRadarData();
    const interval = setInterval(fetchLiveRadarData, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen touch-pan-y pb-40 px-3 font-mono">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* 🪐 THE NEON CORE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 relative min-h-[550px] rounded-[50px] border border-[#00FF5F]/10 bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-8 shadow-[inset_0_0_60px_rgba(0,255,95,0.02)]"
        >
          {/* Animated Orbitals */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,255,95,0.05)_0%,transparent_70%)]" />
             <motion.div 
               animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#00FF5F]/5 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-[#00FF5F]/10 rounded-full border-dashed"
             />
          </div>

          {/* Central Target Data */}
          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {!loading ? (
                <motion.div
                  key={topGainer.name}
                  initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(20px)", scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="bg-black/40 backdrop-blur-xl border border-[#00FF5F]/20 px-6 py-2 rounded-full inline-flex items-center gap-3 mb-8">
                     <div className="w-2 h-2 rounded-full bg-[#00FF5F] animate-ping" />
                     <span className="text-[#00FF5F] text-[10px] font-black tracking-[0.4em] uppercase">Hyper Activity</span>
                  </div>
                  
                  <h3 className="text-[100px] md:text-[140px] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    {topGainer.name}
                  </h3>
                  
                  <div className="mt-12 flex items-center justify-center gap-12">
                     <div className="text-center">
                        <p className="text-white/20 text-[9px] uppercase tracking-widest mb-2 font-bold">Volume 24H</p>
                        <p className="text-white text-3xl font-black">${topGainer.volume}</p>
                     </div>
                     <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#00FF5F]/20 to-transparent" />
                     <div className="text-center">
                        <p className="text-white/20 text-[9px] uppercase tracking-widest mb-2 font-bold">Momentum</p>
                        <p className={`text-3xl font-black ${topGainer.m5 > 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>{topGainer.change}</p>
                     </div>
                  </div>
                </motion.div>
              ) : (
                <Disc className="w-16 h-16 text-[#00FF5F] animate-spin opacity-20" />
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 flex gap-3 opacity-30">
             <div className="w-10 h-[2px] bg-[#00FF5F]" />
             <div className="w-20 h-[2px] bg-[#00FF5F]/20" />
             <div className="w-10 h-[2px] bg-[#00FF5F]" />
          </div>
        </motion.div>

        {/* 🚀 THE FLOW STREAM */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4">
             <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Live Pulse</h3>
             <Activity className="w-4 h-4 text-[#00FF5F] opacity-40" />
          </div>
          
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {whaleMovements.map((move, idx) => (
                <motion.div 
                  key={move.id + idx}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-[32px] hover:bg-[#00FF5F]/5 hover:border-[#00FF5F]/20 transition-all duration-500"
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[7px] text-white/30 font-black uppercase tracking-tighter px-1.5 py-0.5 bg-white/5 rounded-md">{move.platform}</span>
                        {move.isHot && <span className="text-[7px] text-black font-black uppercase bg-[#00FF5F] px-1.5 py-0.5 rounded-md animate-pulse">Hot</span>}
                      </div>
                      <h4 className="text-white text-xl font-black tracking-tighter group-hover:scale-110 transition-transform origin-left">{move.token}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black" style={{ color: move.color }}>{move.amount}</p>
                      <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{move.action}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 bottom-0 h-1 bg-[#00FF5F]/0 group-hover:bg-[#00FF5F] transition-all duration-700 rounded-full" style={{ width: '30%' }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarTab;
