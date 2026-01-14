"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, ChevronRight, TrendingUp, Zap, Target, Waves } from 'lucide-react';

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

        const logs = sortedPairs.slice(1, 12).map((pair: any) => ({ // زدت عدد البيانات لتجربة السكرول
          id: pair.pairAddress,
          platform: pair.dexId.toUpperCase(),
          action: pair.priceChange.m5 > 0 ? "BULLISH ACCUMULATION" : "BEARISH DISTRIBUTION",
          amount: "$" + (pair.volume.m5 > 1000 ? (pair.volume.m5 / 1000).toFixed(1) + "K" : pair.volume.m5.toFixed(0)),
          token: pair.baseToken.symbol,
          color: pair.priceChange.m5 > 0 ? "text-[#00FF5F]" : "text-red-500",
          isHot: pair.volume.m5 > 50000
        }));
        
        setWhaleMovements(logs);
      }
      setLoading(false);
    } catch (err) {
      console.error("Radar Error");
    }
  };

  useEffect(() => {
    fetchLiveRadarData();
    const interval = setInterval(fetchLiveRadarData, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* الحل الجذري للسكرول: إزالة h-screen وإضافة min-h-screen مع overflow-visible */
    <div className="w-full min-h-screen overflow-y-visible touch-pan-y pb-32 px-2 font-mono">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* 📡 THE CORE SONAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#050505] border border-[#00FF5F]/20 rounded-[45px] p-6 md:p-10 relative overflow-hidden shadow-[0_0_100px_rgba(0,255,95,0.05)] min-h-[450px] flex flex-col justify-between"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#00FF5F 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="flex justify-between items-start relative z-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black border border-[#00FF5F]/40 rounded-2xl flex items-center justify-center">
                 <Radio className="w-6 h-6 text-[#00FF5F] animate-bounce" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Senku Radar</h2>
                <p className="text-[#00FF5F] text-[8px] font-bold tracking-[0.3em] uppercase opacity-70">Deep Chain Surveillance</p>
              </div>
            </div>
          </div>

          {/* Sonar Visualization */}
          <div className="relative flex-grow flex items-center justify-center my-8 min-h-[250px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="absolute border border-[#00FF5F]/10 rounded-full" 
                      style={{ width: `${i * 30}%`, height: `${i * 30}%` }} />
               ))}
            </div>
            
            <div className="absolute w-full h-full bg-[conic-gradient(from_0deg,transparent_40%,rgba(0,255,95,0.1)_100%)] animate-[spin_6s_linear_infinite] rounded-full pointer-events-none" />

            <div className="z-10 text-center relative">
              <AnimatePresence mode="wait">
                {!loading ? (
                  <motion.div key={topGainer.name} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <div className="mb-4 inline-flex items-center gap-2 bg-[#00FF5F]/10 border border-[#00FF5F]/30 px-3 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3 text-[#00FF5F]" />
                      <span className="text-[#00FF5F] text-[8px] font-black uppercase">Momentum Peak</span>
                    </div>
                    <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,95,0.3)]">
                      {topGainer.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-center gap-4">
                       <span className="text-white font-black text-sm">${topGainer.volume}</span>
                       <span className={`text-sm font-black ${topGainer.m5 > 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>{topGainer.change}</span>
                    </div>
                  </motion.div>
                ) : (
                   <Activity className="w-10 h-10 text-[#00FF5F] animate-pulse" />
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center pt-4 border-t border-white/5 opacity-50">
             <span className="text-[8px] text-white font-black">SOLANA_MAINNET</span>
             <Target className="w-4 h-4 text-[#00FF5F]" />
          </div>
        </motion.div>

        {/* 📜 THE VOLUME STREAM (Whale Activity) */}
        {/* التعديل هنا: إزالة max-h و overflow-hidden للسماح بالسكرول الطبيعي للجوال */}
        <div className="flex flex-col gap-4 overflow-visible">
          <div className="flex items-center justify-between px-3">
             <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-[#00FF5F]" />
                <h3 className="text-white font-black text-[10px] uppercase tracking-widest">Whale Activity</h3>
             </div>
             <span className="w-2 h-2 rounded-full bg-[#00FF5F] animate-ping" />
          </div>
          
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {whaleMovements.map((move, idx) => (
                <motion.div 
                  key={move.id + idx}
                  layout
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-white/[0.03] border border-white/5 p-5 rounded-[28px] flex justify-between items-center group"
                >
                  <div className="flex flex-col">
                    <span className="text-[7px] text-white/20 font-black uppercase">{move.platform}</span>
                    <span className={`text-[12px] font-black ${move.color}`}>{move.token}</span>
                    <span className="text-[8px] text-white/40 italic truncate max-w-[100px]">{move.action}</span>
                  </div>
                  <div className="text-right">
                    <p className={`text-[12px] font-black ${move.color}`}>{move.amount}</p>
                    <ChevronRight className="w-3 h-3 text-white/20 ml-auto" />
                  </div>
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
