"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Globe, 
  BarChart3, Eye, ChevronRight
} from 'lucide-react';
import { toPng } from 'html-to-image';

// بيانات رادار الحيتان (Whale Radar Data)
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

      let tierColor = sol >= 1000 ? "#22c55e" : "#3b82f6";
      
      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });
    } catch (e) {
      alert("Science requires precision! Invalid Address.");
    } finally {
      setLoading(false);
      if (scanSound.current) scanSound.current.pause();
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-CARD-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-hidden relative">
      
      {/* --- BACKGROUND: SNOW SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1.5px] h-[1.5px] bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"
            style={{ left: `${Math.random() * 100}vw` }}
          />
        ))}
      </div>

      {/* --- INTERACTIVE SENKU GIF (Swimming in Background) --- */}
      <motion.div 
        className="fixed z-[1] pointer-events-none mix-blend-screen"
        animate={{ 
          x: [0, 120, -120, 0],
          y: [0, -60, 60, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '38%', left: '28%' }}
      >
        <div className="relative">
          <img 
            src="/senku.GIF" 
            alt="Senku"
            className="w-[260px] md:w-[520px] opacity-50 filter contrast-125 brightness-110 drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            style={{ 
              maskImage: 'radial-gradient(circle, black 55%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 100%)'
            }}
          />
          <motion.div className="absolute -top-4 -right-4 bg-black/80 border border-blue-500/40 p-2 rounded-xl text-[9px] font-mono text-blue-400 backdrop-blur-md">
            {loading ? "10 Billion Percent Chance..." : "Science is the rules of the ocean."}
          </motion.div>
        </div>
      </motion.div>

      {/* --- UI CONTROLS --- */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-5 right-5 z-[80] p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-blue-500" />}
      </button>

      {/* --- NAVIGATION TABS --- */}
      <div className="relative z-[70] flex bg-white/5 border border-white/10 p-1 rounded-2xl mb-14 backdrop-blur-2xl">
        <button 
          onClick={() => setActiveTab('scan')} 
          className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'scan' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'text-white/30 hover:text-white'}`}
        >
          Identity Scan
        </button>
        <button 
          onClick={() => setActiveTab('radar')} 
          className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'radar' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'text-white/30 hover:text-white'}`}
        >
          Whale Radar
        </button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {activeTab === 'scan' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <h1 className="text-7xl md:text-[11rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-2xl">WAGMI</h1>
            <p className="mt-3 text-[10px] md:text-sm font-mono tracking-[0.8em] text-blue-500 uppercase font-black italic mb-12">WAGMI WHALE PROTOCOL</p>

            <div className="w-full max-w-md px-4 mb-16">
              <div className="relative p-[1px] rounded-2xl bg-white/10 focus-within:bg-blue-600 transition-all duration-500">
                <input 
                  className="w-full bg-black/90 rounded-2xl p-5 md:p-6 text-center outline-none font-mono text-sm text-white placeholder:text-white/10" 
                  placeholder="SOLANA_ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button 
                onClick={analyze} 
                className="w-full mt-5 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
              >
                {loading ? <Cpu className="animate-spin" size={16} /> : <Zap size={16} />} RUN_ANALYSIS
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center pb-32 px-4">
                  <div ref={cardRef} className="relative w-full max-w-[480px] aspect-[1.6/1] bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)]">
                    <div className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-25" style={{ backgroundColor: data.tierColor }} />
                    <div className="flex justify-between items-start z-10">
                      <Fingerprint size={30} style={{ color: data.tierColor }} />
                      <Radio size={20} className="text-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-6xl md:text-7xl font-[1000] tracking-tighter italic z-10">
                      {data.sol} <span className="text-xl font-black" style={{ color: data.tierColor }}>SOL</span>
                    </h2>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6 z-10">
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-30 italic">Registry Rank</p>
                        <p className="text-3xl font-[1000] italic uppercase tracking-tighter" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <p className="text-[9px] font-mono text-white/20">AUTH_ID_{data.id}</p>
                    </div>
                  </div>
                  <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full font-black text-[9px] uppercase hover:bg-white hover:text-black transition-all">
                    SAVE IDENTITY ASSET <Download size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full px-4 pb-48">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <Globe className="text-blue-500 animate-spin-slow" size={34} />
                <h2 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter">Whale Radar</h2>
              </div>
              <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 font-black animate-pulse">RADAR_LIVE</span>
            </div>

            <div className="grid gap-6">
              {MOCK_WHALE_DATA.map((whale) => (
                <div key={whale.id} className="bg-[#080808]/85 border border-white/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-md border-l-4" style={{ borderColor: 'rgba(59,130,246,0.3)' }}>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/5">
                      {whale.asset === 'SOL' ? <Activity size={28} /> : <BarChart3 size={28} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl font-[1000] italic tracking-tighter">{whale.amount}</span>
                        <span className="text-sm font-black text-blue-500 mt-2">{whale.asset}</span>
                      </div>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest italic">${whale.usd} DETECTED</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 w-full md:w-auto">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                      <span className="bg-white/5 px-2 py-1 rounded">FROM: {whale.from}</span>
                      <ChevronRight size={12} className="text-blue-500" />
                      <span className="bg-white/5 px-2 py-1 rounded">TO: {whale.to}</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-500 italic uppercase">{whale.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-12 border border-white/5 rounded-[4rem] bg-gradient-to-br from-blue-600/5 to-transparent text-center border-dashed">
              <Eye className="mx-auto mb-5 text-blue-500/40" size={36} />
              <h3 className="text-2xl font-[1000] italic text-white/80 uppercase">Accumulation Index: CRITICAL</h3>
              <p className="text-[10px] font-mono text-white/20 mt-3 tracking-[0.4em] uppercase">Deep Ocean Analytics v2.0</p>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="mt-auto py-12 opacity-10 text-[8px] md:text-[10px] font-mono tracking-[1.5em] uppercase text-center w-full select-none">
        WAGMI // BADER ALKORGLI // 2025 PROTOCOL
      </footer>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinity; }
        body { background-color: #010101; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
