"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Radio, 
  ShieldCheck, 
  Fingerprint, 
  Volume2, 
  VolumeX, 
  Activity, 
  Cpu,
  TrendingUp,
  Zap,
  Lock
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiWhaleProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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

      // Whale Tier Logic
      let tierColor = "#22c55e"; // Green
      if (sol >= 100) tierColor = "#3b82f6"; // Blue
      if (sol >= 1000) tierColor = "#facc15"; // Gold (White Whale)

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "WAGMI SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });

      if (scanSound.current) scanSound.current.pause();
    } catch (e) {
      if (scanSound.current) scanSound.current.pause();
      alert("Address check failed. Is the logic sound?");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-PROTOCOL-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-blue-500">
      
      {/* 1. SNOW SYSTEM (Persistent) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 8 + 4, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_#fff]"
          />
        ))}
      </div>

      {/* 2. OPTIMIZED SENKU (Small & Responsive) */}
      <motion.div 
        className="fixed bottom-4 left-[-20px] md:left-4 z-50 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative group">
          <img 
            src="/senku.png" 
            alt="Senku"
            className="w-[180px] md:w-[320px] lg:w-[400px] h-auto drop-shadow-[0_0_30px_rgba(34,197,94,0.3)] filter contrast-125"
          />
          <div className="absolute top-[20%] left-[60%] px-3 py-1 bg-black/60 backdrop-blur-md border border-green-500/30 rounded-full text-[8px] md:text-[10px] font-mono text-green-400">
            {loading ? "PROCESSING..." : "IDLE"}
          </div>
        </div>
      </motion.div>

      {/* 3. MUTE BUTTON */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-4 right-4 z-[60] p-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 transition-all"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-blue-400" />}
      </button>

      {/* 4. HEADER SECTION */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-10 md:mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center mb-10"
        >
          <h1 className="text-6xl md:text-[11rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            WAGMI
          </h1>
          <p className="mt-2 text-[10px] md:text-lg font-mono tracking-[0.8em] text-blue-500 uppercase font-black italic">
               WAGMI WHALE PROTOCOL
          </p>
        </motion.div>

        {/* 5. INPUT ENGINE */}
        <div className="w-full max-w-md px-4 mb-12 relative z-20">
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 to-white/10 focus-within:from-blue-500 focus-within:to-green-500 transition-all duration-500 shadow-2xl">
            <input 
              className="w-full bg-black/80 backdrop-blur-xl rounded-2xl p-5 md:p-6 text-center outline-none font-mono text-sm md:text-lg text-white placeholder:text-white/20" 
              placeholder="PASTE SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading}
            className="w-full mt-4 py-5 md:py-6 bg-white text-black rounded-2xl font-black uppercase text-xs md:text-sm tracking-[0.4em] hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
          >
            {loading ? <><Cpu className="animate-spin" size={18} /> SCANNING</> : <><Zap size={18} /> START ANALYSIS</>}
          </button>
        </div>

        {/* 6. WHALE ASSET CARD */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="w-full flex flex-col items-center gap-8 pb-32 px-4"
            >
              <div ref={cardRef} className="relative w-full max-w-[500px] aspect-[1.6/1] bg-[#050505] border border-white/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20" style={{ backgroundColor: data.tierColor }} />
                
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <Fingerprint size={24} style={{ color: data.tierColor }} />
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-black italic leading-none">WAGMI ASSET</p>
                      <p className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Verified Node</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-white/20" />
                </div>

                <div>
                  <div className="flex items-end gap-2">
                    <h2 className="text-6xl md:text-7xl font-[1000] tracking-tighter italic">{data.sol}</h2>
                    <span className="text-lg font-black italic pb-3" style={{ color: data.tierColor }}>SOL</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono mt-1">
                    <TrendingUp size={12} />
                    <span>LIQUIDITY INDEX: OPTIMAL</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-6 z-10">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-40">Classification</p>
                    <p className="text-2xl md:text-3xl font-[1000] italic uppercase" style={{ color: data.tierColor }}>{data.status}</p>
                  </div>
                  <div className="text-right">
                    <Activity size={18} className="ml-auto mb-2 animate-pulse text-white/20" />
                    <p className="text-[9px] font-mono text-white/20">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={saveCard} 
                className="flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                EXPORT ASSET <Download size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. FOOTER */}
        <footer className="mt-auto py-10 opacity-20 text-[8px] md:text-[10px] font-mono tracking-[1.5em] uppercase text-center w-full select-none">
          WAGMI // BADER ALKORGLI // 2025
        </footer>
      </div>

      <style jsx global>{`
        body { background-color: #000; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
