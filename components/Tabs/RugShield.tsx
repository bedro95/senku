"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Brain, Download, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';

const RugShieldTab = () => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Helper to convert image URL to Base64 to ensure it renders 
   * correctly in the HTML-to-Image conversion.
   */
  const getBase64Image = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (e) { 
      console.error("Image conversion failed", e);
      return url; 
    }
  };

  /**
   * Main scan function fetching data from DexScreener and RugCheck
   */
  const handleDeepScan = async () => {
    if (!address) return;
    setIsScanning(true);
    try {
      const [dexRes, rugRes] = await Promise.all([
        fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`),
        fetch(`https://api.rugcheck.xyz/v1/tokens/${address}/report`)
      ]);
      
      const dexData = await dexRes.json();
      const rugData = await rugRes.json();
      const pair = dexData.pairs?.[0];

      let safeImage: any = pair?.info?.imageUrl || "";
      if (safeImage) {
        safeImage = await getBase64Image(safeImage);
      }

      setReport({
        name: pair?.baseToken?.name || "Unknown",
        symbol: pair?.baseToken?.symbol || "TOKEN",
        score: rugData.score || 0,
        address: address.slice(0, 6) + "..." + address.slice(-6),
        image: safeImage,
        details: [
          { label: "Bundler Detection", value: rugData.score > 2000 ? "RISKY" : "CLEAN", color: rugData.score > 2000 ? "#ef4444" : "#00FF5F" },
          { label: "Dev Holding", value: `${(rugData.topHolders?.[0]?.pct || 0).toFixed(2)}%`, color: (rugData.topHolders?.[0]?.pct || 0) > 10 ? "#fbbf24" : "#00FF5F" },
          { label: "LP Status", value: pair?.liquidity?.usd > 0 ? "LOCKED" : "RISKY", color: "#00FF5F" },
          { label: "Market Sentiment", value: pair?.info?.socials ? "ACTIVE" : "GHOST", color: "#00E0FF" }
        ]
      });
    } catch (err) { 
      console.error("Scan Error", err); 
    } finally { 
      setIsScanning(false); 
    }
  };

  /**
   * Exports the card as a high-quality PNG image
   */
  const downloadCard = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 3,
        backgroundColor: '#000000',
      });
      const link = document.createElement('a');
      link.download = `Senku-Audit-${report.symbol}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-20 px-4 font-mono">
      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#0A0A0A] border border-[#00FF5F]/20 p-6 rounded-[30px] shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-5 h-5 text-[#00FF5F]" />
                <h2 className="text-white font-black uppercase text-sm tracking-widest">Quantum Audit</h2>
              </div>
              <div className="space-y-3">
                <input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="CONTRACT ADDRESS..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-[#00FF5F] text-[10px] outline-none focus:border-[#00FF5F]/40 transition-all"
                />
                <button 
                  onClick={handleDeepScan} 
                  disabled={isScanning}
                  className="w-full bg-[#00FF5F] text-black rounded-xl py-4 font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,95,0.2)] active:scale-95 transition-transform"
                >
                  {isScanning ? "Analyzing..." : "Initiate Deep Scan"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            
            {/* AUDIT CARD TO EXPORT */}
            <div ref={cardRef} className="relative overflow-hidden rounded-[35px] border border-[#00FF5F]/30 bg-black min-h-[520px] p-6 flex flex-col justify-between">
              
              {/* Dynamic Background Blur */}
              {report.image && (
                <div className="absolute inset-0 z-0">
                  <img src={report.image} className="w-full h-full object-cover opacity-30 blur-[40px] scale-150" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>
              )}

              {/* Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img src={report.image} className="w-12 h-12 rounded-xl border border-[#00FF5F]/30 shadow-2xl" alt="" />
                  <div className="max-w-[140px]">
                    <h3 className="text-xl font-black text-white truncate uppercase">{report.name}</h3>
                    <p className="text-[#00FF5F] text-[8px] font-bold tracking-tighter uppercase">{report.symbol} • {report.address}</p>
                  </div>
                </div>
                <div className="bg-black/80 border border-[#00FF5F]/40 p-3 rounded-xl text-center">
                  <p className="text-[7px] text-[#00FF5F] font-black uppercase mb-1">Risk Score</p>
                  <p className="text-xl font-black text-white">{report.score}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="relative z-10 space-y-3 my-6">
                {report.details.map((item: any, i: number) => (
                  <div key={i} className="bg-black/60 border border-white/5 p-4 rounded-2xl flex justify-between items-center shadow-inner">
                    <span className="text-[9px] text-white/40 uppercase font-bold">{item.label}</span>
                    <span className="text-[10px] font-black" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Footer Logo/Mark */}
              <div className="relative z-10 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] text-white/40 uppercase font-black tracking-widest">Senku Protocol Audit</span>
                <ShieldCheck className="w-4 h-4 text-[#00FF5F]" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={downloadCard} 
                className="bg-[#00FF5F] text-black py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00cc4c] transition-colors"
              >
                <Download className="w-4 h-4" /> Export Card
              </button>
              <button 
                onClick={() => setReport(null)} 
                className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-[#00FF5F]" /> New Scan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RugShieldTab;
