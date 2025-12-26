"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Layers, Radio, Cpu, Sparkles, ShieldCheck, Fingerprint } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiMasterpieceEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString()
      });
    } catch (e) { 
      alert("Invalid Address. Ensure it's a valid Solana Public Key."); 
    } finally { 
      setLoading(false); 
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 4, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-LEGACY-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Error saving card."); }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-cyan-500">
      
      {/* --- FULL SCREEN PERSISTENT SNOW SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ 
              y: "110vh", 
              opacity: [0, 1, 1, 0],
              x: (Math.random() * 100) + "vw" 
            }}
            transition={{ 
              duration: Math.random() * 8 + 7, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 15 
            }}
            className="absolute w-[1.5px] h-[1.5px] bg-cyan-400/60 rounded-full shadow-[0_0_8px_#06b6d4]"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-10 md:mt-20">
        
        {/* --- SHARP WAGMI LOGO --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 md:mb-24">
          <h1 className="text-8xl md:text-[15rem] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic opacity-60 text-center">
            Decentralized Identity Hub
          </p>
        </motion.div>

        {/* --- INPUT AREA --- */}
        <div className="w-full max-w-lg mb-20 px-4">
          <div className="relative p-[1px] rounded-full bg-white/10 focus-within:bg-gradient-to-r focus-within:from-cyan-500 focus-within:to-purple-600 transition-all duration-700">
            <input 
              className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-base md:text-lg text-white" 
              placeholder="ENTER WALLET ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button onClick={analyze} disabled={loading} className="w-full mt-6 py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-lg tracking-[0.4em] hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
            {loading ? "INITIALIZING SCAN..." : "REVEAL IDENTITY"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12 w-full px-2">
              
              {/* --- THE MASTERPIECE NEON CARD --- */}
              <div className="relative w-full max-w-[620px] aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.8rem] p-[3px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                
                {/* BORDER GLOW ANIMATION */}
                <div className="absolute inset-[-500%] animate-[spin_5s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] md:rounded-[3.7rem] p-8 md:p-14 overflow-hidden flex flex-col justify-between z-10">
                  
                  {/* Digital Texture */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

                  {/* Top Header */}
                  <div className="flex justify-between items-start relative z-20">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-400 blur-md opacity-20 animate-pulse" />
                        <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                          <Fingerprint size={32} className="md:w-11 md:h-11 text-cyan-400" />
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-xl md:text-3xl font-black italic text-white uppercase tracking-tighter">Wagmi Legacy</p>
                        <p className="text-[10px] md:text-[12px] font-mono text-white/30 tracking-[0.2em] uppercase mt-1 italic">Verified Asset Node</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Radio className="text-cyan-500 animate-pulse w-7 h-7 md:w-10 md:h-10" />
                      <div className="mt-2 w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                    </div>
                  </div>

                  {/* Wealth Content */}
                  <div className="flex items-center gap-8 md:gap-14 text-left relative z-20">
                    <div className="hidden md:flex w-24 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/5 items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_10px_#06b6d4]" />
                        <Cpu size={40} className="text-white/10" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                           <h2 className="text-6xl md:text-[7rem] font-[1000] tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] leading-none italic">{data.sol}</h2>
                           <span className="text-xl md:text-3xl font-black text-cyan-400 italic">SOL</span>
                        </div>
                        <p className="text-[9px] md:text-[11px] font-mono text-white/20 tracking-[0.8em] uppercase mt-4 font-bold italic">Network Liquidity Reserve</p>
                    </div>
                  </div>

                  {/* Bottom Footer */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-8 md:pt-12 relative z-20">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck size={14} className="text-cyan-400" />
                           <p className="text-[9px] md:text-[11px] font-black text-cyan-400 uppercase tracking-[0.2em] italic">Access Level: Premium</p>
                        </div>
                        <p className="text-sm md:text-2xl font-black italic tracking-tight text-white/90 uppercase">{data.status}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <p className="text-[8px] font-mono text-white/20">ISSUED: {data.date}</p>
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Zap size={32} className="md:w-14 md:h-14 text-black" fill="currentColor" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={saveCard} 
                className="flex items-center gap-6 bg-white/5 border border-white/10 px-24 py-6 rounded-full font-black text-xs uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95 mb-20 group"
              >
                GENERATE PNG <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pb-10 text-center opacity-20">
           <p className="text-[10px] font-mono tracking-[1.5em] uppercase">
             Identity Protocol // <span className="text-white">Bader Alkorgli</span>
           </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}