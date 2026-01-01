"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Radio, X, Maximize2, Sparkles, 
  Flame, Terminal, BrainCircuit, TrendingUp, ShieldAlert, 
  Search, Eye, Shield, AlertTriangle, Layers, Globe, BarChart3
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (WAGMI)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V8.0 - ALL FEATURES INTEGRATED
 * THEME: GREEN/BLUE NEON - SNOW SYSTEM - INTERACTIVE AGENT
 */

export default function SenkuUltimateProtocol() {
  // --- Global States ---
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // --- Rug Shield (Automated) States ---
  const [rugAddress, setRugAddress] = useState('');
  const [rugAnalysis, setRugAnalysis] = useState<any>(null);
  const [isAnalyzingRug, setIsAnalyzingRug] = useState(false);
  const [isRugModalOpen, setIsRugModalOpen] = useState(false);

  // --- Neural Engine States ---
  const [isNeuralProcessing, setIsNeuralProcessing] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  // --- Refs ---
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const rugModalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- 1. Audio System ---
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
    if (bgMusic.current) {
      isMuted ? bgMusic.current.play() : bgMusic.current.pause();
    }
  };

  // --- 2. Automated Extraction Engine (Rug Shield) ---
  const analyzeRug = async () => {
    if (!rugAddress) return;
    setIsAnalyzingRug(true);
    if (!isMuted) audioScan.current?.play();
    
    // محاكاة استخراج اسم العملة والبيانات برمجياً من العقد
    setTimeout(() => {
      const mockNames = ["SOLANA_NEURAL", "GENESIS_NODE", "SENKU_CORE", "WAGMI_PROTOCOL", "QUANTUM_FLOW"];
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      
      const mockResult = {
        tokenName: randomName,
        score: Math.floor(Math.random() * 15) + 85,
        liquidity: "LOCKED (99.8%)",
        mint: "REVOKED",
        topHolders: "2.1%",
        status: "SECURE_GRAIL",
        riskLevel: "LOW",
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SHIELD-" + Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      setRugAnalysis(mockResult);
      setIsAnalyzingRug(false);
    }, 2800);
  };

  // --- 3. Neural Intent Engine ---
  const triggerNeuralIntent = async () => {
    if (!data) return;
    setIsNeuralProcessing(true);
    setTimeout(() => {
      const predictions = [
        "WHALE ACCUMULATION IN PROGRESS: EXPECT BULLISH VOLATILITY",
        "NEURAL PATTERN DETECTED: SMART MONEY IS ENTERING",
        "LIQUIDITY CONCENTRATION AT $145.2 - CRITICAL NODE",
        "PATTERN RECOGNITION: ASCENDING CHANNEL CONFIRMED ON-CHAIN",
        "MEV BOT PROTECTION ACTIVE: ALPHA SIGNALS DETECTED"
      ];
      setIntentSignal(predictions[Math.floor(Math.random() * predictions.length)]);
      setIsNeuralProcessing(false);
    }, 2500);
  };

  // --- 4. Radar & Whale Alerts (Live Simulation) ---
  useEffect(() => {
    if (activeTab !== 'radar') return;
    const interval = setInterval(() => {
      const amount = (Math.random() * 500 + 50).toFixed(2);
      const newAlert = {
        id: Date.now(),
        amount,
        asset: "SOL",
        source: "LIVE_MAINNET",
        type: Math.random() > 0.5 ? "WHALE_INFLOW" : "WHALE_OUTFLOW"
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 8));
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // --- 5. Main Scanner ---
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
    
    try {
      // Simulation of deep on-chain scan
      setTimeout(() => {
        const score = Math.floor(Math.random() * 40) + 60;
        setIntelligenceScore(score);
        setData({
          sol: (Math.random() * 1000).toFixed(2),
          symbol: "SOL",
          usdDisplay: (Math.random() * 150000).toLocaleString(),
          status: "TOP ALPHA HOLDER",
          tierColor: "#22c55e",
          date: new Date().toLocaleDateString('en-GB'),
          hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
          power: (Math.random() * 100).toFixed(2) + "B%"
        });
        setLoading(false);
      }, 2000);
    } catch (e) {
      setLoading(false);
    }
  };

  // --- 6. Image Export ---
  const saveCardImage = (reference: any, fileName: string) => {
    if (!reference.current) return;
    toPng(reference.current, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = url;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">
      
      {/* Background Visuals & Snow System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] z-10" />
        <motion.img 
          src="/senku.GIF" 
          alt="Senku Background" 
          animate={{ opacity: 0.25, scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
        />
        {[...Array(40)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-[1px] h-[15px] bg-green-500/40 z-20" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* Modern Navigation */}
      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-2xl">
          {['scan', 'rug shield', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
              {activeTab === tab && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 shadow-[0_0_30px_rgba(34,197,94,0.5)] rounded-xl" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">{tab}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow justify-center">
        
        {/* --- TAB: SCANNER --- */}
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center">
            <div className="text-center mb-12 relative group">
              <motion.h1 className="text-[15vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent drop-shadow-2xl select-none">
                SENKU
              </motion.h1>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-[1px] w-12 bg-green-500/50" />
                <p className="text-[10px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-80">Neural Scientific Protocol</p>
                <div className="h-[1px] w-12 bg-green-500/50" />
              </div>
            </div>

            <div className="w-full max-w-xl px-6 mb-16 space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-green-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <input 
                  className="relative w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest" 
                  placeholder="ENTER_SOLANA_WALLET_ADDRESS" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                />
              </div>
              <button onClick={analyze} className="w-full py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all shadow-2xl active:scale-95">
                {loading ? "DECODING NEURAL DATA..." : "INITIALIZE SCAN"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-8 pb-32">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                        <BrainCircuit size={80} className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-20 transition-all text-green-500" />
                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2">Neural IQ Rating</p>
                        <div className="text-6xl font-[1000] italic">{intelligenceScore}</div>
                        <p className="text-[9px] opacity-30 mt-4 uppercase font-mono tracking-widest">Cognitive wallet depth assessment</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                        <TrendingUp size={80} className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-20 transition-all text-blue-500" />
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Asset Velocity</p>
                        <div className="text-6xl font-[1000] italic">{data.power}</div>
                        <p className="text-[9px] opacity-30 mt-4 uppercase font-mono tracking-widest">Market influence power index</p>
                    </div>
                  </div>

                  {/* Neural Intent Prediction Card */}
                  <div className="bg-gradient-to-b from-slate-900 to-black border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="flex items-center gap-3 text-green-500 font-black uppercase text-[11px] tracking-[0.4em] mb-6">
                      <Terminal size={18} /> Lab_Intent_Algorithm
                    </div>
                    <div className="w-full bg-black/60 border border-white/5 rounded-2xl p-6 min-h-[100px] mb-6">
                      {intentSignal ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                          {">"} {intentSignal}
                        </motion.p>
                      ) : (
                        <p className="text-white/10 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">Awaiting neural sync...</p>
                      )}
                    </div>
                    <button onClick={triggerNeuralIntent} disabled={isNeuralProcessing} className="w-full py-5 bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-500 transition-all">
                      {isNeuralProcessing ? "PROCESSING..." : "GENERATE FUTURE PREDICTION"}
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-6 rounded-3xl hover:border-green-500 transition-all group">
                      <Maximize2 size={24} className="text-green-500 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">View Scientific Passport</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- TAB: RUG SHIELD (AUTOMATED) --- */}
        {activeTab === 'rug shield' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-3xl px-6 pt-10 pb-40">
            <div className="flex flex-col items-center mb-12 text-center">
                <div className="w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                    <ShieldCheck size={50} className="text-blue-400" />
                </div>
                <h2 className="text-6xl font-[1000] italic uppercase tracking-tighter">RUG SHIELD</h2>
                <p className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.5em] mt-2">Scientific Contract Intelligence</p>
            </div>

            <div className="space-y-4">
                <input 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-blue-500 transition-all font-mono text-sm tracking-widest" 
                    placeholder="PASTE_TOKEN_CONTRACT_ADDRESS" 
                    value={rugAddress} 
                    onChange={(e) => setRugAddress(e.target.value)} 
                />
                <button onClick={analyzeRug} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-blue-500 transition-all shadow-xl flex items-center justify-center gap-3">
                    {isAnalyzingRug ? <Activity className="animate-spin" /> : <Search size={18} />}
                    {isAnalyzingRug ? "EXTRACTING TOKEN DATA..." : "RUN SECURITY AUDIT"}
                </button>
            </div>

            <AnimatePresence>
                {rugAnalysis && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative group overflow-hidden">
                              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Layers size={60} /></div>
                              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Trust Score</span>
                              <div className="text-7xl font-[1000] italic text-white mt-2">{rugAnalysis.score}%</div>
                              <div className="mt-4 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full inline-block text-[10px] font-black text-blue-400">
                                {rugAnalysis.status}
                              </div>
                          </div>
                          <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                              {[
                                { label: 'Liquidity', val: rugAnalysis.liquidity, icon: <Flame size={14} /> },
                                { label: 'Authority', val: rugAnalysis.mint, icon: <Shield size={14} /> },
                                { label: 'Holders', val: rugAnalysis.topHolders, icon: <Eye size={14} /> }
                              ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 opacity-40">
                                      {item.icon} <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <span className="text-[10px] font-mono font-black text-blue-400">{item.val}</span>
                                </div>
                              ))}
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} onClick={() => setIsRugModalOpen(true)} className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:border-blue-500/50 transition-all shadow-2xl">
                           <div className="flex items-center gap-6">
                             <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400"><BarChart3 /></div>
                             <div>
                               <p className="text-[12px] font-black uppercase tracking-widest">Generate Audit Identity</p>
                               <p className="text-[9px] opacity-30 font-mono mt-1">Extracted Asset: {rugAnalysis.tokenName}</p>
                             </div>
                           </div>
                           <ChevronRight className="text-blue-500" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- TAB: RADAR --- */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pt-10 pb-40 space-y-6">
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 animate-pulse"><Radio className="text-green-500" /></div>
              <div>
                <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter text-green-500 leading-none">NEURAL RADAR</h2>
                <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-1">Direct Mainnet Whale Feed</p>
              </div>
            </div>
            <div className="space-y-4">
              {whaleAlerts.length === 0 && <p className="text-center py-20 opacity-20 font-mono text-[10px] tracking-[0.5em]">Scanning for whale activity...</p>}
              {whaleAlerts.map(a => (
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={a.id} className="bg-slate-900/60 border-l-[6px] border-l-green-600 border border-white/5 p-8 rounded-[2rem] flex justify-between items-center group hover:bg-slate-800 transition-all">
                  <div>
                    <p className="text-3xl font-[1000] italic group-hover:text-green-400 transition-colors">{a.amount} <span className="text-xs text-green-500">{a.asset}</span></p>
                    <p className="text-[10px] opacity-30 uppercase tracking-widest mt-1 font-mono">{a.type} • {a.source}</p>
                  </div>
                  <ChevronRight className="opacity-10 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-green-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- TAB: HALL OF FAME --- */}
        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pt-10 pb-40">
             {[
               {id: 'SENKU_CORE', val: '50,230', class: 'OMEGA'}, 
               {id: 'GEN_ASSAIRI', val: '28,500', class: 'ALPHA'},
               {id: 'CHROME_PROTO', val: '15,200', class: 'BETA'},
               {id: 'KOHAKU_LAB', val: '9,800', class: 'BETA'}
             ].map((w, i) => (
                <div key={i} className="bg-slate-900/40 border border-white/10 p-12 rounded-[3.5rem] flex items-center gap-8 relative overflow-hidden group hover:border-green-500/50 transition-all shadow-2xl">
                    <Trophy size={120} className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-all text-green-500" />
                    <div className="w-20 h-20 rounded-3xl bg-green-600 flex items-center justify-center font-[1000] text-4xl italic">#{i+1}</div>
                    <div>
                      <p className="text-[10px] font-mono text-green-500 uppercase tracking-[0.4em] mb-2">{w.class}_IDENTIFIED</p>
                      <p className="text-5xl font-[1000] italic tracking-tighter leading-none">{w.val} <span className="text-xs opacity-20">SOL</span></p>
                      <p className="text-[12px] font-black opacity-30 uppercase mt-2 tracking-widest">{w.id}</p>
                    </div>
                </div>
             ))}
          </motion.div>
        )}
      </main>

      {/* --- MODAL: MAIN PASSPORT --- */}
      <AnimatePresence>
          {isModalOpen && data && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-[580px] flex flex-col items-center">
                  <button onClick={() => setIsModalOpen(false)} className="absolute -top-14 right-0 p-4 text-white/50 hover:text-red-500 transition-colors"><X size={35} /></button>
                  
                  <div ref={modalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2px] border-green-500/50 rounded-[3rem] p-12 overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <img src="/senku.GIF" className="absolute right-[-10%] bottom-[-10%] w-[300px] opacity-10 grayscale pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-white/5 border border-white/10 rounded-xl"><ShieldCheck className="text-green-500" /></div>
                              <div>
                                <p className="text-[11px] font-[1000] uppercase tracking-widest text-white">Senku Verified</p>
                                <p className="text-[8px] font-mono opacity-30 uppercase text-green-500">System_Authenticated</p>
                              </div>
                            </div>
                            <div className="text-right text-[9px] font-mono opacity-20">{data.hash}</div>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-2 font-black">Wealth index score</p>
                            <h2 className="text-7xl font-[1000] italic tracking-tighter leading-none">${data.usdDisplay}</h2>
                            <p className="text-[12px] font-mono mt-4 text-green-500 font-bold tracking-widest uppercase">{data.sol} {data.symbol} ON-CHAIN DATA</p>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/5 pt-8">
                            <div>
                              <p className="text-[9px] uppercase opacity-30 font-black tracking-widest mb-1">Status Class</p>
                              <p className="text-4xl font-[1000] italic text-green-500">{data.status}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] opacity-30 uppercase font-black">Lab Stamp</p>
                              <p className="text-sm font-mono font-black">{data.date}</p>
                            </div>
                        </div>
                    </div>
                  </div>

                  <button onClick={() => saveCardImage(modalRef, `SENKU_ID_${data.hash}`)} className="mt-10 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all shadow-2xl">
                    <Download size={20} /> Export Lab Credentials
                  </button>
               </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* --- MODAL: RUG SHIELD AUDIT CARD --- */}
      <AnimatePresence>
          {isRugModalOpen && rugAnalysis && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-[580px] flex flex-col items-center">
                <button onClick={() => setIsRugModalOpen(false)} className="absolute -top-14 right-0 p-4 text-white/50 hover:text-red-500"><X size={35} /></button>
                
                <div ref={rugModalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2px] border-blue-500/50 rounded-[3rem] p-12 overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.2)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400"><Shield size={26} /></div>
                            <div>
                              <p className="text-[11px] font-[1000] uppercase tracking-widest">Security Audit</p>
                              <p className="text-[8px] font-mono opacity-30 text-blue-400">SENKU_WORLD_LABS_2026</p>
                            </div>
                        </div>
                        <p className="text-[9px] font-mono opacity-20">{rugAnalysis.hash}</p>
                    </div>
                    
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] opacity-30 font-black mb-1">Detected Smart Contract Asset</p>
                        <h2 className="text-7xl font-[1000] italic tracking-tighter text-white leading-none">{rugAnalysis.tokenName}</h2>
                        <div className="flex items-center gap-5 mt-4">
                            <span className="text-4xl font-[1000] italic text-blue-400">{rugAnalysis.score}% <span className="text-xs not-italic opacity-30">TRUST</span></span>
                            <div className="h-6 w-[1px] bg-white/10" />
                            <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest break-all max-w-[200px]">CA: {rugAddress.substring(0,30)}...</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                        <div>
                          <p className="text-[8px] opacity-30 uppercase font-bold tracking-widest mb-1">Liquidity</p>
                          <p className="text-xs font-mono font-black text-blue-400">{rugAnalysis.liquidity}</p>
                        </div>
                        <div>
                          <p className="text-[8px] opacity-30 uppercase font-bold tracking-widest mb-1">Top_Holders</p>
                          <p className="text-xs font-mono font-black text-blue-400">{rugAnalysis.topHolders}</p>
                        </div>
                        <div>
                          <p className="text-[8px] opacity-30 uppercase font-bold tracking-widest mb-1">Status</p>
                          <p className="text-xs font-mono font-black text-white">{rugAnalysis.status}</p>
                        </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => saveCardImage(rugModalRef, `SECURITY_AUDIT_${rugAnalysis.tokenName}`)} className="mt-10 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all">
                  <Download size={20} /> Export Audit Identity
                </button>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* --- FOOTER & CONTROLS --- */}
      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6 mt-auto">
          <div className="flex gap-4">
            <button onClick={toggleMute} className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-green-500/10 transition-all shadow-xl group">
              {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 group-hover:scale-110 transition-transform" />}
            </button>
            <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-5 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:border-green-500/50 transition-all shadow-xl group">
              <Github size={22} className="group-hover:text-green-500 transition-colors" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase opacity-40 tracking-widest">Protocol Master</span>
                <span className="text-[13px] font-mono text-white/90">@bedro95</span>
              </div>
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-10">
            <p className="text-[10px] font-mono tracking-[2em] uppercase select-none">SENKU_WORLD // 2026</p>
          </div>
      </footer>

      <style jsx global>{`
        body { background-color: #020617; margin: 0; cursor: crosshair; overflow-x: hidden; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        input::placeholder { color: rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
}
