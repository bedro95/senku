"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, Radio, Cpu, Github, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

const ECOSYSTEM_ICONS = [
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFW36DP7btR2GrS1W86WH7AfB7rqnCYcV5as67vS5/logo.png",
  "https://jup.ag/svg/jupiter-logo.svg",
  "https://raydium.io/logo/logo-only-light.svg",
  "https://pyth.network/favicon.ico",
  "https://www.tensor.trade/favicon.ico",
];

export default function WagmiSuperNovaTerminal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleScan = async () => {
    if (!address || address.length < 32) {
      alert("Please enter a valid Solana address");
      return;
    }
    setLoading(true);
    setData(null); 
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key).catch(() => 0);
      const sol = balance / 1_000_000_000;
      let currentStatus = sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER";
      setData({ sol: sol.toFixed(2), status: currentStatus, asset: "SOL", id: Math.floor(1000 + Math.random() * 9000) });
      setTimeout(() => document.getElementById('result-view')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    } catch (e) { alert("Scan Error. Please try again."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* --- BACKGROUND ENGINE --- */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[#9945FF]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#14F195]/10 blur-[180px] rounded-full animate-pulse" />
      </motion.div>

      {/* --- CUSTOM DESIGNED WAGMI CORE --- */}
      <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-0 opacity-80 pointer-events-none hidden lg:block">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64 flex items-center justify-center"
        >
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 border border-white/5 rounded-full scale-150 animate-ping opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full blur-[80px] opacity-20" />

          {/* The Custom Logo (W-Shape Abstract Core) */}
          <div className="relative w-full h-full bg-black rounded-full border border-white/10 shadow-[0_0_80px_rgba(20,241,149,0.2)] flex items-center justify-center p-12">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M20 30L50 80L80 30" stroke="url(#paint0_linear)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 50L50 20L80 50" stroke="url(#paint1_linear)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="50" r="5" fill="#fff" className="animate-pulse"/>
              <defs>
                <linearGradient id="paint0_linear" x1="20" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9945FF" />
                  <stop offset="1" stopColor="#14F195" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="80" y1="50" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#14F195" />
                  <stop offset="1" stopColor="#00FFA3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Icon Fountain Bubbles */}
          {ECOSYSTEM_ICONS.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.4, 0.8, 0.4],
                x: [0, (i % 2 === 0 ? 1 : -1) * (140 + Math.random() * 100)],
                y: [0, -250 - Math.random() * 200],
              }}
              transition={{ duration: 7, repeat: Infinity, delay: i * 1.4 }}
              className="absolute"
            >
              <div className="p-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
                <img src={icon} className="w-8 h-8 rounded-full shadow-lg" alt="eco" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-600 bg-clip-text text-transparent drop-shadow-2xl select-none">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic mb-16 animate-pulse">
            NEURAL TERMINAL v3.5
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur opacity-20 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              className="relative w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" 
              placeholder="ENTER SOLANA ADDRESS" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <button onClick={handleScan} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-xl">
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT SECTION --- */}
      <AnimatePresence>
        {data && (
          <section id="result-view" className="relative z-10 py-32 flex flex-col items-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-16 w-full max-w-[640px] px-4">
              <div className="relative w-full aspect-[1.58/1] rounded-[3.5rem] p-[3px] overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.4)]">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#14F195,transparent,transparent)]" />
                <div ref={cardRef} className="relative w-full h-full bg-black/80 backdrop-blur-3xl rounded-[3.3rem] p-12 overflow-hidden flex flex-col justify-between z-10 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20"><Layers className="text-cyan-400 w-8 h-8" /></div>
                      <div className="text-left leading-none">
                        <p className="text-xl font-black italic text-white uppercase">WAGMI PASS</p>
                        <p className="text-[10px] font-mono text-white/40 uppercase mt-1">SERIES: //B-{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-8 text-left">
                    <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"><Cpu size={32} className="text-white/20" /></div>
                    <div><h2 className="text-6xl md:text-8xl font-[1000] tracking-tighter text-white leading-none">{data.sol}</h2><p className="text-[10px] font-mono text-cyan-400/60 uppercase mt-2 font-bold tracking-widest">UNIT: SOLANA</p></div>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-8">
                    <div className="text-left"><p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">NETWORK RANK</p><p className="text-2xl font-black italic text-white uppercase">{data.status}</p></div>
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl"><Zap size={32} className="text-black" fill="currentColor" /></div>
                  </div>
                </div>
              </div>
              <button onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l = document.createElement('a'); l.download = 'WAGMI-ID.png'; l.href = url; l.click(); })} className="bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">DOWNLOAD PASSPORT <Download size={18} className="inline ml-2"/></button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-left">
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">WAGMI PULSE</h2>
            <p className="text-gray-500 font-mono text-xs tracking-[0.5em] uppercase mt-2">Designed by <span className="text-cyan-500 font-bold underline">Bader Alkorgli</span></p>
          </div>
          <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-white hover:text-black border border-white/10 px-8 py-4 rounded-2xl transition-all shadow-xl">
            <Github size={24} />
            <span className="font-black text-sm uppercase tracking-widest">Source Code</span>
          </a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; }
      `}</style>
    </div>
  );
}