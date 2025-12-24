"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Download, MessageSquare, Send, X, Bot, Cpu, Globe, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiLuxuryEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة تحميل الكرت كصورة
  const downloadCard = async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement('a');
    link.download = `Wagmi-Identity-${address.slice(0,4)}.png`;
    link.href = dataUrl;
    link.click();
  };

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      
      setData({
        sol: solAmount,
        status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
        address: address.slice(0, 6) + "..." + address.slice(-6),
        rank: solAmount >= 100 ? "TOP 1%" : "HODLER"
      });
      setLoading(false);
    } catch (err) {
      alert("Invalid Address");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020202] text-white flex flex-col items-center justify-start font-sans overflow-hidden">
      
      {/* خلفية متحركة احترافية */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-cyan-500/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 py-20 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            WAGMI
          </h1>
          <p className="text-[10px] font-mono tracking-[0.8em] text-cyan-400 uppercase font-black">Neural Analyzer v23.0</p>
        </motion.div>

        {/* Search Box */}
        <div className="w-full max-w-xl mb-24 relative group">
          <input 
            className="w-full bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] text-center font-mono text-xl outline-none focus:border-cyan-500/50 transition-all backdrop-blur-md"
            placeholder="PASTE SOLANA ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="mt-4 w-full h-20 bg-white text-black rounded-[2.5rem] font-black text-xl uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            {loading ? "SCANNING..." : "INITIALIZE ANALYSIS"}
          </button>
        </div>

        {/* LUXURY CARD SECTION */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div 
                ref={cardRef}
                className="relative w-full max-w-md aspect-[3/4] p-10 rounded-[3.5rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/20 backdrop-blur-3xl overflow-hidden shadow-2xl"
              >
                {/* تأثيرات ضوئية داخل الكرت */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/30 blur-[80px] rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 blur-[80px] rounded-full" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest mb-1">Status Report</h4>
                      <p className="text-white/40 text-[9px] font-mono">{new Date().toLocaleDateString()}</p>
                    </div>
                    <Cpu className="text-white/20" size={30} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">Identity Class</p>
                    <h2 className="text-6xl font-black italic tracking-tighter leading-none bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent italic">
                      {data.status}
                    </h2>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                    <p className="text-[9px] font-mono text-white/40 mb-2 uppercase italic">Net Worth Assessment</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black tracking-tighter">{data.sol.toFixed(2)}</span>
                      <span className="text-xl font-light italic text-cyan-400">SOL</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div>
                      <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Network Node</p>
                      <p className="text-[10px] font-mono font-bold tracking-tighter">{data.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Tier</p>
                      <p className="text-[10px] font-mono font-bold text-cyan-400">{data.rank}</p>
                    </div>
                  </div>
                </div>

                {/* Scanline Effect */}
                <motion.div 
                  animate={{ y: [0, 500, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={downloadCard}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Download size={14} /> Save Identity Card
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Partners */}
        <div className="mt-40 w-full pt-10 border-t border-white/5 flex flex-col items-center">
          <div className="flex gap-12 mb-10 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors cursor-default">Solana</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-orange-500 transition-colors cursor-default">Jupiter</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-purple-500 transition-colors cursor-default">Helius</span>
          </div>
          <p className="text-[11px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic text-center">
            Developed by <span className="text-white">Bader Alkorgli</span>
          </p>
        </div>

      </div>
    </div>
  );
}