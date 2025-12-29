"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Globe, 
  BarChart3, Eye, ChevronRight, Trophy, TrendingUp
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function SenkuWhaleProtocolUltimate() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const audioScan = useRef<HTMLAudioElement | null>(null);
  const audioSuccess = useRef<HTMLAudioElement | null>(null);

  // 1. نظام الرادار المباشر (تنبيهات الحيتان التلقائية)
  useEffect(() => {
    const assets = ['SOL', 'USDC', 'JUP', 'BONK', 'PYTH'];
    const generateAlert = () => {
      const newAlert = {
        id: Date.now(),
        amount: (Math.random() * 800000 + 5000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
        asset: assets[Math.floor(Math.random() * assets.length)],
        time: "Just Now",
        usd: (Math.random() * 100 + 1).toFixed(1) + "M",
        type: Math.random() > 0.4 ? "Transfer" : "Large Swap",
        from: "Whale_" + Math.floor(Math.random() * 999),
        to: "Exchange_Node"
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 6));
    };

    generateAlert();
    const interval = setInterval(generateAlert, 4000);
    return () => clearInterval(interval);
  }, []);

  // 2. إعداد ملفات الصوت
  useEffect(() => {
    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audioSuccess.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
  }, []);

  // 3. تحليل المحفظة عبر شبكة سولانا
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
    
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;

      let tierColor = sol >= 1000 ? "#22c55e" : sol >= 100 ? "#a855f7" : "#3b82f6";
      
      if (!isMuted && sol >= 100) audioSuccess.current?.play();

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });
    } catch (e) {
      alert("Precision Error! Check the address strings.");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `SENKU-ID-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-hidden relative">
      
      {/* --- نظام الثلج النيوني --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
        {[...Array(35)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh" }} transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            className="absolute w-[1.5px] h-[1.5px] bg-blue-500 rounded-full" style={{ left: `${Math.random() * 100}vw`, top: `-5vh` }} />
        ))}
      </div>

      {/* --- شخصية SENKU التفاعلية --- */}
      <motion.div 
        className="fixed z-[1] pointer-events-none mix-blend-screen"
        animate={{ 
          x: loading ? [0, 15, -15, 0] : [0, 120, -120, 0],
          y: [0, -40, 40, 0],
          scale: data?.status === "WHITE WHALE" ? 1.35 : 1,
          filter: data?.status === "WHITE WHALE" ? "hue-rotate(120deg) brightness(1.6)" : "none"
        }}
        transition={{ duration: loading ? 0.15 : 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '35%', left: '25%' }}
      >
        <div className="relative group">
          <img src="/senku.GIF" alt="Senku" className="w-[280px] md:w-[580px] opacity-45 shadow-inner"
            style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }} />
          <motion.div className="absolute top-0 right-0 bg-green-500/10 border border-green-500/30 p-2 rounded-xl text-[9px] font-mono text-green-400 backdrop-blur-xl">
            {loading ? "SEARCHING..." : "SENKU_MONITOR_ACTIVE"}
          </motion.div>
        </div>
      </motion.div>

      {/* --- زر كتم الصوت --- */}
      <button onClick={() => setIsMuted(!isMuted)} className="fixed top-6 right-6 z-[100] p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-lg hover:bg-white/10 transition-all">
        {isMuted ? <VolumeX size={22} className="text-white/40" /> : <Volume2 size={22} className="text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
      </button>

      {/* --- القائمة العلوية --- */}
      <nav className="relative z-[90] flex bg-white/5 border border-white/10 p-1 rounded-2xl mb-12 backdrop-blur-3xl shadow-2xl">
        {['scan', 'radar', 'hall of fame'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} 
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-green-600 text-white shadow-lg' : 'text-white/20 hover:text-white/50'}`}>
            {tab}
          </button>
        ))}
      </nav>

      {/* --- المحتوى الرئيسي --- */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <h1 className="text-8xl md:text-[13rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">SENKU</h1>
            <p className="text-[10px] md:text-xs font-mono tracking-[1.2em] text-green-500 uppercase font-black mb-14 italic text-center">THE SCIENTIFIC PROTOCOL</p>

            <div className="w-full max-w-md px-4 mb-14">
              <div className="relative p-[1px] rounded-2xl bg-white/10 focus-within:bg-green-600 transition-all duration-500 shadow-2xl">
                <input className="w-full bg-black rounded-2xl p-6 text-center outline-none font-mono text-sm text-white" 
                  placeholder="SOLANA_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <button onClick={analyze} className="w-full mt-5 py-5 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.6em] hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                {loading ? <Cpu className="animate-spin mx-auto" /> : "START_SCAN"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center pb-40">
                  <div ref={cardRef} className="relative w-full max-w-[460px] aspect-[1.6/1] bg-gradient-to-br from-[#0a0a0a] to-[#000] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-48 h-48 blur-[100px] opacity-30" style={{ backgroundColor: data.tierColor }} />
                    <div className="flex justify-between items-start"><Fingerprint size={32} style={{ color: data.tierColor }} /><Radio size={20} className="text-red-500 animate-pulse" /></div>
                    <div className="text-6xl md:text-7xl font-[1000] italic my-8 tracking-tighter">{data.sol} <span className="text-xl font-black" style={{ color: data.tierColor }}>SOL</span></div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div><p className="text-[9px] font-black opacity-30 uppercase tracking-widest">Senku Status</p><p className="text-3xl font-[1000] italic" style={{ color: data.tierColor }}>{data.status}</p></div>
                      <button onClick={saveCard} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><Download size={20} /></button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'radar' && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full px-4 pb-48 max-w-2xl">
            <div className="flex items-center gap-4 mb-10"><Globe className="text-green-500 animate-spin-slow" size={32} /><h2 className="text-4xl font-[1000] italic uppercase tracking-tighter">Live Whale Feed</h2></div>
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {whaleAlerts.map((alert) => (
                  <motion.div key={alert.id} layout initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}
                    className="bg-[#050505] border border-white/5 p-6 rounded-3xl flex justify-between items-center hover:border-green-500/40 transition-all border-l-4 border-l-green-600">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-green-600/10 rounded-2xl text-green-500"><TrendingUp size={24} /></div>
                      <div>
                        <div className="text-2xl font-[1000] italic">{alert.amount} <span className="text-xs text-green-500">{alert.asset}</span></div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{alert.type}</div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-green-500" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-48 max-w-4xl">
            {[
              { name: "SENKU_DEV", bal: "15,240", rank: "1" },
              { name: "CHROME_KING", bal: "8,900", rank: "2" },
              { name: "KOHAKU_SOL", bal: "4,120", rank: "3" },
              { name: "GEN_MINT", bal: "2,500", rank: "4" }
            ].map((whale, i) => (
              <div key={i} className="bg-black border border-white/10 p-8 rounded-[2.5rem] flex items-center gap-6 relative group overflow-hidden shadow-xl">
                <Trophy size={60} className={`absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-30 transition-all ${i === 0 ? 'text-yellow-500' : 'text-white'}`} />
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center font-[1000] text-3xl italic shadow-[0_0_20px_rgba(34,197,94,0.3)]">#{whale.rank}</div>
                <div>
                  <div className="text-[10px] font-mono text-green-500/60 mb-1 tracking-widest">{whale.name}</div>
                  <div className="text-4xl font-[1000] italic tracking-tighter">{whale.bal} <span className="text-sm font-black text-white/20">SOL</span></div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <footer className="mt-auto py-12 opacity-10 text-[9px] font-mono tracking-[1.5em] text-center w-full uppercase select-none">SENKU // KINGDOM OF SCIENCE // BADER ALKORGLI</footer>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinity; }
        body { background: #000; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
