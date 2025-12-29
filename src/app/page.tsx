"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Globe, 
  ChevronRight, Trophy, TrendingUp, Music, Github, Layers
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function SenkuMasterpieceV3() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    const assets = ['SOL', 'USDC', 'JUP', 'BONK'];
    const generateAlert = () => {
      const newAlert = {
        id: Date.now(),
        amount: (Math.random() * 900000 + 5000).toLocaleString(),
        asset: assets[Math.floor(Math.random() * assets.length)],
        usd: (Math.random() * 100 + 1).toFixed(1) + "M",
        type: "NEO_TRANSFER"
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
    } catch (e) { alert("Invalid Lab Address!"); } finally { setLoading(false); }
  };

  const saveCard = () => {
    if (!cardRef.current) return;
    toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then((url) => {
      const link = document.createElement('a');
      link.download = `SENKU-LAB-${data?.id}.png`;
      link.href = url;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-6 md:p-10 font-sans overflow-hidden relative border-[3px] border-transparent animate-neon-border">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,242,255,0.05)]" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh" }} transition={{ duration: Math.random() * 12 + 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-[1px] bg-cyan-500 rounded-full" style={{ left: `${Math.random() * 100}vw`, top: `-10px` }} />
        ))}
      </div>

      {/* Senku Interactive Element */}
      <motion.div className="fixed z-[1] pointer-events-none mix-blend-screen opacity-30 select-none"
        animate={{ x: [0, 40, -40, 0], y: [0, -20, 20, 0] }} transition={{ duration: 25, repeat: Infinity }} style={{ top: '30%', left: '25%' }}>
        <img src="/senku.GIF" alt="Senku" className="w-[350px] md:w-[600px]" style={{ maskImage: 'radial-gradient(circle, black 45%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 100%)' }} />
      </motion.div>

      {/* Top Floating Controls */}
      <div className="fixed top-8 right-8 z-[100] flex gap-3">
        <button onClick={toggleMute} className="p-4 bg-white/5 border border-cyan-500/20 rounded-full backdrop-blur-3xl hover:border-cyan-500 transition-all shadow-xl">
          {isMuted ? <VolumeX size={20} className="opacity-40" /> : <Volume2 size={20} className="text-cyan-400 animate-pulse" />}
        </button>
      </div>

      {/* FEATURE BAR - REFINED & SYMMETRIC */}
      <nav className="relative z-[90] flex items-center justify-center mb-16 mt-4">
        <div className="flex bg-black/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {['scan', 'radar', 'hall of fame'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${
                activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'
              }`}
            >
              {activeTab === tab && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 shadow-[0_0_20px_rgba(0,242,255,0.4)]" transition={{ type: 'spring', duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === 'scan' && <Fingerprint size={14} />}
                {tab === 'radar' && <Radio size={14} />}
                {tab === 'hall of fame' && <Trophy size={14} />}
                {tab}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow">
        
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center justify-center flex-grow min-h-[60vh]">
            <h1 className="text-[18vw] md:text-[14rem] font-[1000] italic tracking-tighter leading-none text-center drop-shadow-[0_0_60px_rgba(0,242,255,0.2)] mb-2 select-none">SENKU</h1>
            <p className="text-[11px] font-mono tracking-[1.8em] text-cyan-400 uppercase mb-16 opacity-80">Scientific Master Protocol</p>
            
            <div className="w-full max-w-lg px-6">
              <div className="relative group mb-5">
                <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <input className="relative w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-cyan-500 transition-all font-mono text-sm tracking-widest" 
                  placeholder="SOLANA_NODE_ADDR" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <button onClick={analyze} className="w-full py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.6em] hover:bg-cyan-500 hover:text-white transition-all active:scale-95 shadow-2xl">
                {loading ? "PROCESSING..." : "EXECUTE ANALYTICS"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-16 w-full flex justify-center pb-24 px-4">
                  <div ref={cardRef} className="relative w-full max-w-[500px] aspect-[1.6/1] bg-black border-[2px] rounded-[3.5rem] p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-neon-card" style={{ borderColor: data.tierColor }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between mb-10"><Fingerprint size={45} style={{ color: data.tierColor }} /><Activity size={24} className="text-red-500 animate-pulse" /></div>
                    <div className="text-7xl md:text-8xl font-[1000] italic mb-12 tracking-tighter">{data.sol} <span className="text-2xl" style={{ color: data.tierColor }}>SOL</span></div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-8">
                      <div><p className="text-[10px] opacity-30 uppercase font-black tracking-widest mb-1">Laboratory Status</p><p className="text-4xl font-[1000] italic uppercase" style={{ color: data.tierColor }}>{data.status}</p></div>
                      <button onClick={saveCard} className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all shadow-xl"><Download size={26} /></button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pb-32 pt-10">
            <h2 className="text-5xl font-black italic uppercase mb-12 flex items-center gap-5 tracking-tighter"><Zap className="text-cyan-400" /> Live Feed</h2>
            <div className="space-y-5">
              {whaleAlerts.map((alert) => (
                <div key={alert.id} className="bg-white/5 border border-white/10 p-7 rounded-[2rem] flex justify-between items-center border-l-[6px] border-l-cyan-500 hover:bg-white/10 transition-all group">
                  <div><div className="text-3xl font-black italic group-hover:text-cyan-400 transition-colors">{alert.amount} <span className="text-xs text-cyan-400 font-black">{alert.asset}</span></div><div className="text-[11px] opacity-30 font-mono tracking-[0.4em] uppercase mt-1">{alert.type} • ${alert.usd}</div></div>
                  <ChevronRight className="text-cyan-500 group-hover:translate-x-2 transition-transform" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-32 pt-10">
            {[
              { name: "SENKU_DEV", bal: "25,400", rank: "1" },
              { name: "CHROME_LAB", bal: "12,100", rank: "2" },
              { name: "KOHAKU_X", bal: "8,300", rank: "3" },
              { name: "GEN_MAGIC", bal: "5,100", rank: "4" }
            ].map((whale, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] flex items-center gap-8 relative group hover:border-cyan-500/40 transition-all overflow-hidden shadow-2xl">
                <Trophy size={90} className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-20 transition-all text-cyan-400" />
                <div className="w-20 h-20 rounded-3xl bg-cyan-600 flex items-center justify-center font-black text-4xl italic shadow-[0_0_30px_#00f2ff]">#{whale.rank}</div>
                <div><div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 opacity-60">{whale.name}</div><div className="text-5xl font-black italic tracking-tighter">{whale.bal} <span className="text-sm opacity-20 uppercase font-bold">SOL</span></div></div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* REFINED DEVELOPER FOOTER */}
      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
          <Github size={22} className="group-hover:text-cyan-400 transition-colors duration-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-cyan-400 transition-colors">Developer Portal</span>
            <span className="text-[12px] font-mono text-white/80">@bedro95</span>
          </div>
        </a>
        <p className="text-[9px] font-mono tracking-[1.5em] opacity-10 uppercase select-none">Kingdom of Science // Kingdom of Code</p>
      </footer>

      <style jsx global>{`
        @keyframes neon-pulse {
          0%, 100% { border-color: rgba(0,242,255,0.1); box-shadow: 0 0 10px rgba(0,242,255,0.05); }
          50% { border-color: rgba(0,242,255,0.4); box-shadow: 0 0 30px rgba(0,242,255,0.15); }
        }
        @keyframes neon-card-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,242,255,0.1); }
          50% { box-shadow: 0 0 60px rgba(0,242,255,0.3); }
        }
        .animate-neon-border { animation: neon-pulse 5s infinite; }
        .animate-neon-card { animation: neon-card-pulse 3s infinite; }
        body { background: #000; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
