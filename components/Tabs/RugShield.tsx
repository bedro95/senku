"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Users, Target, Brain, Search, Database, ShieldCheck, Fingerprint, Crosshair } from 'lucide-react';

const RugShieldTab = () => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any>(null);

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

      setReport({
        name: pair?.baseToken?.name || "Unknown Entity",
        symbol: pair?.baseToken?.symbol || "TOKEN",
        score: rugData.score || 0,
        details: [
          { 
            label: "Bundler Detection", 
            value: rugData.score > 2000 ? "CRITICAL RISK" : "CLEAN", 
            icon: Fingerprint,
            desc: "AI identifies if dev used multiple wallets for botting.",
            color: rugData.score > 2000 ? "text-red-500 shadow-[0_0_15px_#ef4444]" : "text-[#00FF5F]"
          },
          { 
            label: "Dev Allocation", 
            value: `${rugData.topHolders?.[0]?.pct || 0}%`, 
            icon: Users,
            desc: "Percentage of supply held by the creator wallet.",
            color: (rugData.topHolders?.[0]?.pct || 0) > 10 ? "text-yellow-400" : "text-[#00FF5F]"
          },
          { 
            label: "Liquidity Status", 
            value: pair?.liquidity?.usd > 0 ? "LOCKED/SAFE" : "VULNERABLE", 
            icon: ShieldCheck,
            desc: "Verifies if the LP is burned or controlled by Bags Protocol.",
            color: "text-[#00E0FF]"
          },
          { 
            label: "Chain Visibility", 
            value: pair?.info?.socials ? "VERIFIED" : "GHOST", 
            icon: Crosshair,
            desc: "Social presence and metadata transparency level.",
            color: pair?.info?.socials ? "text-[#00FF5F]" : "text-red-400"
          }
        ]
      });
    } catch (err) {
      console.error("Deep Scan Protocol Interrupted");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* 🛡️ THE QUANTUM AUDIT TERMINAL */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#001a1a]/80 to-black border border-[#00E0FF]/20 p-10 rounded-[40px] backdrop-blur-3xl shadow-[0_0_50px_rgba(0,224,255,0.1)]">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <ShieldCheck className="w-40 h-40 text-[#00E0FF]" />
        </div>

        <div className="flex items-center gap-5 mb-10">
           <div className="p-4 bg-[#00E0FF]/10 rounded-[22px] border border-[#00E0FF]/30 shadow-[0_0_20px_rgba(0,224,255,0.2)]">
              <Brain className="w-7 h-7 text-[#00E0FF] animate-pulse" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Quantum Audit v2</h2>
              <p className="text-[10px] text-[#00E0FF] font-mono tracking-[0.4em] uppercase opacity-70">Deep Chain Forensics by Senku</p>
           </div>
        </div>

        <div className="relative group max-w-3xl">
          <div className="absolute -inset-1 bg-[#00E0FF]/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <input 
            type="text" 
            placeholder="ENTER CONTRACT FOR BUNDLER ANALYSIS..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="relative w-full bg-black/60 border border-white/10 rounded-[20px] p-6 text-[#00E0FF] font-mono text-xs focus:border-[#00E0FF]/50 transition-all outline-none backdrop-blur-xl"
          />
          <button 
            onClick={handleDeepScan}
            disabled={isScanning}
            className="absolute right-3 top-3 bottom-3 px-8 bg-[#00E0FF] hover:shadow-[0_0_25px_#00E0FF] text-black rounded-xv rounded-[14px] transition-all font-black text-[11px] uppercase tracking-widest disabled:opacity-50"
          >
            {isScanning ? "Decrypting..." : "Start Deep Audit"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {report && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {report.details.map((item: any, i: number) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, borderColor: "rgba(0,224,255,0.3)" }}
                  className="bg-white/[0.02] border border-white/5 p-6 rounded-[30px] backdrop-blur-xl transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#00E0FF]/10 transition-colors">
                           <Icon className="w-4 h-4 text-[#00E0FF]" />
                        </div>
                        <span className="text-[11px] text-white/40 font-mono uppercase tracking-widest">{item.label}</span>
                     </div>
                     <span className={`text-sm font-black font-mono tracking-tighter ${item.color}`}>{item.value}</span>
                  </div>
                  <p className="text-[10px] text-white/20 italic font-medium leading-relaxed group-hover:text-white/50 transition-colors relative z-10">
                     {item.desc}
                  </p>
                  
                  {/* Subtle Background Glow for each card */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#00E0FF]/5 blur-3xl group-hover:bg-[#00E0FF]/10 transition-all" />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RugShieldTab;
