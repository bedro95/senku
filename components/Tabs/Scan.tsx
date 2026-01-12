import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertTriangle, CheckCircle2, Globe, TrendingUp } from 'lucide-react';

const ScanTab = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // جلب البيانات من DexScreener API (بيانات حقيقية 100%)
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
      const data = await response.json();

      if (data.pairs && data.pairs.length > 0) {
        // نأخذ أول زوج متاح (غالباً يكون الأنشط مع SOL)
        setResult(data.pairs[0]);
      } else {
        setError("No data found for this address. Make sure it's a Solana contract.");
      }
    } catch (err) {
      setError("Failed to fetch data from Solana network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input Section */}
      <form onSubmit={handleScan} className="relative group">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Solana Token Address (CA)..."
          className="w-full bg-black/40 border-2 border-white/5 p-6 rounded-[24px] text-white font-mono text-sm focus:outline-none focus:border-[#14F195]/50 transition-all pl-14 shadow-2xl backdrop-blur-xl"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#14F195] transition-colors" />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#14F195] hover:bg-[#19FBDB] text-black px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analyze"}
        </button>
      </form>

      {/* Result Display Area */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-mono text-center">
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Token Info Card */}
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[30px] backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] p-0.5">
                   <img src={result.info?.imageUrl || "/api/placeholder/48/48"} alt="icon" className="w-full h-full rounded-full object-cover bg-black" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-white">{result.baseToken.name}</h3>
                  <p className="text-[#14F195] text-xs font-mono">${result.baseToken.symbol}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Price USD</p>
                  <p className="text-lg font-mono text-white">${parseFloat(result.priceUsd).toFixed(8)}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">24h Change</p>
                  <p className={`text-lg font-mono ${result.priceChange.h24 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.priceChange.h24}%
                  </p>
                </div>
              </div>
            </div>

            {/* Market Stats Card */}
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[30px] backdrop-blur-md space-y-4">
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Liquidity</span>
                  <span className="text-sm font-mono text-[#19FBDB]">${result.liquidity?.usd?.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Market Cap</span>
                  <span className="text-sm font-mono text-white">${result.fdv?.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Volume 24h</span>
                  <span className="text-sm font-mono text-white">${result.volume.h24?.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">DEX</span>
                  <span className="text-[10px] font-mono bg-[#9945FF]/20 text-[#9945FF] px-2 py-0.5 rounded uppercase">
                    {result.dexId}
                  </span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanTab;
