"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Wallet, Search, Loader2, Sparkles, Code2 } from 'lucide-react';

export default function Home() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ msg: string; bal: number } | null>(null);

  const checkWallet = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const pubKey = new PublicKey(address);
      const balance = await connection.getBalance(pubKey);
      const solAmount = balance / LAMPORTS_PER_SOL;

      let message = "";
      if (solAmount === 0) message = "Empty? You're just a tourist in the crypto world! 💸🤣";
      else if (solAmount < 1) message = "Less than 1 SOL? Is this a wallet or a piggy bank? 🐥";
      else if (solAmount < 10) message = "Nice movement! A decent wallet, but aim for the moon. 📈";
      else message = "HOLY WHALE! You're a legend in the making! 🐳🔥";

      setResult({ msg: message, bal: solAmount });
    } catch (err) {
      alert("Invalid Solana Address! Please check again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 blur-[150px] rounded-full animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
          <Sparkles size={14} className="text-green-500" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Next-Gen Analyzer</span>
        </div>
        <h1 className="text-8xl font-black italic text-white tracking-tighter">
          WAGMI<span className="text-green-500">.</span>
        </h1>
      </motion.div>

      {/* Input Section */}
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/5 p-4 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Wallet className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input 
              type="text" 
              placeholder="Enter Solana Wallet Address..."
              className="w-full bg-black/50 py-5 px-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all font-mono text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={checkWallet}
            disabled={loading}
            className="bg-white text-black font-black px-10 py-5 rounded-2xl hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
            ANALYZE
          </button>
        </div>
      </div>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 p-10 bg-[#0f0f0f] border border-green-500/20 rounded-[3rem] text-center max-w-md shadow-[0_0_50px_rgba(34,197,94,0.1)]"
          >
            <div className="text-sm text-green-500 font-bold mb-4 uppercase tracking-widest">Wallet Balance</div>
            <div className="text-5xl font-black mb-6 tracking-tight">{result.bal.toFixed(3)} SOL</div>
            <p className="text-xl font-medium text-gray-300 leading-relaxed italic">
              "{result.msg}"
            </p>
            <button 
              onClick={() => setResult(null)} 
              className="mt-8 text-xs text-gray-600 hover:text-white transition uppercase font-bold tracking-widest"
            >
              Check Another Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer with Developer Name */}
      <footer className="fixed bottom-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-gray-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <Code2 size={12} className="text-green-500" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            Developed by <span className="text-white">Bader Alkorgli</span>
          </span>
        </div>
        <div className="text-gray-800 font-black tracking-widest text-[9px] uppercase">
          WAGMI PROJECT © 2025
        </div>
      </footer>
    </main>
  );
}