"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (Wagmi)
 * DEVELOPER: bedro95
 * VERSION: ULTIMATE MASTERPIECE
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // 1. نظام الصوت المتطور (Always Ready)
  useEffect(() => {
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.5;
    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const handleInitialInteraction = () => {
      if (!isMuted && bgMusic.current?.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleInitialInteraction);
    return () => window.removeEventListener('click', handleInitialInteraction);
  }, [isMuted]);

  // 2. محاكاة رادار الحيتان (Real-time Simulation)
  useEffect(() => {
    const assets = ['SOL', 'USDC', 'JUP', 'PYTH', 'BONK'];
    const generateAlert = () => {
      const newAlert = {
        id: Date.now(),
        amount: (Math.random() * 850000 + 1000).toLocaleString(),
        asset: assets[Math.floor(Math.random() * assets.length)],
        usd: (Math.random() * 150 + 1).toFixed(1) + "M",
        type: "PROTOCOL_MOVE"
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 6));
    };
    const interval = setInterval(generateAlert, 4500);
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
      
      // ألوان مملكة العلم الأصلية
      let tierColor = sol >= 1000 ? "#22c55e" : sol >= 100 ? "#10b981" : "#0ea5e9";

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 3 }),
        status: sol >= 1000 ? "MASTER SCIENTIST" : sol >= 100 ? "CRAFTSMAN" : "SURVIVOR",
        tierColor,
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        power: (sol * 1.2 + 5).toFixed(2) + "B%"
      });
    } catch (e) {
      alert("Scientific Calculation Error! Verify Address.");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = () => {
    if (!cardRef.current) return;
    toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a');
      link.download = `SENKU_LEGACY_CARD.png`;
      link.href = url;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">
      
      {/* 1. BACKDROP: SENKU GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)]" />
        <motion.img 
          src="/senku.GIF" 
          alt="Senku Background" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[80%] opacity-20 filter grayscale contrast-125"
        />
        {/* Particle System */}
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            className="absolute w-[1px] h-[10px] bg-green-500/50" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* 2. TOP NAV: REFINED FEATURE BAR */}
      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.4)]">
          {['scan', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
              {activeTab === tab && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 shadow-[0_0_25px_rgba(34,197,94,0.5)] rounded-xl" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
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

      {/* 3. MAIN CONTENT: CENTERED LOGO & DATA */}
      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow justify-center">
        
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            {/* Logo Section */}
            <div className="text-center mb-12">
              <motion.h1 
                className="text-[18vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent drop-shadow-2xl select-none">
                SENKU
              </motion.h1>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-[1px] w-12 bg-green-500/50" />
                <p className="text-[10px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-80">Scientific Domain</p>
                <div className="h-[1px] w-12 bg-green-500/50" />
              </div>
            </div>

            {/* Input Section */}
            <div className="w-full max-w-lg px-6 mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-green-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <input 
                  className="relative w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest placeholder:opacity-20" 
                  placeholder="INPUT_LAB_CREDENTIALS" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                />
              </div>
              <button 
                onClick={analyze} 
                className="w-full mt-5 py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-2xl"
              >
                {loading ? "SEARCHING 10 BILLION%..." : "INITIALIZE ANALYSIS"}
              </button>
            </div>

            {/* THE MASTERPIECE CARD (LOCKED DESIGN) */}
            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="pb-32 px-4 w-full flex justify-center">
                  <div ref={cardRef} className="relative w-full max-w-[500px] aspect-[1.58/1] bg-[#020617] border-[2.5px] rounded-[3rem] p-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]" style={{ borderColor: data.tierColor }}>
                    {/* Inner Decor */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <img src="/senku.GIF" className="absolute right-[-15%] bottom-[-15%] w-[280px] opacity-10 grayscale pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-auto">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                            <ShieldCheck size={24} style={{ color: data.tierColor }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">Protocol Verified</p>
                            <p className="text-[8px] opacity-30 font-mono mt-1">SECURED_BY_SENKU_LABS</p>
                          </div>
                        </div>
                        <Cpu size={24} className="opacity-20 animate-pulse" />
                      </div>

                      <div className="mb-10 mt-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2 font-bold">Available Scientific Assets</p>
                        <h2 className="text-7xl md:text-8xl font-[1000] italic tracking-tighter leading-none">
                          {data.sol} <span className="text-2xl not-italic opacity-40" style={{ color: data.tierColor }}>SOL</span>
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/5 pt-8">
                        <div>
                          <p className="text-[9px] uppercase opacity-30 flex items-center gap-2 mb-1"><Calendar size={12} /> Creation Date</p>
                          <p className="text-sm font-mono font-bold tracking-widest">{data.date}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase opacity-30 flex items-center gap-2 mb-1"><Hash size={12} /> Asset Index</p>
                          <p className="text-sm font-mono font-bold tracking-widest text-white/80">{data.hash}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-end border-t border-white/5 pt-8 mt-auto">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Classification</p>
                          <p className="text-4xl font-[1000] italic uppercase leading-none" style={{ color: data.tierColor }}>{data.status}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-[9px] opacity-30 uppercase font-black tracking-widest">Power Level</p>
                            <p className="text-lg font-mono text-green-500 font-black">{data.power}</p>
                          </div>
                          <button onClick={saveCard} className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all active:scale-90">
                            <Download size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* RADAR & HALL OF FAME REMAIN INTEGRATED */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pt-10 pb-40 space-y-5">
            <h2 className="text-5xl font-[1000] italic uppercase flex items-center gap-5 text-green-500 tracking-tighter"><Zap /> Stone Radar</h2>
            {whaleAlerts.map((a) => (
              <div key={a.id} className="bg-slate-900/80 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center border-l-[6px] border-l-green-600 shadow-xl group hover:bg-slate-800/80 transition-all">
                <div><p className="text-3xl font-[1000] italic group-hover:text-green-400 transition-colors">{a.amount} <span className="text-xs text-green-500">{a.asset}</span></p><p className="text-[10px] opacity-30 uppercase tracking-[0.3em] mt-1">{a.type} • ${a.usd}</p></div>
                <ChevronRight className="text-green-600 group-hover:translate-x-2 transition-transform" />
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pt-10 pb-40">
            {[
              { id: 'SENKU', val: '50,000' }, { id: 'CHROME', val: '22,500' },
              { id: 'KOHAKU', val: '15,200' }, { id: 'GEN_ASSAIRI', val: '10,100' }
            ].map((w, i) => (
              <div key={i} className="bg-slate-900/40 border border-white/10 p-12 rounded-[3.5rem] flex items-center gap-8 relative group hover:border-green-500 transition-all shadow-2xl overflow-hidden">
                <Trophy size={100} className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-20 text-green-500 transition-all" />
                <div className="w-20 h-20 rounded-3xl bg-green-600 flex items-center justify-center font-[1000] text-4xl italic shadow-[0_0_30px_rgba(34,197,94,0.4)]">#{i+1}</div>
                <div><p className="text-xs font-mono text-green-500 uppercase tracking-[0.4em] mb-2">{w.id}_PROTOCOL</p><p className="text-5xl font-[1000] italic tracking-tighter">{w.val} <span className="text-sm opacity-20">SOL</span></p></div>
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* 4. FOOTER: DEVELOPER ID & MUSIC CONTROL */}
      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6 mt-auto">
        <div className="flex gap-4">
          <button onClick={toggleMute} className="p-4 bg-white/5 border border-green-500/20 rounded-full hover:bg-green-500/10 transition-all">
            {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 animate-pulse" />}
          </button>
          <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:border-green-500/50 transition-all shadow-xl">
            <Github size={20} className="group-hover:text-green-500 transition-colors" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Protocol Lead</span>
              <span className="text-[12px] font-mono text-white/90">@bedro95</span>
            </div>
          </a>
        </div>
        <p className="text-[10px] font-mono tracking-[2em] opacity-10 uppercase select-none">SENKU_WORLD // 2025</p>
      </footer>

      <style jsx global>{`
        body { background-color: #020617; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: rgba(255,255,255,0.05); }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
