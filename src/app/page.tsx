"use client";
import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Search, Wallet, Activity, ArrowUpRight } from 'lucide-react';

export default function WagmiProject() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBalance = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      const key = new PublicKey(address);
      const bal = await connection.getBalance(key);
      setBalance(bal / 1000000000); 
    } catch (err) {
      alert("Invalid Solana Address");
      setBalance(null);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Animation (Blockchain Flows) */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: -100, x: Math.random() * 1200 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 8 + 4, repeat: Infinity, ease: "linear" }}
            className="absolute text-cyan-500/20"
          >
            <ArrowUpRight size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-gray-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md shadow-2xl text-center"
      >
        {/* The Original Logo & Name */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
            <span className="text-3xl font-black text-white italic">W</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            WAGMI
          </h1>
        </div>

        <div className="space-y-4 text-left">
          <div className="relative">
            <input 
              type="text"
              placeholder="Solana Wallet Address"
              className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-500 transition-all pl-12 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-500" size={18} />
          </div>

          <button 
            onClick={checkBalance}
            disabled={loading}
            className="w-full bg-white text-black p-4 rounded-2xl font-bold hover:bg-cyan-400 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {loading ? "Analyzing..." : "Analyze Wallet"}
          </button>

          {balance !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/5"
            >
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Balance</p>
              <h2 className="text-4xl font-black text-white">
                {balance.toFixed(4)} <span className="text-xs text-cyan-400 font-mono">SOL</span>
              </h2>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 flex items-center gap-2 opacity-30">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Network Stable</p>
      </div>
    </div>
  );
}