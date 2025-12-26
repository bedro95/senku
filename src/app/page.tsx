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
  const resultRef = useRef<HTMLDivElement>(null);
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
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      
      const resData = { 
        sol: sol.toFixed(2), 
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER", 
        asset: "SOL", 
        id: Math.floor(1000 + Math.random() * 9000) 
      };
      
      setData(resData);
      // التمرير التلقائي للنتيجة
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    } catch (e) { 
      alert("Invalid Address or Connection Error."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* Background Glow */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-purple-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-cyan-500/10 blur-[180px] rounded-full" />
      </motion.div>

      {/* --- THE CORE: ACCURATE SOLANA LOGO --- */}
      <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-0 opacity-90 pointer-events-none hidden lg:block">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-72 h-72 flex items-center justify-center"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full blur-[80px] opacity-30 animate-pulse" />
          
          {/* Black Circle Container */}
          <div className="relative w-full h-full bg-black rounded-full border border-white/10 shadow-[0_0_100px_rgba(153,69,255,0.2)] flex items-center justify-center p-16">
            <svg viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(20,241,149,0.5)]">
              <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H46.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#paint0_linear)"/>
              <path d="M64.6 87.6c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H46.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#paint1_linear)"/>
              <path d="M332.7 0.3c2.4-2.4 5.7-3.8 9.2-3.8H24.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#paint2_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="41.8" y1="272.2" x2="389.2" y2="272.2" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="41.8" y1="121.9" x2="389.2" y2="121.9" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="19.9" y1="34.6" x2="367.3" y2="34.6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Particle Fountain */}
          {ECOSYSTEM_ICONS.map((icon, i) => (
            <motion.img
              key={i}
              src={icon}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0.3, 0.7, 0.3],
                x: [0, (i % 2 === 0 ? 1 : -1) * (150 + Math.random() * 100)],
                y: [0, -300 - Math.random() * 200]
              }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
              className="absolute w-10 h-10 rounded-full border border-white/20 p-1 bg-black/50 backdrop-blur-md"
            />
          ))}
        </motion.div>
      </div>

      {/* --- UI CONTENT --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent drop-shadow-2xl">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 italic mb-16">
            NEURAL TERMINAL v3.1
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur opacity-30 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              className="relative w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" 
              placeholder="ENTER SOLANA ADDRESS" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <button 
            onClick={handleScan} 
            disabled={loading} 
            className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT VIEW --- */}
      <AnimatePresence>
        {data && (
          <section ref={resultRef} className="relative z-10 py-32 flex flex-col items-center px-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-[600px]">
               <div ref={cardRef} className="relative w-full aspect-[1.58/1] rounded-[3rem] p-10 border border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Layers className="text-purple-500" />
                        <span className="text-xl font-black italic uppercase tracking-tighter">Identity Pass</span>
                      </div>
                      <Radio className="text-cyan-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-7xl md:text-8xl font-black italic tracking-tighter">{data.sol}</h2>
                      <p className="text-xs font-mono text-cyan-400/60 mt-2 uppercase tracking-[0.3em]">RESERVE_ASSET: SOLANA</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/10 pt-6">
                      <div className="text-left">
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Status Protocol</p>
                        <p className="text-2xl font-black italic text-white uppercase">{data.status}</p>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                        <Zap className="text-black" fill="currentColor" size={24} />
                      </div>
                    </div>
                  </div>
               </div>
               <button 
                onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l=document.createElement('a'); l.download='WAGMI-PASS.png'; l.href=url; l.click(); })} 
                className="mt-8 w-full py-5 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-full font-black text-xs uppercase tracking-widest transition-all"
               >
                 Download Identity Pass <Download size={16} className="inline ml-2" />
               </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-20 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black italic tracking-tighter">WAGMI PULSE</h2>
        <p className="text-gray-500 font-mono text-xs mt-2">Designed by <span className="text-cyan-500 font-bold underline">Bader Alkorgli</span></p>
      </footer>
    </div>
  );
}