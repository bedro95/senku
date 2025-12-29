"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, ShieldCheck, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Lock, Globe, ArrowUpRight, 
  BarChart3, Eye, ChevronRight
} from 'lucide-react';
import { toPng } from 'html-to-image';

// بيانات رادار الحيتان (Whale Watch Radar)
const MOCK_WHALE_DATA = [
  { id: 1, amount: "950,000", asset: "SOL", type: "Transfer", from: "Unknown", to: "Binance", time: "1m ago", usd: "142M" },
  { id: 2, amount: "3,200,000", asset: "USDC", type: "Mint", from: "Circle", to: "Whale_Alpha", time: "5m ago", usd: "3.2M" },
  { id: 3, amount: "210,000", asset: "SOL", type: "Burn", from: "Jupiter", to: "Null", time: "12m ago", usd: "31M" },
];

export default function WagmiWhaleProtocolFull() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('scan'); 
  const cardRef = useRef<HTMLDivElement>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;

      let tierColor = "#3b82f6"; // Blue
      if (sol >= 1000) tierColor = "#22c55e"; // Green
      else if (sol >= 100) tierColor = "#a855f7"; // Purple

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });
    } catch (e) {
      alert("Invalid Signal! Senku is recalculating...");
    } finally {
      setLoading(false);
      if (scanSound.current) scanSound.current.pause();
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-ASSET-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  // تفاعل Senku ذكياً مع المستخدم
  const getSenkuMessage = () => {
    if (loading) return "10 Billion Percent Chance of success! Analyzing data...";
    if (data?.status === "WHITE WHALE") return "Magnificent! This level of liquidity is illogical!";
    if (activeTab === 'radar') return "The radar is detecting high-frequency whale movements.";
    return "Science is the only way to dominate the blockchain.";
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative">
      
      {/* --- SNOW SYSTEM (Persistent) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            className="absolute w-[1.5px] h-[1.5px] bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"
          />
        ))}
      </div>

      {/* --- INTERACTIVE SENKU GIF (Swimming & Talking) --- */}
      <motion.div 
        className="fixed bottom-0 left-[-10%] md:left-4 z-50 pointer-events-none"
        animate={{ 
          y: [0, -12, 0],
          x: ["-2%", "2%", "-2%"]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative group">
          {/* هنا قمت بتبديل الصورة بالـ GIF الذي أرسلته */}
          <img 
            src="/senku.gif" 
            alt="Senku Interactive"
            className="w-[200px] md:w-[400px] h-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] rounded-3xl"
          />
          
          {/* Thought Bubble */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-12 left-[50%] bg-black/90 border border-blue-500/50 p-3 rounded-2xl rounded-bl-none text-[9px] md:text-[11px] font-mono text-blue-400 max-w-[140px] md:max-w-[220px] backdrop-blur-xl shadow-2xl"
          >
            <div className="flex gap-2 items-start">
              <Activity size={12} className="shrink-0 animate-pulse" />
              <p>{getSenkuMessage()}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- TOP CONTROLS --- */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-5 right-5 z-[60] p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 transition-all"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-blue-500" />}
      </button>

      {/* --- NAVIGATION TABS --- */}
      <div className="relative z-[70] flex bg-white/5 border border-white/10 p-1 rounded-2xl mb-14 backdrop-blur-2xl">
        <button onClick={() => setActiveTab('scan')} className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${activeTab === 'scan' ? 'bg-blue-600 text-white' : 'text-white/30'}`}>Identity Scan</button>
        <button onClick={() => setActiveTab('radar')} className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${activeTab === 'radar' ? 'bg-blue-600 text-white' : 'text-white/30'}`}>Whale Radar</button>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {activeTab === 'scan' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            {/* HERO SECTION */}
            <div className="text-center mb-12">
              <h1 className="text-7xl md:text-[11rem] font-[1000] italic tracking-tighter leading-none text-white">WAGMI</h1>
              <p className="mt-3 text-[10px] md:text-sm font-mono tracking-[0.8em] text-blue-500 uppercase font-black italic">
                   WAGMI WHALE PROTOCOL
              </p>
            </div>

            {/* INPUT SECTION */}
            <div className="w-full max-w-md px-4 mb-14">
              <div className="relative p-[1px] rounded-2xl bg-white/10 focus-within:bg-blue-600 transition-all duration-500">
                <input 
                  className="w-full bg-black/90 rounded-2xl p-5 md:p-6 text-center outline-none font-mono text-sm text-white placeholder:text-white/10" 
                  placeholder="INPUT_SOLANA_ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button 
                onClick={analyze} 
                className="w-full mt-5 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
              >
                {loading ? <Cpu className="animate-spin" size={16} /> : <Zap size={16} />} RUN_SCIENCE
              </button>
            </div>

            {/* CARD DISPLAY */}
            <AnimatePresence>
              {data && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center pb-32 px-4">
                  <div ref={cardRef} className="relative w-full max-w-[480px] aspect-[1.6/1] bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20" style={{ backgroundColor: data.tierColor }} />
                    <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-4">
                        <Fingerprint size={30} style={{ color: data.tierColor }} />
                        <span className="text-xl font-black italic tracking-tighter">WAGMI_PROTOCOL_V2</span>
                      </div>
                      <Radio size={20} className="text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-6xl md:text-7xl font-[1000] tracking-tighter italic">{data.sol} <span className="text-xl font-black" style={{ color: data.tierColor }}>SOL</span></h2>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6 z-10">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-30 italic">Wallet Rank</p>
                        <p className="text-3xl font-[1000] italic uppercase tracking-tighter" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter italic">Auth_{data.id}</p>
                    </div>
                  </div>
                  <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    EXPORT DATA <Download size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* --- WHALE RADAR VIEW --- */
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full px-4 pb-48">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <Globe className="text-blue-500 animate-spin-slow" size={34} />
                <h2 className="text-4xl md:text-5xl font-[1000] italic tracking-tighter uppercase">Market Radar</h2>
              </div>
              <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-blue-500 uppercase font-black tracking-[0.2em]">Live from X.com</span>
              </div>
            </div>

            <div className="grid gap-5">
              {MOCK_WHALE_DATA.map((whale) => (
                <motion.div 
                  key={whale.id} 
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="relative bg-[#080808] border border-white/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-md overflow-hidden"
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/5 shadow-inner">
                      {whale.asset === 'SOL' ? <Activity size={28} /> : <BarChart3 size={28} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl font-[1000] italic tracking-tighter">{whale.amount}</span>
                        <span className="text-sm font-black text-blue-500 italic mt-2">{whale.asset}</span>
                      </div>
                      <p className="text-[10px] font-mono text-white/30 uppercase italic tracking-widest">${whale.usd} VALUE DETECTED</p>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex flex-col items-end border-t md:border-t-0 border-white/5 pt-5 md:pt-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 mb-2">
                      <span className="bg-white/5 px-2 py-1 rounded">FROM: {whale.from}</span>
                      <ChevronRight size={12} className="text-blue-500" />
                      <span className="bg-white/5 px-2 py-1 rounded">TO: {whale.to}</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-500 italic tracking-[0.2em]">{whale.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 p-12 border border-white/5 rounded-[4rem] bg-gradient-to-br from-blue-600/5 to-transparent text-center">
              <Eye className="mx-auto mb-5 text-blue-500/50 animate-pulse" size={36} />
              <h3 className="text-2xl font-black italic tracking-tighter text-white/80 uppercase">Whale Accumulation Index: HIGH</h3>
              <p className="text-[10px] font-mono text-white/20 mt-3 uppercase tracking-[0.5em]">Deep sea logic initiated</p>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="mt-auto py-12 opacity-20 text-[8px] md:text-[10px] font-mono tracking-[1.5em] uppercase text-center w-full select-none">
        WAGMI // BADER ALKORGLI // 2025 PROTOCOL
      </footer>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinity; }
        body { background-color: #010101; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
