"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiBlackEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة الحفظ الذكية للموبايل والكمبيوتر
  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { 
        quality: 1, 
        pixelRatio: 3, // دقة عالية جداً
        backgroundColor: '#000'
      });
      
      const link = document.createElement('a');
      link.download = `WAGMI-CARD-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Please take a screenshot if download doesn't start on your device.");
    }
  };

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
        status: sol >= 100 ? "LEGENDARY WHALE" : sol >= 10 ? "SOLANA PRO" : "HODLER",
        rank: sol >= 100 ? "TIER 1" : "TIER 2",
        id: Math.floor(100000 + Math.random() * 900000)
      });
    } catch (e) {
      alert("Invalid Solana Address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 font-sans selection:bg-cyan-500">
      
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse transition-all duration-1000" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-16 text-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl md:text-9xl font-black italic tracking-tighter mb-2 bg-gradient-to-b from-white via-white to-gray-800 bg-clip-text text-transparent"
        >
          WAGMI
        </motion.h1>
        <p className="text-[10px] font-mono tracking-[1em] text-cyan-500 uppercase mb-16 font-bold">Universal Solana Terminal</p>

        {/* Input Area */}
        <div className="space-y-4 mb-20">
          <input 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center font-mono text-sm md:text-lg outline-none focus:border-cyan-500 transition-all backdrop-blur-md"
            placeholder="ENTER SOLANA WALLET"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyze} 
            disabled={loading}
            className="w-full h-20 bg-white text-black rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
          >
            {loading ? "ANALYZING..." : <>SCAN IDENTITY <Zap size={20} fill="currentColor" /></>}
          </button>
        </div>

        {/* THE BLACK VIP CARD */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              className="flex flex-col items-center gap-10"
            >
              <div 
                ref={cardRef}
                className="relative w-full aspect-[1.58/1] max-w-md bg-[#080808] rounded-[2.5rem] p-10 border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden group"
              >
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[2.5rem]" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-xl border border-white/20 flex items-center justify-center">
                        <Layers size={20} className="text-white/60" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Identity Pass</p>
                        <p className="text-[8px] font-mono text-white/30 tracking-widest italic">WAGMI-SYSTEM-77</p>
                      </div>
                    </div>
                    <ShieldCheck className="text-white/20" size={28} />
                  </div>

                  <div className="text-left py-4">
                    <p className="text-[8px] font-mono text-white/20 uppercase mb-2 tracking-[0.5em] italic">Network Status</p>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
                      {data.status}
                    </h2>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="text-left">
                      <p className="text-[8px] font-mono text-white/20 uppercase mb-1 italic">Balance</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-white">{data.sol}</span>
                        <span className="text-xs font-light text-cyan-400 italic">SOL</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] font-mono text-white/20 uppercase mb-1 italic">Rank ID</p>
                       <p className="text-sm font-black font-mono text-white/80">#{data.id}</p>
                    </div>
                  </div>
                </div>
                
                {/* Scanning line effect */}
                <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 w-20 h-full bg-white/5 skew-x-12"
                />
              </div>

              <button 
                onClick={saveCard}
                className="group flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
              >
                <Download size={16} className="group-hover:animate-bounce" /> Export Black Card
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Section */}
        <div className="mt-32 pt-10 border-t border-white/5">
           <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest mb-8 opacity-20">
              <span>Solana</span><span>Jupiter</span><span>Helius</span>
           </div>
           <p className="text-[10px] font-mono tracking-[0.5em] uppercase italic text-gray-500">
             System Developed by <span className="text-white">Bader Alkorgli</span>
           </p>
        </div>
      </div>
    </div>
  );
}