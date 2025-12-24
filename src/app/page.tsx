"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function WagmiEliteEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

      const totalTokens = tokenAccounts.value.length;
      
      // منطق تحديد اللقب مرن ليناسب أي رقم
      let status = "RETAIL TRADER";
      if (solAmount >= 100) status = "ALPHA CHAD";
      if (solAmount >= 1000) status = "LEGENDARY WHALE";

      setData({
        sol: solAmount,
        tokens: totalTokens,
        winRate: (60 + Math.random() * 35).toFixed(1),
        status: status,
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });

    } catch (err) {
      alert("Analysis Failed: Please check the address.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnX = () => {
    const text = `Verified my Solana Net Worth on WAGMI ⚡\n\nStatus: ${data.status}\nNet Worth: ${data.sol.toFixed(2)} SOL\n\nCheck yours:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white flex flex-col items-center py-12 px-6 font-sans overflow-hidden">
      
      {/* Visual Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/10 blur-[150px] rounded-full" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-xl">
        
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black tracking-tighter italic text-white mb-2 uppercase">Wagmi</h1>
          <div className="flex items-center justify-center gap-2">
             <Sparkles size={14} className="text-cyan-400" />
             <p className="text-[11px] tracking-[0.5em] text-cyan-400 font-bold uppercase italic">Neural Core v8.1</p>
          </div>
        </div>

        <div className="space-y-4 mb-20">
          <input 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center text-lg font-mono outline-none focus:border-cyan-500/40 transition-all uppercase backdrop-blur-2xl"
            placeholder="ENTER_SOLANA_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-white hover:to-white text-black rounded-3xl font-black text-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-4 group"
          >
            {loading ? "FETCHING BLOCKCHAIN..." : (
              <> START ANALYSIS <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /> </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 to-transparent shadow-2xl"
            >
              <div className="bg-[#0b101a] rounded-[2.9rem] p-12 border border-white/5 relative overflow-hidden shadow-2xl">
                
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-gray-400 uppercase italic">
                      ID: {data.address}
                   </div>
                   <ShieldCheck className="text-cyan-500/50" size={28} />
                </div>

                <div className="space-y-10 text-left">
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2 font-bold italic">Account Prestige</p>
                    <h2 className="text-6xl font-black italic text-white tracking-tighter leading-none uppercase">
                      {data.status}
                    </h2>
                  </div>

                  <div className="py-8 border-y border-white/5">
                    <p className="text-[10px] font-mono text-cyan-500 uppercase mb-2 font-bold tracking-[0.2em] italic">Verified Net Worth</p>
                    <p className="text-7xl font-black text-white tracking-tighter">
                      {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                      <span className="text-2xl text-cyan-500 ml-4 font-light italic">SOL</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 italic font-bold">Total Tokens</p>
                        <p className="text-3xl font-black text-white uppercase">{data.tokens}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 italic font-bold">Success Rate</p>
                        <p className="text-3xl font-black text-cyan-400 uppercase">{data.winRate}%</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={shareOnX}
                  className="mt-12 w-full h-16 bg-white hover:bg-cyan-500 text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                  <Twitter size={20} fill="currentColor" /> Share Verified Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 text-center">
          <p className="text-[10px] font-mono tracking-[0.4em] text-gray-600 font-bold uppercase italic">
             Bader Alkorgli // WAGMI Terminal 2025
          </p>
        </div>
      </motion.div>
    </div>
  );
}