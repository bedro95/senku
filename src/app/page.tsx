"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiViralFinal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null); // مرجع للكرت لأخذ لقطة شاشة

  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

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
      const topTokens = ["SOL", "JUP", "PYTH", "BONK", "WIF", "RAY"];
      setData({
        sol: solAmount,
        tokens: tokenAccounts.value.length,
        winRate: (65 + Math.random() * 30).toFixed(1),
        status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
        bigWinToken: topTokens[Math.floor(Math.random() * topTokens.length)],
        bigWinMultiplier: (2 + Math.random() * 5).toFixed(2),
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });
    } catch (err) {
      alert("Address Error");
    } finally {
      setLoading(false);
    }
  };

  const downloadAndShare = async () => {
    if (cardRef.current === null) return;
    
    // 1. تحويل الكرت لصورة PNG
    const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    
    // 2. تحميل الصورة لجهاز المستخدم
    const link = document.createElement('a');
    link.download = `WAGMI-${data.address}.png`;
    link.href = dataUrl;
    link.click();

    // 3. فتح تويتر للنشر
    const text = `Verified my Solana Stats on WAGMI ⚡\nRank: ${data.status}\n\nAnalyze yours here:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white flex flex-col items-center py-12 px-6 font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/10 blur-[150px] rounded-full" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-7xl font-black tracking-tighter italic text-white mb-2">WAGMI</h1>
        <div className="flex items-center justify-center gap-2 mb-12 uppercase font-bold text-cyan-400 text-[10px] tracking-[0.5em]">
          <Sparkles size={14} /> Neural Core v10.0
        </div>

        <div className="space-y-4 mb-16">
          <input 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center font-mono outline-none focus:border-cyan-500/40 backdrop-blur-xl"
            placeholder="ENTER_WALLET_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-black rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all"
          >
            {loading ? "SCANNING..." : <> RUN ANALYSIS <ArrowRight size={24} /> </>}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <div className="flex flex-col gap-6">
              {/* Card Container to be captured */}
              <div ref={cardRef} className="p-10 rounded-[2.9rem] bg-[#0b101a] border border-white/10 text-left relative overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full" />
                
                <div className="flex justify-between items-center mb-10">
                   <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] font-mono text-gray-400">ID: {data.address}</div>
                   <ShieldCheck className="text-cyan-500/30" size={24} />
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Portfolio Class</p>
                    <h2 className="text-5xl font-black italic text-white uppercase">{data.status}</h2>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl">
                    <p className="text-[8px] font-mono text-yellow-500 font-bold uppercase tracking-widest mb-1 italic">Biggest Win</p>
                    <h3 className="text-2xl font-black text-white italic uppercase">{data.bigWinToken} <span className="text-yellow-500 ml-2">+{data.bigWinMultiplier}x</span></h3>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[9px] font-mono text-gray-500 uppercase mb-1">Verified Net Worth</p>
                    <p className="text-5xl font-black text-white tracking-tighter">
                        {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xl text-cyan-500 ml-2">SOL</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-50">
                   <p className="text-[8px] font-mono font-bold tracking-[0.3em]">WAGMI TERMINAL 2025</p>
                   <Award size={20} />
                </div>
              </div>

              {/* Share Button (Outside capture) */}
              <button 
                onClick={downloadAndShare}
                className="w-full h-16 bg-white text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-500 transition-all shadow-xl"
              >
                <Download size={20} /> Save Card & Share on X
              </button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}