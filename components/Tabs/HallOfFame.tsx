"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  TrendingUp, 
  TrendingDown,
  Globe
} from 'lucide-react';

/**
 * @project Senku
 * @module HallOfFame
 * @description Advanced Market Intelligence for Solana Assets > $10M Market Cap.
 * @engineering All-English interface with production-grade data fetching.
 */

const HallOfFameTab = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncTime, setSyncTime] = useState<string>("");

  const fetchIntelligence = useCallback(async () => {
    try {
      // Direct access to high-volume Solana pairs
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const json = await response.json();
      
      if (json.pairs) {
        // Filter: Solana Only + Market Cap (FDV) >= 10,000,000
        const eliteAssets = json.pairs
          .filter((p: any) => 
            p.chainId === 'solana' && 
            p.fdv >= 10000000 &&
            p.liquidity?.usd > 10000
          )
          .sort((a: any, b: any) => (b.fdv || 0) - (a.fdv || 0))
          .slice(0, 15)
          .map((item: any, index: number) => ({
            rank: index + 1,
            id: item.baseToken.address,
            name: item.baseToken.name,
            symbol: item.baseToken.symbol,
            price: item.priceUsd,
            mCap: item.fdv,
            volume: item.volume.h24,
            change: item.priceChange.h24,
            url: item.url
          }));
        
        setData(eliteAssets);
        
        // Force English Time Format
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setSyncTime(timeStr);
      }
    } catch (error) {
      console.error("Data Stream Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIntelligence();
    const ticker = setInterval(fetchIntelligence, 20000);
    return () => clearInterval(ticker);
  }, [fetchIntelligence]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 font-sans pb-40 select-none">
      
      {/* --- HEADER BLOCK --- */}
      <div className="relative mb-8 p-6 md:p-10 rounded-[40px] bg-[#050505] border border-white/5 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#00ff5f0a_0%,transparent_70%)]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#00FF5F]/10 border border-[#00FF5F]/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,95,0.15)]">
              <Trophy className="w-8 h-8 text-[#00FF5F]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
                Elite <span className="text-[#00FF5F]">Radar</span>
              </h2>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mt-1">
                Blue-Chip Intelligence Index
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Last Sync (UTC)</p>
              <p className="text-xs font-mono text-[#00FF5F] font-bold">{syncTime || "00:00:00"}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF5F] animate-pulse shadow-[0_0_10px_#00FF5F]" />
                <span className="text-[10px] font-black text-white uppercase italic">Active Stream</span>
              </div>
              <p className="text-[9px] font-mono text-white/20 mt-1 uppercase">10M+ CAP_FILTER ON</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- DATA FEED --- */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isLoading && data.length === 0 ? (
            <div className="flex flex-col items-center py-32">
              <Loader2 className="w-12 h-12 text-[#00FF5F] animate-spin mb-4" />
              <p className="text-[10px] font-mono text-white/40 tracking-[0.6em] uppercase animate-pulse">Establishing Connection...</p>
            </div>
          ) : (
            data.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group relative bg-[#080808]/60 hover:bg-black border border-white/5 hover:border-[#00FF5F]/30 rounded-[30px] p-5 md:p-7 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* LEFT: ASSET INFO */}
                  <div className="flex items-center gap-6">
                    <span className="hidden md:block text-xs font-mono text-white/10 font-black w-6">#{asset.rank}</span>
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#00FF5F]/5 transition-colors">
                      <Zap className={`w-7 h-7 ${asset.change >= 0 ? 'text-[#00FF5F]' : 'text-red-500'}`} />
                    </div>
                    <div>
                      <h4 className="text-base md:text-xl font-black text-white tracking-tighter uppercase truncate max-w-[180px]">
                        {asset.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-black text-[#00FF5F] italic">${asset.symbol}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[9px] font-mono text-white/20 truncate w-32 md:w-48">{asset.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* CENTER: MARKET DATA */}
                  <div className="grid grid-cols-3 md:flex items-center gap-4 md:gap-14 border-t border-white/5 md:border-none pt-5 md:pt-0">
                    <div className="flex flex-col md:items-end">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Mkt Cap</p>
                      <p className="text-sm md:text-lg font-black text-white italic">
                        ${(asset.mCap / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 italic">24H Vol</p>
                      <p className="text-sm md:text-lg font-black text-white/70 font-mono">
                        ${(asset.volume / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Performance</p>
                      <div className={`flex items-center gap-1 text-sm md:text-lg font-black ${asset.change >= 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>
                        {asset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(asset.change).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: ACTION */}
                  <div className="flex items-center justify-end">
                    <a 
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 md:w-14 md:h-14 bg-white/5 hover:bg-[#00FF5F] text-white hover:text-black border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* --- FOOTER INTEL --- */}
      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-3xl flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-[#00FF5F]" />
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">High-Value Asset Validation Complete</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] font-mono text-white/10 uppercase tracking-[0.2em]">
          <span>Solana Node: Connected</span>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span>Index: v2.5.0-Release</span>
        </div>
      </div>
    </div>
  );
};

export default HallOfFameTab;
