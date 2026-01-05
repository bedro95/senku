"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Github, ShieldCheck, 
  Cpu, Terminal, BrainCircuit, TrendingUp, Search, Eye, Flame, X, Maximize2, ArrowRightLeft, MessageSquare
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: V8.5 - FULL AGENT INTERACTION
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // --- AGENT STATE ---
  const [senkuTalk, setSenkuTalk] = useState("Greetings, Bader. Waiting for your command to breach the Solana mainnet.");
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- AGENT INTERACTION LOGIC ---
  useEffect(() => {
    const dialogs: any = {
      'scan': "Enter the target address. I'll deconstruct its assets in milliseconds.",
      'rug shield': "Scanning for fraudulent smart contracts. I don't tolerate weak code.",
      'radar': "Watching the whales move. Knowledge is the ultimate weapon.",
      'hall of fame': "The legends of Wagmi. Will your name be here next?"
    };
    if (!data) setSenkuTalk(dialogs[activeTab]);
  }, [activeTab, data]);

  useEffect(() => {
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.4;
    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const handleInitialInteraction = () => {
      if (!isMuted && bgMusic.current?.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleInitialInteraction);
    return () => window.removeEventListener('click', handleInitialInteraction);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (bgMusic.current) isMuted ? bgMusic.current.play() : bgMusic.current.pause();
  };

  // --- CORE ANALYZE ---
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    setSenkuTalk("Initiating Neural Link... analyzing on-chain behavior...");
    if (!isMuted) audioScan.current?.play().catch(() => {});
    
    try {
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 'senku-analysis', method: 'getAssetsByOwner',
          params: { ownerAddress: address.trim(), displayOptions: { showNativeBalance: true } },
        }),
      });
      const { result } = await response.json();
      let maxUsdValue = result.nativeBalance ? (result.nativeBalance.lamports / 1e9) * (result.nativeBalance.price_per_token || 0) : 0;
      
      setData({
        sol: (result.nativeBalance?.lamports / 1e9 || 0).toFixed(2),
        usdDisplay: maxUsdValue.toLocaleString(),
        status: maxUsdValue > 1000 ? `ELITE ARCHITECT` : `NEW WORLD RECON`,
        tierColor: maxUsdValue > 1000 ? "#22c55e" : "#0ea5e9",
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        power: ((maxUsdValue / 500) + 10).toFixed(2) + "B%"
      });

      // Agent Decision
      if (maxUsdValue > 1000) {
        setSenkuTalk("Impressive wealth. Your tactical positioning is 10 billion percent correct!");
      } else {
        setSenkuTalk("Limited assets detected. We must initiate a growth protocol immediately.");
      }
      setIntelligenceScore(Math.floor(Math.random() * 40) + 80);

    } catch (e) { 
      setSenkuTalk("Analysis failed. Invalid coordinates (Address).");
    } finally { 
      setLoading(false); 
    }
  };

  const saveCard = () => {
    const target = modalRef.current || cardRef.current;
    if (target) toPng(target, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a'); link.download = `SENKU_ID.png`; link.href = url; link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-x-hidden relative">
      
      {/* Snow/Rain System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-[10px] bg-green-500/30" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-[100] mt-4 mb-8">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl">
          {['scan', 'rug shield', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'text-white' : 'text-white/30'}`}>
              {activeTab === tab && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 rounded-xl" />}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow">
        
        {/* SENKU AGENT DIALOG AREA */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-lg mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-green-500 overflow-hidden flex-shrink-0">
                        <img src="/senku.GIF" className="w-full h-full object-cover scale-150" alt="Senku" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-green-500 uppercase mb-1 flex items-center gap-2">
                           <MessageSquare size={12} /> Senku Agent
                        </p>
                        <p className="text-xs font-mono text-white/80 leading-relaxed italic">"{senkuTalk}"</p>
                    </div>
                </div>
            </div>
        </motion.div>

        {activeTab === 'scan' && (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-[18vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white to-green-500 bg-clip-text text-transparent mb-12">SENKU</h1>
            <div className="w-full max-w-lg px-6">
              <input className="w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 font-mono text-sm" placeholder="SOLANA_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button onClick={analyze} className="w-full mt-5 py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all">
                {loading ? "DECODING..." : "ACTIVATE LINK"}
              </button>
            </div>

            {data && (
              <div className="w-full max-w-3xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 pb-40">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                    <span className="text-[10px] font-black uppercase text-green-500">Neural IQ</span>
                    <div className="text-5xl font-[1000] italic">{intelligenceScore}</div>
                  </div>
                  <div onClick={() => setIsModalOpen(true)} className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 flex items-center justify-between cursor-pointer group hover:border-green-500 transition-all">
                    <div><p className="text-[10px] font-black uppercase">Identity Card</p><p className="text-[8px] font-mono opacity-30">V8.5 SECURED</p></div>
                    <Maximize2 className="group-hover:text-green-500" />
                  </div>
              </div>
            )}
          </div>
        )}

        {/* بقية الـ Tabs ... */}
      </main>

      {/* MODAL: IDENTITY CARD */}
      <AnimatePresence>
        {isModalOpen && data && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <div className="relative w-full max-w-[550px]">
              <div ref={modalRef} className="w-full aspect-[1.58/1] bg-[#020617] border-[2.5px] rounded-[3rem] p-10 relative overflow-hidden" style={{ borderColor: data.tierColor }}>
                <img src="/senku.GIF" className="absolute right-[-10%] bottom-[-10%] w-[250px] opacity-10 grayscale pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3"><ShieldCheck size={24} style={{ color: data.tierColor }} /><div><p className="text-[10px] font-black uppercase leading-none">Senku Verified</p><p className="text-[8px] opacity-30 mt-1">PROTOCOL V8.5</p></div></div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase opacity-30 mb-2 tracking-widest">Wealth Index</p>
                    <h2 className="text-6xl font-[1000] italic leading-none">${data.usdDisplay}</h2>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-6">
                    <div><p className="text-[10px] font-black uppercase opacity-40">Class</p><p className="text-4xl font-[1000] italic" style={{ color: data.tierColor }}>{data.status}</p></div>
                    <div className="text-right font-mono text-[9px] opacity-30">{data.hash}</div>
                  </div>
                </div>
              </div>
              <button onClick={saveCard} className="mt-8 w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all flex items-center justify-center gap-3"><Download size={20} /> Download ID</button>
              <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full text-white/30 text-[10px] uppercase font-black">Close Neural Link</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-[100] py-14 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <button onClick={toggleMute} className="p-4 bg-white/5 border border-green-500/20 rounded-full">{isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400" />}</button>
            <a href="https://github.com/bedro95" target="_blank" className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-4 hover:border-green-500 transition-all"><Github size={20} /><span className="text-[12px] font-mono text-white/90">@bedro95</span></a>
          </div>
      </footer>

      <style jsx global>{`
        body { background-color: #020617; margin: 0; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
}
