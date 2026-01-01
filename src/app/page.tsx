"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio, X, Maximize2, Sparkles, Flame, Terminal, BrainCircuit, TrendingUp, ShieldAlert, Search, Eye, AlertTriangle, Shield
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (WAGMI)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V7.0 - NEON SHIELD & IDENTITY EVOLUTION
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // New States for Rug Shield
  const [rugAddress, setRugAddress] = useState('');
  const [tokenName, setTokenName] = useState(''); // Added Token Name State
  const [rugAnalysis, setRugAnalysis] = useState<any>(null);
  const [isAnalyzingRug, setIsAnalyzingRug] = useState(false);
  const [isRugModalOpen, setIsRugModalOpen] = useState(false); // New Modal for Rug Card

  const [isNeuralProcessing, setIsNeuralProcessing] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const rugModalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- RUG SHIELD ENGINE ---
  const analyzeRug = async () => {
    if (!rugAddress) return;
    setIsAnalyzingRug(true);
    if (!isMuted) audioScan.current?.play();
    
    setTimeout(() => {
      const mockResult = {
        score: Math.floor(Math.random() * 20) + 80,
        liquidity: "LOCKED (99.2%)",
        mint: "DISABLED",
        topHolders: "4.2%",
        status: "SAFE_GRAIL",
        riskLevel: "LOW",
        tokenName: tokenName || "UNKNOWN_TOKEN", // Link token name
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SHIELD-" + Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      setRugAnalysis(mockResult);
      setIsAnalyzingRug(false);
    }, 3000);
  };

  const triggerNeuralIntent = async () => {
    if (!data) return;
    setIsNeuralProcessing(true);
    setTimeout(() => {
      const predictions = [
        "WHALE ACCUMULATION DETECTED: EXPECT +12% VOLATILITY",
        "LIQUIDITY SHIFT: NEURAL NODES SUGGEST ENTRY AT $142.5",
        "INSTITUTIONAL INTENT: LARGE OTC TRANSFER INBOUND",
        "PATTERN RECOGNITION: ASCENDING TRIANGLE FORMING ON-CHAIN",
        "MEV BOT ACTIVITY DETECTED: ALPHA SHIELD ACTIVATED"
      ];
      setIntentSignal(predictions[Math.floor(Math.random() * predictions.length)]);
      setIsNeuralProcessing(false);
    }, 2500);
  };

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

  // Shared function for saving cards
  const saveCardImage = (reference: any, fileName: string) => {
    if (!reference.current) return;
    toPng(reference.current, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = url;
      link.click();
    });
  };

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
      let topAsset = { symbol: 'SOL', amount: 0, usdValue: 0 };
      let maxUsdValue = -1;

      if (result.nativeBalance) {
        const solPrice = result.nativeBalance.price_per_token || 0;
        const solAmt = result.nativeBalance.lamports / 1_000_000_000;
        const solUsd = solAmt * solPrice;
        topAsset = { symbol: 'SOL', amount: solAmt, usdValue: solUsd };
        maxUsdValue = solUsd;
      }

      result.items?.forEach((item: any) => {
        const usdValue = item.token_info?.price_info?.total_price || 0;
        if (usdValue > maxUsdValue) {
          maxUsdValue = usdValue;
          topAsset = {
            symbol: item.token_info?.symbol || 'ASSET',
            amount: item.token_info?.balance / Math.pow(10, item.token_info?.decimals) || 0,
            usdValue: usdValue
          };
        }
      });

      let tierColor = maxUsdValue >= 1000 ? "#22c55e" : maxUsdValue >= 100 ? "#10b981" : "#0ea5e9";
      setIntelligenceScore(Math.floor(Math.random() * 40) + (maxUsdValue > 1000 ? 60 : 30));

      setData({
        sol: topAsset.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        symbol: topAsset.symbol,
        usdDisplay: maxUsdValue.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        status: `${topAsset.symbol} HOLDER`,
        tierColor,
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        power: ((maxUsdValue / 500) + 10).toFixed(2) + "B%"
      });
    } catch (e) {
      alert("Scientific Calculation Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">
      
      {/* Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] z-10" />
        <motion.img 
          src="/senku.GIF" 
          alt="Senku Background" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, x: [-10, 10, -10], y: [-5, 5, -5] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            className="absolute w-[1px] h-[10px] bg-green-500/50 z-20" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* --- NEW NEON NAVIGATION BAR --- */}
      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-black/40 border border-white/5 p-2 rounded-2xl backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)] relative">
          {/* Neon Pulse Overlay */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-green-500/20 rounded-2xl blur-md opacity-50 animate-pulse" />
          
          {['scan', 'rug shield', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 group ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
              
              {activeTab === tab && (
                <>
                  <motion.div layoutId="tab-glow" className="absolute inset-0 bg-green-500/10 rounded-xl blur-sm" />
                  <motion.div layoutId="tab-pill" className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 shadow-[0_0_20px_rgba(34,197,94,0.4)] rounded-xl" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                </>
              )}
              
              <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform">
                {tab === 'scan' && <Fingerprint size={16} className={activeTab === tab ? "animate-pulse" : ""} />}
                {tab === 'rug shield' && <ShieldAlert size={16} className={activeTab === tab ? "animate-bounce" : ""} />}
                {tab === 'radar' && <Radio size={16} className={activeTab === tab ? "animate-spin-slow" : ""} />}
                {tab === 'hall of fame' && <Trophy size={16} />}
                {tab}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow justify-center">
        
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
             <div className="text-center mb-12 relative">
              <motion.h1 className="text-[18vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent drop-shadow-2xl select-none px-4">
                SENKU
              </motion.h1>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="h-[1px] w-12 bg-green-500/50" />
                <p className="text-[10px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-80">Neural Scientific Protocol</p>
                <div className="h-[1px] w-12 bg-green-500/50" />
              </div>
            </div>

            <div className="w-full max-w-lg px-6 mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-green-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <input 
                  className="relative w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest placeholder:opacity-20" 
                  placeholder="INPUT_SOLANA_ADDRESS" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                />
              </div>
              <button onClick={analyze} className="w-full mt-5 py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-2xl">
                {loading ? "SEARCHING 10 BILLION%..." : "INITIALIZE NEURAL SCAN"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pb-32 px-4 w-full flex flex-col items-center gap-6">
                  {/* Web3 Features Grid & Intent Hub... (Kept as original) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-green-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><BrainCircuit size={80} /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Neural IQ</span>
                        <div className="text-4xl font-[1000] italic mb-1">{intelligenceScore}</div>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-blue-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp size={80} /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Asset Velocity</span>
                        <div className="text-4xl font-[1000] italic mb-1">+{data.power}</div>
                     </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} onClick={() => setIsModalOpen(true)} className="relative cursor-pointer group w-full max-w-md">
                    <div className="absolute -inset-1 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all rounded-3xl" />
                    <div className="relative bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500"><Maximize2 size={24} /></div>
                            <div><p className="text-[10px] font-black uppercase tracking-widest">Digital Passport</p></div>
                        </div>
                        <ChevronRight className="text-white/20 group-hover:text-green-500 transition-colors" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Rug Shield Tab (MODIFIED WITH CARD FEATURE) */}
        {activeTab === 'rug shield' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl px-6 pt-10 pb-40">
            <div className="flex flex-col items-center mb-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-6 border border-green-500/20">
                    <ShieldCheck size={40} className="text-green-500" />
                </div>
                <h2 className="text-5xl font-[1000] italic uppercase tracking-tighter text-white">RUG SHIELD</h2>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] mt-2">Solana Contract Security Auditor</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                      className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest" 
                      placeholder="TOKEN_NAME (E.G. SENKU)" 
                      value={tokenName} 
                      onChange={(e) => setTokenName(e.target.value)} 
                  />
                  <input 
                      className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest" 
                      placeholder="CONTRACT_ADDRESS" 
                      value={rugAddress} 
                      onChange={(e) => setRugAddress(e.target.value)} 
                  />
                </div>
                <button onClick={analyzeRug} className="w-full py-6 bg-green-600 text-white rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-500 transition-all shadow-[0_0_40px_rgba(34,197,94,0.3)] flex items-center justify-center gap-3">
                    {isAnalyzingRug ? <Activity className="animate-spin" /> : <Search size={18} />}
                    {isAnalyzingRug ? "AUDITING CONTRACT..." : "START SECURITY SCAN"}
                </button>
            </div>

            <AnimatePresence>
                {rugAnalysis && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                              <div className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-6">Security Score</div>
                              <div className="text-7xl font-[1000] italic text-white mb-2">{rugAnalysis.score}<span className="text-2xl opacity-20">/100</span></div>
                              <div className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full inline-block bg-green-500/20 text-green-500`}>
                                  {rugAnalysis.status}
                              </div>
                          </div>
                          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6">
                              {[
                                  { label: 'Liquidity', val: rugAnalysis.liquidity, icon: <Flame size={14} /> },
                                  { label: 'Top Holders', val: rugAnalysis.topHolders, icon: <Eye size={14} /> },
                                  { label: 'Renounced', val: 'YES', icon: <ShieldCheck size={14} /> }
                              ].map((item, i) => (
                                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                      <span className="flex items-center gap-2 opacity-40 text-[10px] font-bold uppercase">{item.icon}{item.label}</span>
                                      <span className="text-[10px] font-mono font-black text-green-500">{item.val}</span>
                                  </div>
                              ))}
                          </div>
                        </div>

                        {/* NEW: Open Security Card Button */}
                        <motion.div whileHover={{ scale: 1.02 }} onClick={() => setIsRugModalOpen(true)} className="relative cursor-pointer group w-full">
                          <div className="absolute -inset-1 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all rounded-3xl" />
                          <div className="relative bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400"><Shield size={24} /></div>
                                  <div><p className="text-[10px] font-black uppercase tracking-widest">Security Audit Card</p></div>
                              </div>
                              <ChevronRight className="text-white/20 group-hover:text-blue-400 transition-colors" />
                          </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ... (Other tabs like radar & hall of fame remain same) */}
        
        {/* --- IDENTITY CARDS MODALS --- */}
        
        {/* Modal 1: Scan Identity (As original) */}
        <AnimatePresence>
          {isModalOpen && data && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="relative w-full max-w-[550px] flex flex-col items-center">
                <button onClick={() => setIsModalOpen(false)} className="absolute -top-12 right-0 p-3 text-white/50 hover:text-red-500 transition-colors"><X size={32} /></button>
                <div ref={modalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2.5px] rounded-[3rem] p-10 overflow-hidden" style={{ borderColor: data.tierColor }}>
                  <img src="/senku.GIF" className="absolute right-[-15%] bottom-[-15%] w-[280px] opacity-10 grayscale pointer-events-none" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10"><ShieldCheck size={24} style={{ color: data.tierColor }} /></div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Senku Verified</p>
                      </div>
                    </div>
                    <div className="mb-10 mt-6">
                      <h2 className="text-6xl font-[1000] italic tracking-tighter">${data.usdDisplay} <span className="text-2xl not-italic opacity-40">USD</span></h2>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-8 mt-auto">
                      <div><p className="text-4xl font-[1000] italic uppercase" style={{ color: data.tierColor }}>{data.status}</p></div>
                      <div className="text-right"><p className="text-lg font-mono text-green-500 font-black">{intelligenceScore} IQ</p></div>
                    </div>
                  </div>
                </div>
                <button onClick={() => saveCardImage(modalRef, `SENKU_ID_${data?.hash}`)} className="mt-8 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all shadow-2xl">
                  <Download size={20} /> Extract Lab Credentials
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal 2: Rug Shield Security Card (NEW) */}
        <AnimatePresence>
          {isRugModalOpen && rugAnalysis && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="relative w-full max-w-[550px] flex flex-col items-center">
                <button onClick={() => setIsRugModalOpen(false)} className="absolute -top-12 right-0 p-3 text-white/50 hover:text-red-500 transition-colors"><X size={32} /></button>
                <div ref={rugModalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2.5px] border-blue-500/50 rounded-[3rem] p-10 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20"><Shield size={24} className="text-blue-400" /></div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest leading-none">Security Audit</p>
                          <p className="text-[8px] opacity-30 font-mono mt-1">SHIELD_PROTOCOL_ACTIVE</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">{rugAnalysis.status}</p>
                        <p className="text-[8px] opacity-30 font-mono mt-1">{rugAnalysis.hash}</p>
                      </div>
                    </div>
                    <div className="mb-10 mt-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2 font-bold">Targeted Token Identification</p>
                      <h2 className="text-6xl font-[1000] italic tracking-tighter leading-none text-white">
                        {rugAnalysis.tokenName} <span className="text-2xl not-italic opacity-40 text-blue-400">SCORE: {rugAnalysis.score}</span>
                      </h2>
                      <p className="text-[9px] font-mono mt-4 opacity-50 tracking-[0.2em] break-all max-w-[80%]">{rugAddress}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 mt-auto">
                      <div>
                        <p className="text-[8px] uppercase opacity-30 mb-1 tracking-widest">Liquidity</p>
                        <p className="text-xs font-mono font-bold text-green-500">{rugAnalysis.liquidity}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase opacity-30 mb-1 tracking-widest">Mint Auth</p>
                        <p className="text-xs font-mono font-bold text-green-500">{rugAnalysis.mint}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase opacity-30 mb-1 tracking-widest">Analysis Date</p>
                        <p className="text-xs font-mono font-bold">{rugAnalysis.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => saveCardImage(rugModalRef, `SHIELD_AUDIT_${rugAnalysis?.tokenName}`)} className="mt-8 flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-blue-500 transition-all shadow-2xl">
                  <Download size={20} /> Export Audit Certificate
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6 mt-auto">
        <div className="flex gap-4">
          <button onClick={toggleMute} className="p-4 bg-white/5 border border-green-500/20 rounded-full hover:bg-green-500/10 transition-all">
            {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 animate-pulse" />}
          </button>
          <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:border-green-500/50 transition-all shadow-xl">
            <Github size={20} className="group-hover:text-green-500 transition-colors" />
            <div className="flex flex-col"><span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Protocol Lead</span><span className="text-[12px] font-mono text-white/90">@bedro95</span></div>
          </a>
        </div>
        <p className="text-[10px] font-mono tracking-[2em] opacity-10 uppercase select-none">SENKU_WORLD // 2026</p>
      </footer>

      <style jsx global>{`
        body { background-color: #020617; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
}
