"use client";
import React, { useState, useRef } from 'react';
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
      
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-purple-600/10 blur-[180px] rounded-full" />
      </motion.div>

      {/* --- PREMIUM SOLANA CORE (MATCHING UPLOADED IMAGE) --- */}
      <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-0 opacity-80 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center"
        >
           {/* Glow Effect Background */}
           <div className="absolute inset-0 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full blur-[60px] opacity-20 animate-pulse" />
           
           {/* The Logo Container (Black Circle from your image) */}
           <div className="relative w-full h-full bg-black rounded-full border border-white/5 flex items-center justify-center p-10 shadow-2xl">
             <svg viewBox="0 0 397 311" className="w-full h-full">
               <defs>
                 <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#14F195" />
                   <stop offset="50%" stopColor="#80ECFF" />
                   <stop offset="100%" stopColor="#9945FF" />
                 </linearGradient>
               </defs>
               <path 
                 fill="url(#solana-gradient)" 
                 d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H46.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm0-150.3c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H46.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm268.1-150.3c2.4-2.4 5.7-3.8 9.2-3.8H24.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" 
               />
             </svg>
           </div>
        </motion.div>

        {/* Floating Ecosystem Fountain */}
        {ECOSYSTEM_ICONS.map((icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.4, 0.8, 0.4],
              x: [0, (i % 2 === 0 ? 1 : -1) * (150 + Math.random() * 150)],
              y: [0, -250 - Math.random() * 250],
            }}
            transition={{ duration: 7, repeat: Infinity, delay: i * 1.4, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="p-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
              <img src={icon} className="w-8 h-8 rounded-full" alt="eco" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-600 bg-clip-text text-transparent drop-shadow-2xl select-none">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic mb-16">
            NEURAL TERMINAL v3.0
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#14F195] to-[#9945FF] rounded-full blur opacity-30 group-focus-within:opacity-100 transition duration-1000"></div>
            <input className="relative w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white placeholder:text-white/20" placeholder="ENTER SOLANA ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button onClick={handleScan} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all shadow-xl">
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT & FOOTER (STABLE) --- */}
      <AnimatePresence>
        {data && (
          <section id="result-view" className="relative z-10 py-32 flex flex-col items-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-[640px] px-4">
               {/* Card Component Here... (Same as Original) */}
               <div ref={cardRef} className="relative w-full aspect-[1.58/1] bg-black/80 rounded-[3rem] p-10 border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <Layers className="text-cyan-400" />
                      <Radio className="text-cyan-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-7xl font-black italic">{data.sol}</h2>
                      <p className="text-xs font-mono text-cyan-400">RESERVE: SOLANA</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <p className="font-black italic text-xl uppercase">RANK: {data.status}</p>
                      <Zap className="text-cyan-400" fill="currentColor" />
                    </div>
                  </div>
               </div>
               <button onClick={() => cardRef.current && toPng(cardRef.current).then(url => { const l=document.createElement('a'); l.download='WAGMI-ID.png'; l.href=url; l.click(); })} className="mt-8 w-full py-4 bg-white/5 rounded-full border border-white/10 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all">Download Pass</button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-20 px-6 border-t border-white/5 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter">WAGMI PULSE</h2>
            <p className="text-gray-500 font-mono text-xs mt-2 uppercase">Designed by <span className="text-cyan-500 font-bold underline">Bader Alkorgli</span></p>
          </div>
          <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl mt-8 md:mt-0 hover:bg-white hover:text-black transition-all">
            <Github size={20} /> <span className="font-black text-xs uppercase tracking-widest">Dev Repo</span>
          </a>
        </div>
      </footer>
    </div>
  );
}