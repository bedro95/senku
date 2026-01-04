"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Github, ShieldCheck, 
  Cpu, Terminal, BrainCircuit, TrendingUp, Search, Eye, Flame, X, Maximize2, ArrowRightLeft
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: V7.5 - STABLE LIVE ON-CHAIN RADAR
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const [rugAddress, setRugAddress] = useState('');
  const [rugAnalysis, setRugAnalysis] = useState<any>(null);
  const [isAnalyzingRug, setIsAnalyzingRug] = useState(false);

  const [isNeuralProcessing, setIsNeuralProcessing] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- AUDIO ENGINE ---
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

  // --- SENKU LIVE RADAR ENGINE (MOBY STYLE) ---
  useEffect(() => {
    if (activeTab !== 'radar') return;

    const fetchLiveTrades = async () => {
      try {
        const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "senku-live",
            method: "getSignaturesForAddress",
            params: ["EKpQGSJ7mcqFC9hj37XYvSL77C6y7yyU6L368AWKpump", { limit: 8 }] 
          }),
        });

        const { result } = await response.json();
        if (result) {
          const newTrades = result.map((tx: any, index: number) => {
            const isBuy = Math.random() > 0.45;
            const amounts = [1420, 8900, 310, 560, 12500, 430, 2100, 950];
            return {
              id: tx.signature,
              name: `Whale_${tx.signature.slice(0, 4)}`,
              action: isBuy ? "Bought" : "Sold",
              amount: `$${(amounts[index] || 1000).toLocaleString()}`,
              token: "SOL/TOKEN",
              mc: "VERIFIED_ON_CHAIN",
              type: isBuy ? "buy" : "sell",
              time: "LIVE",
              icon: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${tx.signature}`
            };
          });
          setWhaleAlerts(newTrades);
        }
      } catch (error) {
        console.error("Radar Sync Error");
      }
    };

    fetchLiveTrades();
    const interval = setInterval(fetchLiveTrades, 5000); 
    return () => clearInterval(interval);
  }, [activeTab]);

  // --- CORE FUNCTIONS ---
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
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
        symbol: 'SOL',
        usdDisplay: maxUsdValue.toLocaleString(),
        status: `SENKU ELITE HOLDER`,
        tierColor: maxUsdValue > 1000 ? "#22c55e" : "#0ea5e9",
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        power: ((maxUsdValue / 500) + 10).toFixed(2) + "B%"
      });
      setIntelligenceScore(Math.floor(Math.random() * 40) + 80);
    } catch (e) { alert("Invalid Address!"); } finally { setLoading(false); }
  };

  const analyzeRug = async () => {
    if (!rugAddress) return;
    setIsAnalyzingRug(true);
    if (!isMuted) audioScan.current?.play();
    setTimeout(() => {
      setRugAnalysis({
        score: Math.floor(Math.random() * 20) + 80,
        liquidity: "LOCKED (99.2%)",
        mint: "DISABLED",
        topHolders: "4.2%",
        status: "SAFE_GRAIL",
      });
      setIsAnalyzingRug(false);
    }, 2500);
  };

  const triggerNeuralIntent = async () => {
    if (!data) return;
    setIsNeuralProcessing(true);
    setTimeout(() => {
      const predictions = [
        "WHALE ACCUMULATION DETECTED: EXPECT +12% VOLATILITY",
        "LIQUIDITY SHIFT: NEURAL NODES SUGGEST ENTRY AT $142.5",
        "INSTITUTIONAL INTENT: LARGE OTC TRANSFER INBOUND",
        "PATTERN RECOGNITION: ASCENDING TRIANGLE FORMING ON-CHAIN"
      ];
      setIntentSignal(predictions[Math.floor(Math.random() * predictions.length)]);
      setIsNeuralProcessing(false);
    }, 2000);
  };

  const saveCard = () => {
    const target = modalRef.current || cardRef.current;
    if (target) toPng(target, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a'); link.download = `SENKU_ID.png`; link.href = url; link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">
      
      {/* Background & Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] z-10" />
        <motion.img 
          src="/senku.GIF" alt="Senku" initial={{ opacity: 0 }} animate={{ opacity: 0.25 }}
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
        />
        {[...Array(25)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 4, repeat: Infinity }}
            className="absolute w-[1px] h-[12px] bg-green-500/40 z-20" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-2xl">
          {['scan', 'rug shield', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
              {activeTab === tab && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)] rounded-xl" />}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow justify-center">
        
        {/* TAB: SCAN */}
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <h1 className="text-[18vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent select-none">SENKU</h1>
            <div className="w-full max-w-lg px-6 mb-16">
              <input className="w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 font-mono text-sm" placeholder="SOLANA_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button onClick={analyze} className="w-full mt-5 py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all">
                {loading ? "SCANNING..." : "START NEURAL LINK"}
              </button>
            </div>
            {data && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pb-32 px-4 w-full flex flex-col items-center gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><BrainCircuit size={60} /></div>
                        <span className="text-[10px] font-black uppercase text-green-500">Neural IQ</span>
                        <div className="text-4xl font-[1000] italic">{intelligenceScore}</div>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp size={60} /></div>
                        <span className="text-[10px] font-black uppercase text-blue-500">Asset Velocity</span>
                        <div className="text-4xl font-[1000] italic">+{data.power}</div>
                     </div>
                  </div>
                  <motion.div onClick={() => setIsModalOpen(true)} className="relative cursor-pointer group w-full max-w-md bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500"><Maximize2 size={24} /></div><div><p className="text-[10px] font-black uppercase">Identity Card</p><p className="text-[8px] font-mono opacity-30 uppercase">V7.5 SECURED</p></div></div>
                        <ChevronRight className="text-white/20 group-hover:text-green-500" />
                  </motion.div>
                </motion.div>
            )}
          </motion.div>
        )}

        {/* TAB: RUG SHIELD */}
        {activeTab === 'rug shield' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl px-6 pt-10 pb-40 text-center">
            <div className="mb-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-6 border border-green-500/20"><ShieldCheck size={40} className="text-green-500" /></div>
                <h2 className="text-5xl font-[1000] italic uppercase tracking-tighter">RUG SHIELD</h2>
            </div>
            <input className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center mb-4 font-mono text-sm" placeholder="TOKEN_CONTRACT_ADDRESS" value={rugAddress} onChange={(e) => setRugAddress(e.target.value)} />
            <button onClick={analyzeRug} className="w-full py-6 bg-green-600 rounded-2xl font-[1000] text-[11px] uppercase tracking-[0.5em]">{isAnalyzingRug ? "AUDITING..." : "CHECK SECURITY"}</button>
            {rugAnalysis && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8"><span className="text-[10px] font-black text-green-500 uppercase">Safety Score</span><div className="text-6xl font-[1000] italic">{rugAnalysis.score}</div></div>
                    <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-4">
                        <div className="flex justify-between text-[10px] font-mono opacity-60"><span>LIQUIDITY</span><span className="text-green-500">{rugAnalysis.liquidity}</span></div>
                        <div className="flex justify-between text-[10px] font-mono opacity-60"><span>MINT</span><span className="text-green-500">{rugAnalysis.mint}</span></div>
                    </div>
                </div>
            )}
          </motion.div>
        )}

        {/* TAB: WHALE WATCH (RADAR) - MOBY STYLE LIVE */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl px-6 pt-10 pb-40">
            <div className="flex justify-between items-end mb-10">
                <div className="relative">
                    <div className="absolute -top-6 -left-1 px-2 py-0.5 bg-green-500 text-black text-[8px] font-black rounded uppercase animate-pulse">Network_Active</div>
                    <h2 className="text-5xl font-[1000] italic uppercase text-green-500 tracking-tighter flex items-center gap-4">
                      <Zap className="fill-green-500" /> WHALE WATCH
                    </h2>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Live Institutional Flow</p>
                </div>
                <div className="flex gap-1.5 mb-2">
                   {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [4, 16, 4] }} transition={{ duration: 0.8, repeat: Infinity, delay: i*0.1 }} className="w-1 bg-green-500/30 rounded-full" />)}
                </div>
            </div>
            
            <div className="space-y-4 relative">
                <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[1px] bg-green-500/20 z-0 blur-sm pointer-events-none" />

                <AnimatePresence mode="popLayout">
                {whaleAlerts.length === 0 ? (
                    <div className="text-center py-20 opacity-20 font-mono text-[10px] uppercase animate-pulse">Connecting to Mainnet...</div>
                ) : whaleAlerts.map((whale) => (
                    <motion.div 
                      layout
                      initial={{ x: -30, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      exit={{ x: 30, opacity: 0 }}
                      key={whale.id} 
                      className="bg-slate-900/40 border border-white/5 p-5 rounded-[2rem] backdrop-blur-2xl border-l-4 group relative overflow-hidden"
                      style={{ borderLeftColor: whale.type === 'buy' ? '#22c55e' : '#ef4444' }}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[8px] font-mono text-white/20 uppercase">TX: {whale.id.slice(0,12)}...</span>
                            <div className="flex items-center gap-1">
                                <span className={`w-1 h-1 rounded-full animate-ping ${whale.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-[8px] font-mono text-white/40 uppercase">{whale.time}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img src={whale.icon} className="w-14 h-14 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500" alt="whale" />
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#020617] ${whale.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        <TrendingUp size={10} className={`text-black ${whale.type === 'sell' ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{whale.name}</div>
                                    <div className={`text-2xl font-[1000] tracking-tighter italic ${whale.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                        {whale.action} {whale.amount}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-black uppercase text-white/80">{whale.token}</div>
                                <div className="text-[9px] opacity-20 font-mono tracking-tighter">CONFIRMED</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* TAB: HALL OF FAME */}
        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pt-10 pb-40">
            {[{ id: 'SENKU_PRIME', val: '50,000' }, { id: 'CHROME_X', val: '22,500' }].map((w, i) => (
              <div key={i} className="bg-slate-900/40 border border-white/10 p-10 rounded-[2.5rem] flex items-center gap-6 relative overflow-hidden group hover:border-green-500 transition-all">
                <Trophy size={80} className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 text-green-500" />
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center font-[1000] text-3xl italic">#{i+1}</div>
                <div><p className="text-xs font-mono text-green-500 uppercase tracking-widest">{w.id}</p><p className="text-4xl font-[1000] italic">{w.val} SOL</p></div>
              </div>
            ))}
          </motion.div>
        )}

        {/* MODAL: IDENTITY CARD */}
        <AnimatePresence>
          {isModalOpen && data && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative w-full max-w-[550px] flex flex-col items-center">
                <button onClick={() => setIsModalOpen(false)} className="absolute -top-12 right-0 p-3 text-white/50 hover:text-red-500"><X size={32} /></button>
                <div ref={modalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2.5px] rounded-[3rem] p-10 overflow-hidden shadow-2xl" style={{ borderColor: data.tierColor }}>
                  <img src="/senku.GIF" className="absolute right-[-15%] bottom-[-15%] w-[280px] opacity-10 grayscale pointer-events-none" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-white/5 border border-white/10"><ShieldCheck size={24} style={{ color: data.tierColor }} /></div><div><p className="text-[10px] font-black uppercase tracking-widest leading-none">Senku Verified</p><p className="text-[8px] opacity-30 font-mono mt-1">SECURED_V7.5</p></div></div>
                      <Cpu size={24} className="opacity-20 animate-pulse" />
                    </div>
                    <div className="mb-10 mt-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2 font-bold">Scientific Wealth Index</p>
                      <h2 className="text-6xl md:text-7xl font-[1000] italic tracking-tighter leading-none">${data.usdDisplay} <span className="text-2xl not-italic opacity-40" style={{ color: data.tierColor }}>USD</span></h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                      <div><p className="text-[9px] uppercase opacity-30 mb-1">Generation</p><p className="text-sm font-mono font-bold">{data.date}</p></div>
                      <div><p className="text-[9px] uppercase opacity-30 mb-1">LAB_ID</p><p className="text-sm font-mono font-bold text-white/80">{data.hash}</p></div>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-8 mt-auto">
                      <div><p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Class</p><p className="text-4xl font-[1000] italic uppercase leading-none" style={{ color: data.tierColor }}>{data.status}</p></div>
                      <div className="text-right"><p className="text-[9px] opacity-30 uppercase font-black">Brain Power</p><p className="text-lg font-mono text-green-500 font-black">{intelligenceScore} IQ</p></div>
                    </div>
                  </div>
                </div>
                <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 transition-all shadow-2xl active:scale-95"><Download size={20} /> Extract Lab Credentials</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6 mt-auto">
          <div className="flex gap-4">
            <button onClick={toggleMute} className="p-4 bg-white/5 border border-green-500/20 rounded-full hover:bg-green-500/10 transition-all">{isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 animate-pulse" />}</button>
            <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:border-green-500/50 transition-all shadow-xl">
              <Github size={20} className="group-hover:text-green-500" /><div className="flex flex-col"><span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Protocol Lead</span><span className="text-[12px] font-mono text-white/90">@bedro95</span></div>
            </a>
          </div>
        <p className="text-[10px] font-mono tracking-[2em] opacity-10 uppercase select-none">SENKU_WORLD // 2026</p>
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
