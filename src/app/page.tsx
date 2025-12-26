"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, Radio, Cpu, Github, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

// مصفوفة الأيقونات المنبثقة (أشهر برامج سولانا)
const ECOSYSTEM_ICONS = [
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFW36DP7btR2GrS1W86WH7AfB7rqnCYcV5as67vS5/logo.png", // USDC
  "https://jup.ag/svg/jupiter-logo.svg", // Jupiter
  "https://raydium.io/logo/logo-only-light.svg", // Raydium
  "https://pyth.network/favicon.ico", // Pyth
  "https://www.tensor.trade/favicon.ico", // Tensor
];

export default function WagmiSuperNovaTerminal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // منطق الـ Scan (المستقر والأصلي)
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
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-500/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-purple-600/10 blur-[180px] rounded-full animate-pulse" />
      </motion.div>

      {/* --- SOLANA CORE & ECOSYSTEM ANIMATION --- */}
      <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-0 opacity-40 pointer-events-none">
        {/* النواة: شعار سولانا المتوهج */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full blur-[2px] shadow-[0_0_100px_rgba(20,241,149,0.5)] flex items-center justify-center p-8"
        >
           <svg viewBox="0 0 397 311" className="w-full h-full text-black"><path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H46.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM390.4 62.7L327.7 0c-2.4-2.4-5.7-3.8-9.2-3.8H1.1C-4.7-3.8-7.6 3.2-3.5 7.3l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1zM390.4 150.3l-62.7-62.7c-2.4-2.4-5.7-3.8-9.2-3.8H1.1c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" fill="currentColor"/></svg>
        </motion.div>

        {/* العملات والبرامج المنبثقة */}
        {ECOSYSTEM_ICONS.map((icon, i) => (
          <motion.img
            key={i}
            src={icon}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * -400 - 100],
              scale: [0, 1, 0.5],
              rotate: 360
            }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: i * 1.5 }}
            className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 p-1 bg-black"
          />
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* الخط الأصلي المتناسق */}
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-600 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] select-none">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic mb-16 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
            NEURAL TERMINAL v3.0
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-40 group-focus-within:opacity-100 transition duration-1000"></div>
            <input className="relative w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" placeholder="ENTER SOLANA ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button onClick={handleScan} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)] disabled:opacity-50">
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT SECTION (GLASS CARD) --- */}
      <AnimatePresence>
        {data && (
          <section id="result-view" className="relative z-10 py-32 flex flex-col items-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-16 w-full max-w-[640px] px-4">
              <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.5rem] p-[3px] overflow-hidden shadow-[0_0_150px_rgba(6,182,212,0.6)] group">
                <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                <div ref={cardRef} className="relative w-full h-full bg-black/40 backdrop-blur-[40px] rounded-[2.3rem] md:rounded-[3.3rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between z-10 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20"><Layers className="text-cyan-400 w-8 h-8" /></div>
                      <div className="text-left leading-none">
                        <p className="text-xl font-black italic text-white uppercase tracking-tighter drop-shadow-md">Identity Pass</p>
                        <p className="text-[10px] font-mono text-white/40 uppercase mt-1 italic tracking-widest">ID: //WAGMI-{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
                  </div>
                  <div className="flex items-center gap-8 text-left">
                    <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"><Cpu size={32} className="text-white/20" /></div>
                    <div><h2 className="text-6xl md:text-8xl font-[1000] tracking-tighter text-white leading-none drop-shadow-2xl">{data.sol}</h2><p className="text-[10px] font-mono text-cyan-400/60 uppercase mt-2 italic font-bold tracking-widest">RESERVE_ASSET: SOL</p></div>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-8">
                    <div className="text-left"><p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">ENCRYPTED TERMINAL ACCESS</p><p className="text-lg md:text-2xl font-black italic text-white uppercase">RANK: {data.status}</p></div>
                    <div className="w-16 h-16 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,1)]"><Zap size={32} className="text-black" fill="currentColor" /></div>
                  </div>
                </div>
              </div>
              <button onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l = document.createElement('a'); l.download = 'WAGMI-ID.png'; l.href = url; l.click(); })} className="bg-white/5 backdrop-blur-md border border-white/10 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">DOWNLOAD IDENTITY <Download size={18} className="inline ml-2"/></button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* --- FEATURES & FOOTER (STABLE) --- */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[{ icon: <ShieldCheck size={40} />, title: "SECURE SCAN" }, { icon: <Activity size={40} />, title: "LIVE STATS" }, { icon: <Globe size={40} />, title: "UNIVERSAL" }].map((feat, i) => (
          <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl transition-all">
            <div className="text-cyan-400 mb-6">{feat.icon}</div>
            <h3 className="text-2xl font-black italic mb-4 uppercase">{feat.title}</h3>
            <p className="text-gray-400 font-mono text-sm">Mainnet-beta node verification protocols active.</p>
          </div>
        ))}
      </section>

      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-left">
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-lg">WAGMI PULSE</h2>
            <p className="text-gray-500 font-mono text-xs tracking-[0.5em] uppercase italic mt-2">Designed by <span className="text-cyan-500 font-bold underline">Bader Alkorgli</span></p>
          </div>
          <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-white hover:text-black border border-white/10 px-8 py-4 rounded-2xl transition-all duration-500 shadow-xl group">
            <Github size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="font-black text-sm uppercase tracking-widest">Developer Repo</span>
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