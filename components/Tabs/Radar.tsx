"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, ChevronRight } from 'lucide-react';

const RadarTab = () => {
  const [topGainer, setTopGainer] = useState({ name: "LOADING", volume: "0", change: "0%" });
  const [whaleMovements, setWhaleMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب بيانات حقيقية من Solana Tokens
  const fetchLiveRadarData = async () => {
    try {
      // جلب أكثر الأزواج نشاطاً في آخر ساعة على سولانا
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        // ترتيب حسب الفوليوم في آخر ساعة
        const sortedPairs = data.pairs.sort((a: any, b: any) => b.volume.h1 - a.volume.h1);
        
        // العملة المركزية (الأكثر تجميعاً)
        const leader = sortedPairs[0];
        setTopGainer({
          name: leader.baseToken.symbol,
          volume: leader.volume.h24 > 1000000 ? (leader.volume.h24 / 1000000).toFixed(1) + "M" : (leader.volume.h24 / 1000).toFixed(1) + "K",
          change: leader.priceChange.h1 > 0 ? `+${leader.priceChange.h1}%` : `${leader.priceChange.h1}%`
        });

        // تحويل باقي الأزواج إلى "Whale Logs" (حركات سيولة حقيقية)
        const logs = sortedPairs.slice(1, 6).map((pair: any) => ({
          id: pair.pairAddress,
          wallet: pair.dexId.toUpperCase(), // إظهار اسم المنصة كمصدر
          action: pair.priceChange.m5 > 0 ? "ACCUMULATING" : "DISTRIBUTING",
          amount: "$" + (pair.volume.m5 > 1000 ? (pair.volume.m5 / 1000).toFixed(1) + "K" : pair.volume.m5.toFixed(0)),
          token: pair.baseToken.symbol,
          color: pair.priceChange.m5 > 0 ? "text-[#14F195]" : "text-red-400"
        }));
        
        setWhaleMovements(logs);
      }
      setLoading(false);
    } catch (err) {
      console.error("Radar Link Error");
    }
  };

  useEffect(() => {
    fetchLiveRadarData();
    const interval = setInterval(fetchLiveRadarData, 10000); // تحديث كل 10 ثوانٍ
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2">
      
      {/* 📡 MAIN RADAR CORE */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-2 bg-black/60 border border-[#14F195]/20 rounded-[40px] p-8 relative overflow-hidden backdrop-blur-3xl shadow-[0_0_80px_rgba(20,241,149,0.05)]"
      >
        <div className="flex justify-between items-center mb-10 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#14F195]/10 rounded-xl flex items-center justify-center border border-[#14F195]/20">
               <Radio className="w-5 h-5 text-[#14F195] animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-widest uppercase italic">Live Signal Radar</h2>
              <p className="text-[#14F195]/40 text-[8px] font-mono tracking-[0.4em]">SCANNING SOLANA MAINNET POOLS</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/40 border border-white/5 px-4 py-1.5 rounded-full">
             <div className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-ping" />
             <span className="text-[9px] font-mono text-white/60 tracking-widest">REAL-TIME DATA</span>
          </div>
        </div>

        {/* Radar Visuals */}
        <div className="relative h-72 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
             {[1, 2, 3].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 0.1, scale: 1 }}
                 transition={{ delay: i * 0.2 }}
                 className="absolute border border-[#14F195] rounded-full" 
                 style={{ width: `${i * 33}%`, height: `${i * 33}%` }}
               />
             ))}
          </div>
          
          {/* Sweeping Effect */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(20,241,149,0.1)_100%)] animate-[spin_4s_linear_infinite] rounded-full" />

          {/* Central Target Info */}
          <div className="z-10 text-center">
            <AnimatePresence mode="wait">
              {!loading ? (
                <motion.div
                  key={topGainer.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  <p className="text-[#14F195] text-[9px] uppercase font-black tracking-[0.5em] mb-2">High Activity</p>
                  <h3 className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    {topGainer.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <span className="text-white/40 font-mono text-xs italic">${topGainer.volume} VOL</span>
                    <span className="bg-[#14F195] text-black text-[10px] px-3 py-1 font-black rounded-lg shadow-lg shadow-[#14F195]/20">
                      {topGainer.change}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <Activity className="w-12 h-12 text-[#14F195]/20 animate-spin" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 📜 WHALE LOGS SIDEBAR */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">Volume Spikes</h3>
           <div className="h-px flex-grow mx-4 bg-white/5" />
        </div>
        
        <AnimatePresence mode="popLayout">
          {whaleMovements.map((move) => (
            <motion.div 
              key={move.id}
              layout
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/[0.05] transition-all cursor-crosshair"
            >
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${move.color} opacity-40 group-hover:opacity-100 transition-all`} />
                <div>
                  <p className="text-[8px] text-white/20 font-mono uppercase">{move.wallet}</p>
                  <p className="text-white text-[11px] font-bold tracking-tight">
                    {move.action} <span className={move.color}>{move.token}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[11px] font-black font-mono ${move.color}`}>{move.amount}</p>
                <ChevronRight className="w-3 h-3 text-white/10 ml-auto" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RadarTab;
