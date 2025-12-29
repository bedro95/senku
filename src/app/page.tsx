"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function SenkuStoneWorldEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // تم جعلها ON دائماً كافتراضي
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const bgMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.5;

    const startMusic = () => {
      if (!isMuted && bgMusic.current?.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', startMusic);
    return () => window.removeEventListener('click', startMusic);
  }, [isMuted]);

  useEffect(() => {
    const generateAlert = () => {
      const assets = ['SOL', 'USDC', 'JUP'];
      const newAlert = {
        id: Date.now(),
        amount: (Math.random() * 500000).toLocaleString(),
        asset: assets[Math.floor(Math.random() * assets.length)],
        type: "SCIENCE_RESERVE"
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 5));
    };
    setInterval(generateAlert, 5000);
  }, []);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      
      // ألوان Dr. Stone: الأخضر والزمردي والأزرق
      let tierColor = sol >= 1000 ? "#22c55e" : sol >= 100 ? "#10b981" : "#0ea5e9";

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 3 }),
        status: sol >= 1000 ? "MASTER SCIENTIST" : sol >= 100 ? "CRAFTSMAN" : "SURVIVOR",
        tierColor,
        date: new Date().toLocaleDateString(),
        hash: Math.random().toString(36).substring(2, 15).toUpperCase(),
        power: Math.floor(sol * 1.5 + 10) + "B%"
      });
    } catch (e) { alert("Address Error!"); } finally { setLoading(false); }
  };

  const saveCard = () => {
    if (cardRef.current) {
      toPng(cardRef.current, { pixelRatio: 3 }).then(url => {
        const link = document.createElement('a');
        link.download = `SENKU-CARD.png`;
        link.href = url;
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center p-6 font-sans overflow-hidden relative">
      
      {/* تأثيرات خلفية Dr. Stone (خضراء وزرقاء) */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            className="absolute w-[2px] h-[15px] bg-green-500 blur-[1px]" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* التحكم بالصوت (دائماً ON) */}
      <button onClick={() => setIsMuted(!isMuted)} className="fixed top-8 right-8 z-[100] p-4 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-md">
        {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 animate-pulse" />}
      </button>

      {/* شريط الميزات العلوي المنسق */}
      <nav className="relative z-[90] mt-4 mb-16">
        <div className="flex bg-slate-900/80 border border-white/10 p-1 rounded-2xl backdrop-blur-2xl shadow-2xl">
          {['scan', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'opacity-40 hover:opacity-100'}`}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* العنوان المتوسط */}
      {activeTab === 'scan' && (
        <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow">
          <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-[15vw] md:text-[12rem] font-[1000] italic tracking-tighter leading-none text-center bg-gradient-to-b from-white to-green-500 bg-clip-text text-transparent drop-shadow-2xl">
            SENKU
          </motion.h1>
          <p className="text-[10px] font-mono tracking-[2em] text-green-400 uppercase mb-12 opacity-80">Kingdom of Science</p>

          <div className="w-full max-w-md px-6">
            <input className="w-full bg-slate-900 border border-white/10 rounded-2xl p-5 text-center outline-none focus:border-green-500 transition-all font-mono text-sm mb-4" 
              placeholder="WALLET_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={analyze} className="w-full py-5 bg-green-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-green-500 transition-all shadow-lg">
              {loading ? "SEARCHING..." : "INITIALIZE ANALYSIS"}
            </button>
          </div>

          <AnimatePresence>
            {data && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-16 pb-20">
                {/* الكرت التحفة الفنية */}
                <div ref={cardRef} className="relative w-full max-w-[480px] aspect-[1.6/1] bg-slate-950 border-[2px] rounded-[2.5rem] p-8 overflow-hidden shadow-2xl" style={{ borderColor: data.tierColor }}>
                  {/* خلفية Senku داخل الكرت */}
                  <img src="/senku.GIF" className="absolute right-[-10%] bottom-[-10%] w-[250px] opacity-20 pointer-events-none grayscale hover:grayscale-0 transition-all" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={20} style={{ color: data.tierColor }} />
                        <span className="text-[10px] font-mono opacity-50 uppercase">Verified Scientific Asset</span>
                      </div>
                      <Cpu size={24} className="opacity-20" />
                    </div>

                    <div className="mb-8">
                      <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Current Balance</p>
                      <h2 className="text-6xl font-[1000] italic tracking-tighter">{data.sol} <span className="text-xl" style={{ color: data.tierColor }}>SOL</span></h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-[8px] uppercase opacity-30 flex items-center gap-1"><Calendar size={10} /> Analyze Date</p>
                        <p className="text-xs font-mono">{data.date}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase opacity-30 flex items-center gap-1"><Hash size={10} /> Sci-Hash</p>
                        <p className="text-xs font-mono truncate w-32">{data.hash}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-40">Classification</p>
                        <p className="text-3xl font-[1000] italic uppercase" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-right mr-4">
                          <p className="text-[8px] opacity-30 uppercase font-bold">Science Power</p>
                          <p className="text-sm font-mono text-green-400">{data.power}</p>
                        </div>
                        <button onClick={saveCard} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"><Download size={20} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Hall of Fame & Radar */}
      {activeTab === 'radar' && (
        <div className="relative z-10 w-full max-w-2xl px-6 pt-10 pb-20">
          <h2 className="text-4xl font-black italic uppercase mb-8 flex items-center gap-4 text-green-500"><Zap /> Stone Radar</h2>
          <div className="space-y-4">
            {whaleAlerts.map((a) => (
              <div key={a.id} className="bg-slate-900 border border-white/5 p-6 rounded-3xl flex justify-between items-center border-l-4 border-l-green-600">
                <div><p className="text-2xl font-black italic">{a.amount} <span className="text-xs text-green-500">{a.asset}</span></p><p className="text-[10px] opacity-30 uppercase">{a.type}</p></div>
                <ChevronRight className="text-green-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'hall of fame' && (
        <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pt-10 pb-20">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-slate-900/50 border border-white/10 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:border-green-500/50 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center font-black text-3xl italic shadow-lg shadow-green-900/20">#{i}</div>
              <div><p className="text-[10px] text-green-500 font-mono uppercase tracking-widest">Scientific_Whale_{i}</p><p className="text-3xl font-black italic">10,000+ <span className="text-xs opacity-20">SOL</span></p></div>
            </div>
          ))}
        </div>
      )}

      {/* تذييل المطور (GitHub: bedro95) */}
      <footer className="relative z-[100] py-10 w-full flex flex-col items-center gap-4 mt-auto">
        <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-green-500/10 hover:border-green-500 transition-all duration-500">
          <Github size={20} className="group-hover:text-green-500 transition-colors" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Stone World Dev</span>
            <span className="text-[12px] font-mono">@bedro95</span>
          </div>
        </a>
      </footer>

      <style jsx global>{`
        body { background-color: #020617; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 20px rgba(34,197,94,0.1); }
          50% { box-shadow: 0 0 40px rgba(34,197,94,0.3); }
        }
        .animate-neon-card { animation: pulse-green 4s infinite; }
      `}</style>
    </div>
  );
}
