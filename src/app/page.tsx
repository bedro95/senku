"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Globe, 
  ChevronRight, Trophy, TrendingUp, Music, Github
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function SenkuMasterpieceComplete() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // 1. نظام الصوت المتطور
  useEffect(() => {
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.4;
    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const handleInteraction = () => {
      if (!isMuted && bgMusic.current?.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, [isMuted]);

  // 2. محاكاة بيانات الرادار
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
    setIsMuted(!isMuted);
    if (bgMusic.current) {
      isMuted ? bgMusic.current.play() : bgMusic.current.pause();
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
    } catch (e) { alert("Address Error!"); } finally { setLoading(false); }
  };

  const saveCard = () => {
    if (!cardRef.current) return;
    toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then((url) => {
      const link = document.createElement('a');
      link.download = `SENKU-${data?.id}.png`;
      link.href = url;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-6 md:p-10 font-sans overflow-hidden relative border-[4px] border-transparent animate-neon-border">
      
      {/* التأثيرات الخلفية */}
      <div className="fixed inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,242,255,0.1)]" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh" }} transition={{ duration: Math.random() * 10 + 7, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-[1px] bg-cyan-400 rounded-full" style={{ left: `${Math.random() * 100}vw`, top: `-10px` }} />
        ))}
      </div>

      {/* شخصية Senku */}
      <motion.div className="fixed z-[1] pointer-events-none mix-blend-screen opacity-40"
        animate={{ x: [0, 50, -50, 0], y: [0, -20, 20, 0] }} transition={{ duration: 20, repeat: Infinity }} style={{ top: '30%', left: '25%' }}>
        <img src="/senku.GIF" alt="Senku" className="w-[300px] md:w-[550px]" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }} />
      </motion.div>

      {/* التحكم بالصوت */}
      <button onClick={toggleMute} className="fixed top-8 right-8 z-[100] p-4 bg-white/5 border border-cyan-500/30 rounded-full backdrop-blur-xl hover:shadow-[0_0_20px_#00f2ff] transition-all">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-cyan-400" />}
      </button>

      {/* الملاحة */}
      <nav className="relative z-[90] flex bg-black/50 border border-white/10 p-1 rounded-2xl mb-12 backdrop-blur-3xl shadow-2xl">
        {['scan', 'radar', 'hall of fame'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-cyan-600 shadow-[0_0_15px_#00f2ff]' : 'opacity-30 hover:opacity-100'}`}>{tab}</button>
        ))}
      </nav>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center flex-grow justify-center">
        
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <h1 className="text-[15vw] md:text-[12rem] font-[1000] italic tracking-tighter leading-none text-center drop-shadow-[0_0_50px_rgba(0,242,255,0.3)] mb-4">SENKU</h1>
            <p className="text-[10px] font-mono tracking-[1.5em] text-cyan-400 uppercase mb-12">Scientific Protocol</p>
            
            <div className="w-full max-w-md px-4">
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-center outline-none focus:border-cyan-500 transition-all mb-4 font-mono text-sm" 
                placeholder="WALLET_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button onClick={analyze} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all">
                {loading ? "SEARCHING..." : "START SCAN"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-12 w-full flex justify-center pb-20">
                  <div ref={cardRef} className="relative w-full max-w-[450px] aspect-[1.6/1] bg-black border-[2px] rounded-[2.5rem] p-10 shadow-2xl animate-neon-card" style={{ borderColor: data.tierColor }}>
                    <div className="flex justify-between items-start"><Fingerprint size={35} style={{ color: data.tierColor }} /><Activity size={18} className="text-red-500 animate-pulse" /></div>
                    <div className="text-6xl font-[1000] italic my-8">{data.sol} <span className="text-xl" style={{ color: data.tierColor }}>SOL</span></div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div><p className="text-[9px] opacity-40 uppercase font-black">Rank Status</p><p className="text-3xl font-[1000] italic" style={{ color: data.tierColor }}>{data.status}</p></div>
                      <button onClick={saveCard} className="p-4 bg-white/5 rounded-2xl border border-white/10"><Download size={20} /></button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-4 pb-20">
            <h2 className="text-4xl font-black italic uppercase mb-10 flex items-center gap-4"><Zap className="text-cyan-400" /> Live Feed</h2>
            <div className="space-y-4">
              {whaleAlerts.map((alert) => (
                <div key={alert.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex justify-between items-center border-l-4 border-l-cyan-500">
                  <div><div className="text-2xl font-black italic">{alert.amount} <span className="text-xs text-cyan-400">{alert.asset}</span></div><div className="text-[10px] opacity-30 font-mono uppercase tracking-widest">{alert.type} • ${alert.usd}</div></div>
                  <ChevronRight className="text-cyan-500" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-20">
            {[
              { name: "SENKU_MASTER", amount: "25,400", rank: "1" },
              { name: "SCIENCE_KING", amount: "12,100", rank: "2" },
              { name: "CHROME_SOL", amount: "8,300", rank: "3" },
              { name: "KOHAKU_WHALE", amount: "5,100", rank: "4" }
            ].map((whale, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center gap-6 relative group hover:border-cyan-500/50 transition-all">
                <Trophy size={50} className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-20 transition-all text-cyan-400" />
                <div className="w-14 h-14 rounded-2xl bg-cyan-600 flex items-center justify-center font-black text-2xl italic shadow-[0_0_15px_#00f2ff]">#{whale.rank}</div>
                <div><div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">{whale.name}</div><div className="text-3xl font-black italic">{whale.amount} <span className="text-xs opacity-20 italic">SOL</span></div></div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* تذييل المطور المرتب */}
      <footer className="relative z-[100] py-10 w-full flex flex-col items-center gap-4">
        <a href="https://github.com/bader-alkorgli" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 hover:border-cyan-500/50 transition-all">
          <Github size={18} className="group-hover:text-cyan-400 transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">Developer Portal</span>
        </a>
        <p className="text-[8px] font-mono tracking-[1em] opacity-20 uppercase">Senku World © 2025</p>
      </footer>

      <style jsx global>{`
        @keyframes neon-pulse {
          0%, 100% { border-color: rgba(0,242,255,0.2); box-shadow: 0 0 10px rgba(0,242,255,0.1); }
          50% { border-color: rgba(0,242,255,0.5); box-shadow: 0 0 30px rgba(0,242,255,0.2); }
        }
        @keyframes neon-card-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,242,255,0.1); }
          50% { box-shadow: 0 0 50px rgba(0,242,255,0.3); }
        }
        .animate-neon-border { animation: neon-pulse 4s infinite; }
        .animate-neon-card { animation: neon-card-pulse 3s infinite; }
        body { background: #000; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
