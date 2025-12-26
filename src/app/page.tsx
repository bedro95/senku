"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio, Cpu, Github, ExternalLink, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiEliteTerminal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toFixed(2),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(1000 + Math.random() * 9000)
      });
      // Scroll smoothly to result
      setTimeout(() => window.scrollTo({ top: 600, behavior: 'smooth' }), 100);
    } catch (e) { alert("Invalid Solana Address"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* --- ELITE BACKGROUND SYSTEM --- */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-cyan-600/15 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-purple-700/15 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>

      {/* --- HERO SECTION (HEADER) --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-8xl md:text-[15rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-800 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[14px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic mb-20">
            NEURAL TERMINAL v3.0
          </p>
        </motion.div>

        {/* Input UI - Clean & Sharp */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              className="relative w-full bg-black border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" 
              placeholder="ENTER SOLANA PUBLIC KEY"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading} 
            className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-lg tracking-[0.4em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-2xl"
          >
            {loading ? "SCANNING NETWORK..." : "INITIALIZE SCAN"}
          </button>
        </motion.div>
      </section>

      {/* --- RESULT SECTION --- */}
      <AnimatePresence>
        {data && (
          <section className="relative z-10 py-32 flex flex-col items-center bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-16 w-full max-w-[600px] px-4">
              
              {/* RACING NEON CARD */}
              <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.5rem] p-[4px] overflow-hidden group shadow-[0_0_100px_rgba(6,182,212,0.2)]">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.3rem] md:rounded-[3.3rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between z-10">
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Layers className="text-cyan-400 w-8 h-8" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xl font-black italic text-white uppercase tracking-tighter">Identity Pass</p>
                        <p className="text-[10px] font-mono text-white/30 uppercase mt-1 italic tracking-widest">ID: //WAGMI-{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8" />
                  </div>

                  <div className="flex items-center gap-8 text-left">
                    <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
                        <Cpu size={32} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">{data.sol}</h2>
                        <p className="text-[10px] font-mono text-white/40 tracking-[0.6em] uppercase mt-2 italic font-bold tracking-widest">SOL_LIQUID_RESERVE</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">NODE_SECURED_BY_WAGMI</p>
                        <p className="text-lg font-black italic tracking-tight text-white/90">CLASS: //{data.status}</p>
                    </div>
                    <div className="w-16 h-16 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)]">
                        <Zap size={32} className="text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                   if (cardRef.current) {
                      toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' })
                      .then(url => { const l = document.createElement('a'); l.download = 'WAGMI-ID.png'; l.href = url; l.click(); });
                   }
                }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all group"
              >
                EXPORT SYSTEM ID <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* --- FEATURES SECTION (SCROLLABLE) --- */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <ShieldCheck size={40} />, title: "SECURE SCAN", desc: "Real-time verification across Solana Mainnet Beta nodes." },
            { icon: <Activity size={40} />, title: "LIVE STATS", desc: "Instantly fetch liquidity and asset distribution metrics." },
            { icon: <Globe size={40} />, title: "UNIVERSAL", desc: "Compatible with all SPL wallets and hardware modules." }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/[0.08] transition-all group"
            >
              <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">{feat.icon}</div>
              <h3 className="text-2xl font-black italic mb-4 tracking-tighter uppercase">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed font-mono text-sm">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER & GITHUB SECTION --- */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-left">
            <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2">WAGMI PULSE</h2>
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase italic">The future of Solana Identity Analytics</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <a 
              href="https://github.com/bedro95" 
              target="_blank" 
              className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-400 hover:text-white transition-all group"
            >
              <Github size={20} /> SOURCE CODE <ExternalLink size={16} />
            </a>
            <p className="text-[10px] font-mono tracking-[0.8em] text-gray-600 uppercase">
              Designed & Developed by <span className="text-white font-black">Bader Alkorgli</span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}</style>
    </div>
  );
}