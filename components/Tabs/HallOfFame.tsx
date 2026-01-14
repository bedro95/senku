"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3, 
  Loader2, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

/**
 * @project Senku
 * @module HallOfFame
 * @description High-performance Solana token radar for assets > $10M Market Cap.
 * @version 2.5.0
 */

const HallOfFameTab = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchMarketIntelligence = useCallback(async () => {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const json = await response.json();
      
      if (json.pairs) {
        // Filter: Solana chain + FDV > 10,000,000 + Valid Liquidity
        const eliteAssets = json.pairs
          .filter((p: any) => 
            p.chainId === 'solana' && 
            p.fdv >= 10000000 && 
            p.liquidity?.usd > 50000
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
            liq: item.liquidity.usd,
            url: item.url
          }));
        
        setData(eliteAssets);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Critical: Data Ingestion Failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketIntelligence();
    const ticker = setInterval(fetchMarketIntelligence, 20000);
    return () => clearInterval(ticker);
  }, [fetchMarketIntelligence]);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-0 font-sans pb-32">
      
      {/* --- ELITE INTERFACE HEADER --- */}
      <div className="relative mb-8 p-6 md:p-8 rounded-[35px] bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Trophy className="w-32 h-32 text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#00FF5F]/10 border border-[#00FF5F]/20 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,95,0.1)]">
              <Zap className="w-7 h-7 text-[#00FF5F]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
                Elite <span className="text-[#00FF5F]">Archive</span>
              </h2>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mt-1">
                Real-time 10M+ Market Cap Index
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-[9px] font-bold text-white/20 uppercase">Network Stability</p>
              <p className="text-[11px] font-mono text-[#00FF5F]">UPTIME 99.9%</p>
            </div>
            <div className="h-10 w-[1px] bg-white/5 hidden md:block" />
            <div className="flex flex-col md:items-end">
              <span className="flex items-center gap-2 text-[10px] font-bold text-[#00FF5F] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF5F] animate-ping" />
                Live Syncing
              </span>
              <span className="text-[9px] font-mono text-white/20 mt-1">LAST_UPDATE: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- TERMINAL FEED --- */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-10 h-10 text-[#00FF5F] animate-spin mb-4" />
              <p className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase">Decrypting Market Data...</p>
            </div>
          ) : (
            data.map((asset) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-[#0a0a0a]/60 hover:bg-[#0f0f0f]/80 border border-white/5 hover:border-[#00FF5F]/30 rounded-[28px] p-4 md:p-6 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* TOKEN IDENTITY */}
                  <div className="flex items-center gap-5">
                    <div className="text-xs font-mono text-white/10 w-4 font-black">#{asset.rank}</div>
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Activity className={`w-6 h-6 ${asset.change >= 0 ? 'text-[#00FF5F]' : 'text-red-500'}`} />
                      </div>
                      {asset.change > 20 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF5F] rounded-full shadow-[0_0_10px_#00FF5F]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-lg font-black text-white tracking-tight uppercase truncate max-w-[140px] md:max-w-none">
                        {asset.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#00FF5F] tracking-tighter">${asset.symbol}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[9px] font-mono text-white/20 truncate w-24 md:w-auto">{asset.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* MARKET METRICS */}
                  <div className="grid grid-cols-3 md:flex items-center gap-4 md:gap-12 border-t border-white/5 md:border-none pt-4 md:pt-0">
                    <div className="flex flex-col md:items-end">
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Market Cap</p>
                      <p className="text-xs md:text-sm font-black text-white italic">
                        ${(asset.mCap / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">24H Volume</p>
                      <p className="text-xs md:text-sm font-black text-white/70 font-mono">
                        ${(asset.volume / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Status</p>
                      <div className={`flex items-center gap-1 text-[11px] md:text-sm font-black ${asset.change >= 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>
                        {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(asset.change).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* INTERFACE ACTION */}
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <div className="md:hidden text-[9px] font-mono text-white/20">LIQ: ${(asset.liq / 1000000).toFixed(2)}M</div>
                    <a 
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-[#00FF5F] text-white hover:text-black border border-white/10 rounded-xl transition-all shadow-lg"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* --- FOOTER INTEL --- */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 px-5 py-2 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-[#00FF5F]" />
          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Verified High-Velocity Data Stream</span>
        </div>
        <div className="flex items-center gap-4 text-[8px] font-mono text-white/10 uppercase tracking-widest">
          <span>Solana Mainnet</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>Senku Lab Index v2.5</span>
        </div>
      </div>
    </div>
  );
};

export default HallOfFameTab;
