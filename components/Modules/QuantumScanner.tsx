"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ShieldCheck, Coins, Database, Activity } from 'lucide-react';
import { Connection, PublicKey } from '@solana/web3.js';

// Using a more reliable set of RPC nodes
const RPC_ENDPOINTS = [
  "https://solana-mainnet.g.allnodes.com",
  "https://rpc.ankr.com/solana",
  "https://solana-api.projectserum.com",
  "https://api.mainnet-beta.solana.com"
];

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
    if (!address) {
      setError('Neural Link ID Required');
      return;
    }
    
    try {
      new PublicKey(address);
    } catch (e) {
      setError('Invalid Neural Signature (Address)');
      return;
    }

    setIsScanning(true);
    setProgress(0);
    setError('');
    setResults(null);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (Math.random() * 15), 95));
    }, 400);

    // Try multiple RPCs to handle congestion
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        const connection = new Connection(endpoint, {
          commitment: 'confirmed',
          confirmTransactionInitialTimeout: 30000
        });
        const pubkey = new PublicKey(address);
        
        // Use a timeout for the balance check to fail fast and move to next RPC
        const balancePromise = connection.getBalance(pubkey);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('RPC Timeout')), 8000)
        );

        const balance = await Promise.race([balancePromise, timeoutPromise]) as number;
        
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubkey, {
          programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        });

        const solBalance = balance / 1e9;
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
        
        return; 

      } catch (err: any) {
        console.warn(`Node ${endpoint} rejected link:`, err);
        continue; 
      }
    }

    clearInterval(progressInterval);
    setError('Global Congestion: High frequency detected. Syncing with secondary nodes...');
    // Implement a 5-second automatic retry
    setTimeout(() => {
       if (address) handleScan();
    }, 5000);
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
            onChange={(e) => {
              setAddress(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            placeholder="Enter Solana Wallet Address..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#00FFCC]/50 transition-all placeholder:text-white/20"
          />
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="absolute right-2 top-2 bottom-2 px-6 bg-[#00FFCC] text-black font-black italic rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2 uppercase text-xs shadow-[0_0_20px_rgba(0,255,204,0.4)]"
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
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#00FFCC] to-[#00E0FF] shadow-[0_0_15px_rgba(0,255,204,0.6)]"
                />
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-400 font-mono text-[10px] uppercase mt-2 bg-red-400/10 p-4 rounded-2xl border border-red-400/20 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}

          {results && !isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl flex flex-col gap-1 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FFCC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest relative z-10">SOL Balance</span>
                  <div className="flex items-center gap-2 relative z-10">
                    <Coins className="w-4 h-4 text-[#00FFCC]" />
                    <span className="text-xl font-black text-white">{results.balance.toFixed(4)}</span>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl flex flex-col gap-1 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00E0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest relative z-10">Asset Count</span>
                  <div className="flex items-center gap-2 relative z-10">
                    <Database className="w-4 h-4 text-[#00E0FF]" />
                    <span className="text-xl font-black text-white">{results.tokens.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 p-6 rounded-[2rem] flex flex-col gap-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC]" />
                     <h4 className="text-xs font-black text-white uppercase italic tracking-wider">Neural Inventory</h4>
                   </div>
                   <Activity className="w-4 h-4 text-[#00FFCC] animate-pulse" />
                </div>
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                  {results.tokens.length > 0 ? results.tokens.map((token, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-mono p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-white/40">{token.mint.slice(0, 4)}...{token.mint.slice(-4)}</span>
                      </div>
                      <span className="text-[#00FFCC] font-bold">{token.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  )) : (
                    <div className="flex flex-col items-center gap-2 py-8 opacity-20">
                      <Database className="w-8 h-8" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">No assets detected</span>
                    </div>
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
