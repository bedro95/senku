"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ShieldCheck, Coins, Database, Activity, Fingerprint, Cpu, Globe } from 'lucide-react';
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
    address: string;
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
          setResults({ balance: solBalance, tokens, address });
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
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              className="mt-8 flex flex-col items-center"
            >
              {/* DIGITAL ID CARD RESULT */}
              <div className="relative aspect-[1.6/1] w-full bg-[#050505] rounded-[2rem] border border-[#00FFCC]/40 overflow-hidden shadow-[0_0_80px_rgba(0,255,204,0.2)] p-8 flex flex-col justify-between group">
                
                {/* Background Watermark - senku.GIF */}
                <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30">
                  <img src="/senku.GIF" alt="Watermark" className="w-full h-full object-cover grayscale mix-blend-screen" />
                </div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-[#00FFCC]" />
                      <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">Quantum ID</h4>
                    </div>
                    <span className="text-[8px] font-mono tracking-[0.4em] text-[#00FFCC] uppercase">Verified Neural Signature</span>
                  </div>
                  <div className="p-2 bg-[#00FFCC]/10 border border-[#00FFCC]/30 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-[#00FFCC]" />
                  </div>
                </div>

                {/* Main Data Section */}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em]">Neural Address</span>
                    <div className="text-xs font-mono text-white bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-md">
                      {results.address.slice(0, 12)}...{results.address.slice(-12)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em]">SOL Reserve</span>
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-[#00FFCC]" />
                        <span className="text-xl font-black text-white">{results.balance.toFixed(4)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em]">Active Assets</span>
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#00E0FF]" />
                        <span className="text-xl font-black text-white">{results.tokens.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">Access Level</span>
                    <span className="text-xs font-bold text-[#00FFCC] uppercase tracking-tighter">Quantum Scientist v.1</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/20">
                    <Cpu className="w-4 h-4" />
                    <Globe className="w-4 h-4" />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00FFCC]/20 to-transparent blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.05)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-20" />
                
                {/* Scanning Light Effect */}
                <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#00FFCC]/10 to-transparent skew-x-12 pointer-events-none"
                />
              </div>

              {/* ADDITIONAL TOKEN LIST (SCROLLABLE) */}
              {results.tokens.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full mt-6 bg-black/40 border border-white/10 p-6 rounded-[2rem] flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                     <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Neural Inventory List</h4>
                     <Activity className="w-4 h-4 text-[#00FFCC] animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                    {results.tokens.map((token, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-mono p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-white/40">{token.mint.slice(0, 6)}...</span>
                        <span className="text-[#00FFCC] font-bold">{token.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
