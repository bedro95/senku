"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Brain, Download, RotateCcw, Fingerprint, Users, ShieldAlert } from 'lucide-react';
import { toPng } from 'html-to-image';

const RugShieldTab = () => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة لتحويل رابط الصورة إلى Base64 لتجنب مشاكل الـ CORS تماماً
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
      return url; // العودة للرابط الأصلي في حال فشل التحويل
    }
  };

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
          { label: "Dev Holding", value: `${rugData.topHolders?.[0]?.pct || 0}%`, color: (rugData.topHolders?.[0]?.pct || 0) > 10 ? "#fbbf24" : "#00FF5F" },
          { label: "LP Status", value: pair?.liquidity?.usd > 0 ? "LOCKED" : "RISKY", color: "#00FF5F" },
          { label: "Market Sentiment", value: pair?.info?.socials ? "ACTIVE" : "GHOST", color: "#00E0FF" }
        ]
      });
    } catch (err) {
      console.error("Scan Error");
    } finally {
      setIsScanning(false);
    }
  };

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `senku-report-${report.symbol}.png`;
    link.href = dataUrl;
    link.click();
  };

  const resetScan = () => {
    setReport(null);
    setAddress('');
  };

  return (
    <div className="w-full max-w-full md:max-w-5xl mx-auto space-y-6 pb-24 px-2">
      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="bg-[#050505] border border-[#00FF5F]/20 p-6 md:p-10 rounded-[35px] backdrop-blur-3xl shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-[#00FF5F]/10 rounded-xl border border-[#00FF5F]/20">
                  <Brain className="w-6 h-6 text-[#00FF5F]" />
               </div>
               <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Security Audit</h2>
                  <p className="text-[10px] text-[#00FF5F] font-mono tracking-[0.3em] uppercase opacity-70">Senku Intelligence System</p>
               </div>
            </div>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="PASTE CONTRACT ADDRESS..." 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-[#00FF5F] font-mono text-xs focus:border-[#00FF5F]/50 outline-none"
              />
              <button 
                onClick={handleDeepScan}
                disabled={isScanning}
                className="w-full bg-[#00FF5F] text-black rounded-2xl py-4 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                {isScanning ? "Processing..." : "Start Deep Audit"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* THE CARD */}
            <div className="relative overflow-hidden rounded-[40px] border border-[#00FF5F]/30" ref={cardRef}>
              <div className="bg-black p-8 min-h-[550px] flex flex-col justify-between relative overflow-hidden">
                
                {/* Fixed Background Image */}
                {report.image && (
                  <div className="absolute inset-0 z-0">
                    <img src={report.image} className="w-full h-full object-cover opacity-50 blur-[60px] scale-150" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                  </div>
                )}

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img src={report.image} className="w-16 h-16 rounded-2xl border-2 border-[#00FF5F]/30 bg-black shadow-2xl" alt="" />
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">{report.name}</h3>
                      <p className="text-[#00FF5F] font-mono text-[10px] tracking-[0.2em] mt-2 font-bold uppercase">{report.symbol} • {report.address}</p>
                    </div>
                  </div>
                  <div className="bg-black/80 border border-[#00FF5F]/40 p-4 rounded-2xl text-center">
                    <span className="block text-[8px] text-[#00FF5F] font-black uppercase mb-1 tracking-widest">Risk Score</span>
                    <span className="text-2xl font-mono font-black text-white">{report.score}</span>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-3 my-10">
                  {report.details.map((item: any, i: number) => (
                    <div key={i} className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-lg">
                      <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.2em] font-bold">{item.label}</span>
                      <span className="text-sm font-black font-mono tracking-tighter" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-center">
                   <span className="text-[9px] font-mono text-white/60 uppercase tracking-[0.3em] font-bold">Senku Protocol Audit</span>
                   <ShieldCheck className="w-5 h-5 text-[#00FF5F]" />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col md:flex-row gap-3">
              <button 
                onClick={downloadCard}
                className="flex-[2] bg-[#00FF5F] text-black py-5 rounded-[24px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_30px_#00FF5F]"
              >
                <Download className="w-5 h-5" /> Save Result Card
              </button>
              <button 
                onClick={resetScan}
                className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-[24px] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-white/10"
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
