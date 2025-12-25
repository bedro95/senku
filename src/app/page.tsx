"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiMegaNeonEdition() {
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
        sol: sol.toFixed(1),
        status: sol >= 100 ? "SOLANA PRO" : "HODLER",
        id: Math.floor(1000 + Math.random() * 9000)
      });
    } catch (e) { alert("Invalid Address"); } finally { setLoading(false); }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-MEGA-NEON.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans overflow-hidden relative">
      
      {/* --- MEGA SIDE NEON LIGHTS (STRENGTHENED) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Left Cyan Glow - Enlarged */}
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-20%] w-[800px] h-[800px] bg-cyan-500/30 blur-[200px] rounded-full" 
        />
        {/* Right Purple Glow - Enlarged */}
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1.1, 1, 1.1] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-10%] right-[-20%] w-[800px] h-[800px] bg-purple-600/30 blur-[200px] rounded-full" 
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-12">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-8xl md:text-[11rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">WAGMI</h1>
          <p className="text-[11px] font-mono tracking-[1.5em] text-cyan-400 uppercase mb-20 font-black italic text-center drop-shadow-[0_0_10px_#06b6d4]">Universal Solana Terminal</p>
        </motion.div>

        {/* Input UI Module */}
        <div className="w-full max-w-md mb-24 space-y-6">
            <div className="relative p-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                <input 
                  className="w-full bg-[#050505] rounded-full p-7 text-center outline-none font-mono text-xl border border-white/5 focus:border-cyan-400 transition-all text-white" 
                  placeholder="ENTER WALLET ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button onClick={analyze} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all active:scale-95 shadow-xl">
               {loading ? "SCANNING DATA..." : "SCAN IDENTITY"}
            </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-16 pb-20">
              
              {/* --- THE ULTIMATE NEON HORIZONTAL CARD --- */}
              <div 
                ref={cardRef} 
                className="relative w-[340px] md:w-[560px] aspect-[1.58/1] bg-[#050505] rounded-[2.8rem] p-10 overflow-hidden border border-cyan-400/60 transition-all shadow-[0_0_100px_rgba(0,0,0,1)]"
                style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 30px rgba(6, 182, 212, 0.15)' }}
              >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
                
                {/* Internal Pulsing Neon Borders */}
                <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 border-[3px] border-cyan-400/20 rounded-[2.8rem] pointer-events-none" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center border border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                        <Layers size={32} className="text-cyan-400 drop-shadow-[0_0_12px_#06b6d4]" />
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-black italic text-white uppercase tracking-tight">Identity Pass</p>
                        <p className="text-[11px] font-mono text-cyan-400/70 uppercase tracking-widest leading-none mt-1">ID: //SOL-{data.id} * 9000//</p>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-cyan-400/20 rounded-full flex items-center justify-center border border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                        <ShieldCheck size={30} className="text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]" />
                    </div>
                  </div>

                  {/* Middle Section: Chip & Stats */}
                  <div className="flex items-center gap-10 text-left">
                    <div className="w-20 h-14 bg-[#111] rounded-xl border border-white/10 flex items-center justify-center shadow-inner group overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
                        <CreditCard size={36} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] leading-none">{data.sol}</h2>
                        <p className="text-[11px] font-mono text-white/40 tracking-[0.6em] uppercase mt-2 italic font-bold">SOL_NETWORK_ASSET</p>
                    </div>
                  </div>

                  {/* Bottom Footer Section */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-8">
                    <div className="text-left">
                        <p className="text-[11px] font-black text-cyan-400 uppercase tracking-widest italic mb-1 drop-shadow-[0_0_10px_#06b6d4]">SECURED_ACCESS_NODE</p>
                        <p className="text-sm font-black italic tracking-tight text-white/90">CLASS_TYPE: //{data.status}</p>
                    </div>
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="w-14 h-14 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_#06b6d4] border border-white/30"
                    >
                        <Zap size={32} className="text-black" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Download Action */}
              <button onClick={saveCard} className="flex items-center gap-5 bg-cyan-400 text-black px-20 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.7em] hover:scale-105 hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] transition-all active:scale-95 shadow-2xl">
                DOWNLOAD IDENTITY <Download size={22} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}