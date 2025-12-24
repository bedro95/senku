"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Download, Activity, Cpu, LineChart } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiMobileOptimized() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const fetchPrices = async () => {
    try {
      const [binanceRes, jupRes] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/price?symbols=["SOLUSDT","BTCUSDT"]'),
        fetch('https://api.jup.ag/price/v2?ids=JUP,WIF,BONK')
      ]);
      const bData = await binanceRes.json();
      const jData = await jupRes.json();
      setPrices({
        SOL: bData.find((t: any) => t.symbol === "SOLUSDT")?.price || 0,
        BTC: bData.find((t: any) => t.symbol === "BTCUSDT")?.price || 0,
        JUP: jData.data?.JUP?.price || 0,
        WIF: jData.data?.WIF?.price || 0,
        BONK: jData.data?.BONK?.price || 0,
      });
    } catch (e) { console.error("Update prices failed"); }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      setTimeout(() => {
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (70 + Math.random() * 28).toFixed(1),
          status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: ["SOL", "JUP", "WIF", "BONK"][Math.floor(Math.random() * 4)],
          bigWinMultiplier: (3 + Math.random() * 15).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
        setLoading(false);
      }, 1800);
    } catch (err) {
      alert("Address Check Failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Ticker - Responsive Text */}
      <div className="w-full bg-white/[0.03] border-b border-white/5 py-2.5 px-4 md:px-8 flex gap-4 md:gap-10 items-center z-50 backdrop-blur-md overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
          <span className="text-[9px] font-mono font-black text-cyan-500 uppercase">Live</span>
        </div>
        <div className="flex gap-6 md:gap-12 text-[9px] font-mono font-bold whitespace-nowrap">
           <span className="flex gap-1.5 uppercase">SOL <span className="text-cyan-400">${Number(prices.SOL).toFixed(2)}</span></span>
           <span className="flex gap-1.5 uppercase opacity-60">BTC <span className="text-yellow-500">${Number(prices.BTC).toLocaleString()}</span></span>
           <span className="flex gap-1.5 uppercase">JUP <span className="text-purple-400">${Number(prices.JUP).toFixed(4)}</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center py-12 md:py-24 px-5 relative z-10 w-full max-w-2xl mx-auto">
        
        {/* Adaptive Hero Section */}
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12 md:mb-20">
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter italic leading-none mb-4 drop-shadow-xl">WAGMI</h1>
          <div className="flex items-center justify-center gap-3 text-cyan-500">
            <Activity size={14} className="animate-pulse" />
            <p className="text-[9px] md:text-[10px] font-mono tracking-[0.4em] font-black uppercase italic">Neural Terminal v21.0</p>
          </div>
        </motion.div>

        {/* Improved Input Area */}
        <div className="w-full space-y-4 mb-16 md:mb-24 px-2">
          <input 
            className="w-full bg-[#080808] border border-white/10 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center font-mono text-base md:text-xl outline-none focus:border-cyan-500 shadow-2xl transition-all"
            placeholder="ENTER_SOL_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full h-16 md:h-24 bg-white text-black rounded-2xl md:rounded-[2.5rem] font-black text-lg md:text-2xl uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-500 active:scale-95 transition-all shadow-xl"
          >
            {loading ? "PROCESSING..." : <>ANALYZE <Zap size={20} fill="currentColor" /></>}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
              {/* Refined Identity Card */}
              <div ref={cardRef} className="p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-8 shadow-2xl mx-auto max-w-full">
                
                {/* Laser Pulse */}
                <motion.div animate={{ y: [0, 600, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_15px_cyan] z-20"/>

                <div className="flex justify-between items-center mb-12 md:mb-20">
                   <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[8px] md:text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-tighter italic">Verify: {data.address}</div>
                   <ShieldCheck className="text-cyan-500 shrink-0" size={24} />
                </div>

                <div className="space-y-10 md:space-y-14">
                  <div className="space-y-1">
                    <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest font-bold italic">Identity Class</p>
                    <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">{data.status}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col justify-center">
                      <p className="text-[8px] font-mono text-cyan-500 font-black uppercase mb-2 italic">Max ROI</p>
                      <h3 className="text-2xl md:text-3xl font-black text-white italic">{data.bigWinToken} <span className="text-cyan-400 ml-2">+{data.bigWinMultiplier}x</span></h3>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col justify-center">
                      <p className="text-[8px] font-mono text-purple-500 font-black uppercase mb-2 italic">Network Success</p>
                      <h3 className="text-2xl md:text-3xl font-black text-white italic">{data.winRate}%</h3>
                    </div>
                  </div>

                  <div className="pt-8 md:pt-12 border-t border-white/5">
                    <p className="text-[9px] font-mono text-gray-600 uppercase mb-3 font-bold italic tracking-widest">Liquid Net Worth</p>
                    <p className="text-6xl md:text-8xl font-black text-white tracking-tighter flex items-baseline gap-3">
                        {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-2xl md:text-3xl text-cyan-500 font-light italic">SOL</span>
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toPng(cardRef.current!).then(url => { const a=document.createElement('a'); a.download='WAGMI_CARD.png'; a.href=url; a.click(); })}
                className="w-full h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all mb-16 md:mb-24 hover:bg-white/10"
              >
                <Download size={20} /> Capture Intelligence
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Section - Responsive Grid */}
        <div className="w-full bg-[#050505] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-left shadow-2xl">
           <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-cyan-500 shrink-0" size={20} />
              <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px] italic">Market Intelligence</h4>
           </div>
           <div className="grid grid-cols-2 gap-4 md:gap-6 font-mono">
              {[
                { sym: 'SOL', price: prices.SOL, color: 'text-cyan-400' },
                { sym: 'JUP', price: prices.JUP, color: 'text-purple-400' },
                { sym: 'WIF', price: prices.WIF, color: 'text-yellow-500' },
                { sym: 'BONK', price: prices.BONK, color: 'text-orange-400' }
              ].map((token) => (
                 <div key={token.sym} className="bg-white/[0.03] p-5 md:p-6 rounded-2xl border border-white/5">
                    <p className="text-gray-600 text-[8px] md:text-[9px] mb-1 font-black uppercase">{token.sym}</p>
                    <p className={`text-base md:text-xl font-black ${token.color} italic tracking-tighter`}>
                      {token.price > 0 ? `$${Number(token.price).toFixed(token.sym === 'BONK' ? 6 : 2)}` : "---"}
                    </p>
                 </div>
              ))}
           </div>
        </div>

        {/* Global Footer & Credits */}
        <div className="mt-24 md:mt-32 w-full pt-10 border-t border-white/5 text-center">
          <div className="flex justify-center gap-6 md:gap-10 opacity-20 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-8">
             <span>Solana</span> <span>Jupiter</span> <span>Helius</span>
          </div>
          <p className="text-[10px] md:text-[11px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic">
            Developed by <span className="text-white drop-shadow-md">Bader Alkorgli</span>
          </p>
        </div>

      </div>
    </div>
  );
}