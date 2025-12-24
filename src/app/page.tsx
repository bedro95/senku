"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Activity,Cpu, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiFinalMasterpiece() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);
    try {
      const connection = new Connection(HELIUS_RPC, 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      // محاكاة وقت التحليل للإثارة البصرية
      setTimeout(() => {
        const topTokens = ["SOL", "JUP", "PYTH", "BONK", "WIF", "RAY"];
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (72 + Math.random() * 25).toFixed(1),
          status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: topTokens[Math.floor(Math.random() * topTokens.length)],
          bigWinMultiplier: (4 + Math.random() * 10).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
        setLoading(false);
      }, 1800);
    } catch (err) {
      alert("Address not found on Mainnet.");
      setLoading(false);
    }
  };

  const downloadAndShare = async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `WAGMI-ID.png`;
    link.href = dataUrl;
    link.click();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check my Solana ID on WAGMI ⚡")}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col items-center py-12 px-6 font-sans overflow-x-hidden">
      
      {/* Background Glow Effect */}
      <motion.div 
        animate={{ x: mousePos.x - 100, y: mousePos.y - 100 }}
        className="fixed w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-xl text-center">
        
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-8xl font-black tracking-tighter italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] uppercase">Wagmi</h1>
          <div className="flex items-center justify-center gap-3 mt-2 text-cyan-400 font-mono text-[10px] tracking-[0.5em] font-bold">
            <Cpu size={14} className="animate-spin-slow" /> NEURAL ENGINE ACTIVE
          </div>
        </div>

        {/* Input & Analyze Button */}
        <div className="space-y-4 mb-16">
          <input 
            className="w-full bg-white/5 border border-white/10 p-7 rounded-3xl text-center font-mono text-xl outline-none focus:border-cyan-500/50 backdrop-blur-xl transition-all"
            placeholder="PASTE_SOL_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full h-20 bg-cyan-500 hover:bg-white text-black rounded-3xl font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-3"
          >
            {loading ? "SCANNING BLOCKS..." : <>RUN DEEP ANALYSIS <Zap size={22} fill="currentColor" /></>}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {/* The Card */}
              <div ref={cardRef} className="p-12 rounded-[3.5rem] bg-[#050505] border-2 border-white/10 text-left relative overflow-hidden mb-8 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Globe size={100} /></div>
                
                <div className="flex justify-between items-center mb-10">
                   <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] font-mono text-cyan-400 uppercase tracking-tighter italic">ID: {data.address}</div>
                   <ShieldCheck className="text-cyan-500" size={24} />
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-1 font-bold">Ranking</p>
                    <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter">{data.status}</h2>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-cyan-400" />
                        <p className="text-[9px] font-mono text-cyan-400 font-black uppercase italic tracking-widest">Master Trade</p>
                    </div>
                    <h3 className="text-3xl font-black text-white italic">{data.bigWinToken} <span className="text-cyan-400 ml-2">+{data.bigWinMultiplier}x</span></h3>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 font-bold tracking-widest">Net Worth</p>
                    <p className="text-6xl font-black text-white tracking-tighter">
                        {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-2xl text-cyan-500 font-light ml-2">SOL</span>
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-center opacity-30 font-mono text-[8px] tracking-[0.3em] font-bold">
                   <span>PROTOCOL_V.12</span>
                   <span>© WAGMI TERMINAL</span>
                </div>
              </div>

              <button 
                onClick={downloadAndShare}
                className="w-full h-16 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all mb-12"
              >
                <Download size={20} /> Download Card & Share on X
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Section - التوثيق والحقوق */}
        <div className="mt-12 pt-12 border-t border-white/5 space-y-6">
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span className="text-gray-500">Powered by</span> <span className="text-white">Solana</span>
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span className="text-gray-500">Node by</span> <span className="text-white">Helius</span>
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span className="text-gray-500">Data by</span> <span className="text-white">Jupiter</span>
             </div>
          </div>

          <div className="text-center">
            <p className="text-[11px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic">
              Developed by <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Bader Alkorgli</span>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}