"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Globe, 
  ChevronRight, Trophy, TrendingUp, Music
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function SenkuMasterpieceFinal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // 1. نظام الموسيقى والصوت المطور
  useEffect(() => {
    // رابط موسيقى Dr. Stone (Senku Theme)
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.4;

    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const handleInteraction = () => {
      if (!isMuted && bgMusic.current && bgMusic.current.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      bgMusic.current?.pause();
    };
  }, [isMuted]);

  // 2. تحديث رادار الحيتان التلقائي
  useEffect(() => {
    const assets = ['SOL', 'USDC', 'JUP', 'BONK'];
    const generateAlert = () => {
      const newAlert = {
        id: Date.now(),
        amount: (Math.random() * 900000 + 5000).toLocaleString(),
        asset: assets[Math.floor(Math.random() * assets.length)],
        usd: (Math.random() * 100 + 1).toFixed(1) + "M",
        type: "WHALE_TX"
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 5));
    };
    const interval = setInterval(generateAlert, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      bgMusic.current?.play().catch(() => {});
    } else {
      setIsMuted(true);
      bgMusic.current?.pause();
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
    
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      let tierColor = sol >= 1000 ? "#22c55e" : sol >= 100 ? "#a855f7" : "#00f2ff";

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });
    } catch (e) {
      alert("Scientific Error! Check address.");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `SENKU-LEGACY-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-hidden relative border-[4px] border-transparent animate-neon-border">
      
      {/* توهج النيون المحيط بالموقع */}
      <div className="fixed inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,242,255,0.2)]" />

      {/* نظام الجزيئات والثلج النيوني */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        {[...Array(40)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", x: ["-20px", "20px", "-20px"] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* شخصية Senku المتحركة */}
      <motion.div className="fixed z-[1] pointer-events-none mix-blend-screen"
        animate={{ x: loading ? [0, 15, -15, 0] : [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }} style={{ top: '35%', left: '25%' }}>
        <img src="/senku.GIF" alt="Senku" className="w-[300px] md:w-[600px] opacity-40 filter brightness-125"
          style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }} />
      </motion.div>

      {/* أزرار التحكم بالصوت والنيون */}
      <div className="fixed top-8 right-8 z-[100] flex gap-4">
        <button onClick={toggleMute} className="p-5 bg-black/40 border border-cyan-500/50 rounded-full backdrop-blur-2xl hover:shadow-[0_0_30px_#00f2ff] transition-all">
          {isMuted ? <VolumeX size={24} className="text-white/30" /> : <div className="relative"><Volume2 size={24} className="text-cyan-400" /><Music size={14} className="absolute -top-3 -right-3 text-cyan-400 animate-bounce" /></div>}
        </button>
      </div>

      {/* الملاحة العلوية */}
      <nav className="relative z-[90] flex bg-white/5 border border-white/10 p-1.5 rounded-2xl mb-16 backdrop-blur-3xl shadow-2xl">
        {['scan', 'radar', 'hall of fame'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-cyan-600 text-white shadow-[0_0_30px_#00f2ff]' : 'text-white/20 hover:text-white'}`}>{tab}</button>
        ))}
      </nav>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <h1 className="text-8xl md:text-[15rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-[0_0_60px_#00f2ff44] select-none">SENKU</h1>
            <p className="text-[11px] font-mono tracking-[1.5em] text-cyan-400 uppercase font-black mb-16 animate-pulse text-center">THE_SCIENTIFIC_DOMAIN</p>

            <div className="w-full max-w-lg px-6 mb-16">
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center outline-none font-mono text-sm focus:border-cyan-500 transition-all shadow-inner" 
                placeholder="SOLANA_WALLET_ADDR" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button onClick={analyze} className="w-full mt-6 py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-xs tracking-[0.6em] hover:bg-cyan-600 hover:text-white transition-all active:scale-95 shadow-2xl">
                {loading ? "SEARCHING..." : "INITIALIZE_SCAN"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full flex justify-center pb-40">
                  <div ref={cardRef} className="relative w-full max-w-[500px] aspect-[1.6/1] bg-black/90 border-[3px] rounded-[3.5rem] p-12 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,1)] animate-neon-card" style={{ borderColor: data.tierColor }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <div className="flex justify-between mb-8"><Fingerprint size={40} style={{ color: data.tierColor }} /><Activity size={24} className="text-red-500 animate-pulse" /></div>
                    <div className="text-7xl md:text-8xl font-[1000] italic mb-12 tracking-tighter text-white">{data.sol} <span className="text-2xl" style={{ color: data.tierColor }}>SOL</span></div>
                    <div className="flex justify-between items-end border-t border-white/10 pt-8">
                      <div><p className="text-[10px] opacity-40 uppercase tracking-widest font-black mb-1">Status Report</p><p className="text-4xl font-[1000] italic uppercase" style={{ color: data.tierColor }}>{data.status}</p></div>
                      <button onClick={saveCard} className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all shadow-xl"><Download size={26} /></button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* باقي التبويبات مع الحفاظ على التوهج */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pb-48 space-y-5">
            <h2 className="text-5xl font-[1000] italic uppercase flex items-center gap-5 mb-12 tracking-tighter"><Zap className="text-cyan-400 animate-bounce" /> Live Radar Feed</h2>
            {whaleAlerts.map((alert) => (
              <div key={alert.id} className="bg-black border border-white/10 p-8 rounded-[2rem] flex justify-between items-center border-l-[6px] border-l-cyan-500 hover:shadow-[0_0_25px_rgba(0,242,255,0.2)] transition-all group">
                <div><div className="text-3xl font-[1000] italic group-hover:text-cyan-400 transition-all">{alert.amount} <span className="text-xs text-cyan-400">{alert.asset}</span></div><div className="text-[11px] font-mono text-white/30 uppercase mt-1 tracking-widest">{alert.type} • ${alert.usd}</div></div>
                <ChevronRight className="text-cyan-500 group-hover:translate-x-2 transition-transform" size={24} />
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-48 max-w-5xl">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-10 rounded-[3rem] relative group overflow-hidden shadow-2xl hover:border-cyan-500 transition-all">
                <Trophy size={80} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-all text-cyan-400" />
                <div className="w-20 h-20 rounded-2xl bg-cyan-600 flex items-center justify-center font-[1000] text-4xl italic mb-6 shadow-[0_0_30px_#00f2ff]">#{i}</div>
                <div className="text-4xl font-[1000] italic tracking-tighter uppercase">Elite_Whale_{i}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <footer className="mt-auto py-12 opacity-20 text-[11px] font-mono tracking-[2em] text-center w-full uppercase select-none">SENKU_WORLD_2025 // BADER_ALKORGLI</footer>

      <style jsx global>{`
        @keyframes neon-pulse {
          0%, 100% { border-color: #00f2ff33; box-shadow: 0 0 15px #00f2ff22; }
          50% { border-color: #22c55e66; box-shadow: 0 0 35px #22c55e44; }
        }
        @keyframes neon-card-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(0,242,255,0.1); }
          50% { box-shadow: 0 0 80px rgba(0,242,255,0.4); }
        }
        .animate-neon-border { animation: neon-pulse 4s infinite ease-in-out; }
        .animate-neon-card { animation: neon-card-pulse 3s infinite ease-in-out; }
        body { background: #000; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
