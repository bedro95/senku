"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ShieldCheck, Coins, Database, Activity } from 'lucide-react';
import { Connection, PublicKey } from '@solana/web3.js';

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

interface TokenInfo {
  mint: string;
  amount: number;
  decimals: number;
}

export default function QuantumScanner() {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    balance: number;
    tokens: TokenInfo[];
  } | null>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!address) return;
    setIsScanning(true);
    setProgress(0);
    setError('');
    setResults(null);

    try {
      const connection = new Connection(RPC_ENDPOINT);
      const pubkey = new PublicKey(address);
      
      // Progress simulation for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const balance = await connection.getBalance(pubkey);
      const solBalance = balance / 1e9;
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      });

      const tokens: TokenInfo[] = tokenAccounts.value.map((acc: any) => ({
        mint: acc.account.data.parsed.info.mint,
        amount: acc.account.data.parsed.info.tokenAmount.uiAmount,
        decimals: acc.account.data.parsed.info.tokenAmount.decimals,
      })).filter(t => t.amount > 0);

      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setResults({ balance: solBalance, tokens });
        setIsScanning(false);
      }, 500);

    } catch (err: any) {
      setError(err.message || 'Invalid Address');
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full bg-black/40 border border-[#00FFCC]/20 rounded-[2.5rem] p-8 glass-morphism overflow-hidden relative">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#00FFCC]/10 rounded-2xl border border-[#00FFCC]/30">
          <Search className="w-6 h-6 text-[#00FFCC]" />
        </div>
        <div>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">Quantum Scanner</h3>
          <p className="text-[10px] font-mono text-[#00FFCC] uppercase tracking-widest">Real-Time On-Chain Analysis</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative group">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Solana Wallet Address..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#00FFCC]/50 transition-all placeholder:text-white/20"
          />
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="absolute right-2 top-2 bottom-2 px-6 bg-[#00FFCC] text-black font-black italic rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2 uppercase text-xs"
          >
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Scan'}
          </button>
        </div>

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 mt-4"
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-[#00FFCC] uppercase font-bold">
                <span>Initializing Neural Link...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#00FFCC] shadow-[0_0_10px_#00FFCC]"
                />
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 font-mono text-[10px] uppercase mt-2 bg-red-400/10 p-3 rounded-xl border border-red-400/20"
            >
              Error: {error}
            </motion.div>
          )}

          {results && !isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">SOL Balance</span>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#00FFCC]" />
                    <span className="text-xl font-black text-white">{results.balance.toFixed(4)}</span>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Total Tokens</span>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#00E0FF]" />
                    <span className="text-xl font-black text-white">{results.tokens.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                   <h4 className="text-xs font-black text-white uppercase italic">Active Assets</h4>
                   <Activity className="w-4 h-4 text-[#00FFCC] animate-pulse" />
                </div>
                <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
                  {results.tokens.length > 0 ? results.tokens.map((token, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/40">{token.mint.slice(0, 4)}...{token.mint.slice(-4)}</span>
                      <span className="text-[#00FFCC] font-bold">{token.amount.toLocaleString()}</span>
                    </div>
                  )) : (
                    <div className="text-center text-white/20 font-mono text-[10px] py-4">No tokens found</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
