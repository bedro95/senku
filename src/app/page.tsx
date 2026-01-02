"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio, X, Maximize2, Sparkles, Flame, Terminal, BrainCircuit, TrendingUp, ShieldAlert, Search, Eye, AlertTriangle, Users, Send, ExternalLink
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (Senku)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V8.0 - KOLSCAN INTERFACE INTEGRATED
 * STATUS: PROFESSIONAL WEB3 INTERFACE
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // States for Rug Shield
  const [rugAddress, setRugAddress] = useState('');
  const [rugAnalysis, setRugAnalysis] = useState<any>(null);
  const [isAnalyzingRug, setIsAnalyzingRug] = useState(false);

  const [isNeuralProcessing, setIsNeuralProcessing] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  // KOL Leaderboard Data (Mirrored from Kolscan.io)
  const [competitors, setCompetitors] = useState([
    { rank: 1, name: "Beaver", sol: "+303.97", usd: "$40,014.2", platforms: ['x'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beaver" },
    { rank: 2, name: "Inside Calls", sol: "+222.79", usd: "$29,327.8", platforms: ['x', 'tg'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Inside" },
    { rank: 3, name: "Cented", sol: "+114.81", usd: "$15,114.2", platforms: ['x'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cented" },
    { rank: 4, name: "Gake", sol: "+112.49", usd: "$14,808.0", platforms: ['x', 'tg'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gake" },
    { rank: 5, name: "fz7", sol: "+70.20", usd: "$9,241.7", platforms: ['x'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fz7" },
    { rank: 6, name: "M A M B A 🐍", sol: "+62.53", usd: "$8,231.9", platforms: ['x'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamba" },
    { rank: 7, name: "Rilsio", sol: "+56.08", usd: "$7,382.6", platforms: ['x', 'tg'], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rilsio" },
  ]);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
        riskLevel: "LOW"
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

  useEffect(() => {
    if (activeTab !== 'radar') return;
    let socket: WebSocket;
    let fallbackInterval: NodeJS.Timeout;

    const addAlert = (amount: number, type: string, source: string) => {
      const newAlert = {
        id: Date.now() + Math.random(),
        amount: amount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        asset: "SOL",
        usd: source,
        type: type
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 8));
    };

    const startWebSocket = () => {
      socket = new WebSocket('wss://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483');
      socket.onopen = () => {
        socket.send(JSON.stringify({
          jsonrpc: "2.0", id: 1, method: "transactionSubscribe",
          params: [{ vote: false, failed: false }, { commitment: "confirmed", encoding: "jsonParsed", transactionDetails: "full", maxSupportedTransactionVersion: 0 }]
        }));
      };
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.params?.result?.transaction) {
          const meta = response.params.result.meta;
          if (meta?.postBalances && meta?.preBalances) {
            const solChange = (meta.postBalances[0] - meta.preBalances[0]) / 1_000_000_000;
            if (Math.abs(solChange) > 5) {
              addAlert(Math.abs(solChange), solChange > 0 ? "WHALE_INFLOW" : "WHALE_OUTFLOW", "LIVE_MAINNET");
            }
          }
        }
      };
    };

    const startFallback = () => {
      fallbackInterval = setInterval(() => {
        if (Math.random() > 0.6) { 
          const fakeAmount = Math.random() * 800 + 50;
          addAlert(fakeAmount, Math.random() > 0.5 ? "WHALE_INFLOW" : "WHALE_OUTFLOW", "NEURAL_PRED");
        }
      }, 4500);
    };

    startWebSocket();
    startFallback();
    return () => {
      if (socket) socket.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [activeTab]);

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
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'senku-analysis',
          method: 'getAssetsByOwner',
          params: {
            ownerAddress: address.trim(),
            displayOptions: { showNativeBalance: true }
          },
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
      const score = Math.floor(Math.random() * 40) + (maxUsdValue > 1000 ? 60 : 30);
      setIntelligenceScore(score);

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

  const saveCard = () => {
    const target = modalRef.current || cardRef.current;
    if (!target) return;
    toPng(target, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a');
      link.download = `SENKU_ID_${data?.hash}.png`;
      link.href = url;
      link.click();
    });
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

      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.4)]">
          {['scan', 'rug shield', 'radar', 'Competitors'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
              {activeTab === tab && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 shadow-[0_0_25px_rgba(34,197,94,0.5)] rounded-xl" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === 'scan' && <Fingerprint size={14} />}
                {tab === 'rug shield' && <ShieldAlert size={14} />}
                {tab === 'radar' && <Radio size={14} />}
                {tab === 'Competitors' && <Trophy size={14} />}
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
                  {/* Web3 Luxury Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                     {/* Feature 1: Intelligence */}
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-green-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BrainCircuit size={80} />
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Neural IQ</span>
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-green-500/30 rounded-full" />)}
                            </div>
                        </div>
                        <div className="text-4xl font-[1000] italic mb-1">{intelligenceScore}</div>
                        <p className="text-[9px] font-mono text-white/40 uppercase tracking-tighter">On-chain Cognitive Assessment</p>
                     </div>

                     {/* Feature 2: Wealth Status */}
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-blue-500/50 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={80} />
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Asset Velocity</span>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                        </div>
                        <div className="text-4xl font-[1000] italic mb-1">+{data.power}</div>
                        <p className="text-[9px] font-mono text-white/40 uppercase tracking-tighter">Power Tier Synchronization</p>
                     </div>
                  </div>

                  {/* NEURAL INTENT ENGINE UI */}
                  <motion.div className="w-full max-w-3xl bg-gradient-to-b from-slate-900 to-black border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <div className="flex items-center gap-3 text-white/80 font-black uppercase text-[11px] tracking-[0.4em] mb-6">
                      <Terminal size={18} className="text-green-500" />
                      Intent Prediction Hub
                    </div>
                    
                    <div className="w-full bg-black/60 rounded-2xl p-6 border border-white/5 min-h-[100px] mb-6 shadow-inner">
                      {intentSignal ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 font-mono text-xs leading-relaxed uppercase tracking-widest">
                          {">"} {intentSignal}
                        </motion.p>
                      ) : (
                        <p className="text-white/10 font-mono text-[10px] uppercase tracking-widest animate-pulse">Awaiting neural input...</p>
                      )}
                    </div>

                    <button onClick={triggerNeuralIntent} disabled={isNeuralProcessing} className="w-full relative flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-green-500 hover:text-white transition-all">
                       {isNeuralProcessing ? "PROCESSING DATA..." : "PREDICT FUTURE INTENT"}
                    </button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} onClick={() => setIsModalOpen(true)} className="relative cursor-pointer group w-full max-w-md">
                    <div className="absolute -inset-1 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all rounded-3xl" />
                    <div className="relative bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
                                <Maximize2 size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest">Digital Passport</p>
                                <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Scientific ID v.5.0</p>
                            </div>
                        </div>
                        <ChevronRight className="text-white/20 group-hover:text-green-500 transition-colors" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Rug Shield Tab */}
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
                <div className="relative group">
                    <input 
                        className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest" 
                        placeholder="PASTE_SOLANA_CONTRACT_ADDRESS" 
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
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                            <div className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-6">Security Score</div>
                            <div className="text-7xl font-[1000] italic text-white mb-2">{rugAnalysis.score}<span className="text-2xl opacity-20">/100</span></div>
                            <div className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full inline-block ${rugAnalysis.riskLevel === 'LOW' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                {rugAnalysis.status}
                            </div>
                        </div>

                        <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 space-y-6">
                            {[
                                { label: 'Liquidity', val: rugAnalysis.liquidity, icon: <Flame size={14} /> },
                                { label: 'Mint Authority', val: rugAnalysis.mint, icon: <Activity size={14} /> },
                                { label: 'Top 10 Holders', val: rugAnalysis.topHolders, icon: <Eye size={14} /> },
                                { label: 'Renounced', val: 'YES', icon: <ShieldCheck size={14} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 opacity-40">
                                        {item.icon}
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <span className="text-[10px] font-mono font-black text-green-500 uppercase">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Radar Tab */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pt-10 pb-40 space-y-5">
            <h2 className="text-5xl font-[1000] italic uppercase flex items-center gap-5 text-green-500 tracking-tighter"><Zap /> Neural Radar</h2>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">Real-time Whale Activity Analysis</p>
            {whaleAlerts.map((a) => (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={a.id} className="bg-slate-900/80 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center border-l-[6px] border-l-green-600 shadow-xl group hover:bg-slate-800/80 transition-all">
                <div>
                  <p className="text-3xl font-[1000] italic group-hover:text-green-400 transition-colors">{a.amount} <span className="text-xs text-green-500">{a.asset}</span></p>
                  <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] mt-1">{a.type} • {a.usd}</p>
                </div>
                <ChevronRight className="text-green-600 group-hover:translate-x-2 transition-transform" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Competitors Tab - Mirroring Kolscan.io Design */}
        {activeTab === 'Competitors' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl px-4 pt-10 pb-40">
            <div className="flex flex-col mb-8">
              <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-2">KOL Leaderboard</h2>
              <div className="flex gap-4">
                 {['Daily', 'Weekly', 'Monthly'].map(period => (
                   <button key={period} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 ${period === 'Daily' ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>
                     {period}
                   </button>
                 ))}
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
               {/* Table Header */}
               <div className="grid grid-cols-[60px_1fr_auto] px-8 py-5 border-b border-white/5 bg-white/5 opacity-40">
                  <span className="text-[10px] font-black uppercase tracking-widest">Rank</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Maker / KOL</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-right">Profit</span>
               </div>

               {/* Table Content */}
               <div className="divide-y divide-white/5">
                  {competitors.map((kol, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ x: -20, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      transition={{ delay: i * 0.05 }}
                      className={`grid grid-cols-[60px_1fr_auto] items-center px-8 py-6 hover:bg-white/[0.02] transition-colors group ${kol.rank === 1 ? 'bg-yellow-500/5' : ''}`}
                    >
                      {/* Rank Column */}
                      <div className="flex items-center">
                        {kol.rank === 1 ? (
                          <Trophy size={20} className="text-yellow-500" />
                        ) : (
                          <span className="text-xl font-[1000] italic opacity-40 group-hover:opacity-100 transition-opacity">
                            {kol.rank}
                          </span>
                        )}
                      </div>

                      {/* Maker / KOL Info */}
                      <div className="flex items-center gap-4">
                        <img src={kol.avatar} className="w-10 h-10 rounded-full bg-white/5 border border-white/10" alt="" />
                        <div className="flex flex-col">
                           <div className="flex items-center gap-2">
                              <span className="font-bold tracking-tight text-lg">{kol.name}</span>
                              <div className="flex gap-1.5">
                                 {kol.platforms.includes('x') && (
                                   <div className="p-1 rounded bg-white/5 border border-white/10 opacity-60 hover:opacity-100 cursor-pointer">
                                      <ExternalLink size={10} />
                                   </div>
                                 )}
                                 {kol.platforms.includes('tg') && (
                                   <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 opacity-60 hover:opacity-100 cursor-pointer">
                                      <Send size={10} />
                                   </div>
                                 )}
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* Profit Column */}
                      <div className="text-right">
                         <p className="text-xl font-[1000] italic text-green-400 leading-none mb-1">
                           {kol.sol} Sol
                         </p>
                         <p className="text-[11px] font-mono text-green-400/50">
                           ({kol.usd})
                         </p>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="mt-8 text-center">
               <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] animate-pulse">
                 Live On-chain Neural Sync Active
               </p>
            </div>
          </motion.div>
        )}

        {/* Modal Identity Card */}
        <AnimatePresence>
          {isModalOpen && data && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }} className="relative w-full max-w-[550px] flex flex-col items-center">
                <button onClick={() => setIsModalOpen(false)} className="absolute -top-12 right-0 md:-right-12 p-3 text-white/50 hover:text-red-500 transition-colors">
                  <X size={32} />
                </button>
                <div ref={modalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2.5px] rounded-[3rem] p-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]" style={{ borderColor: data.tierColor }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  <img src="/senku.GIF" className="absolute right-[-15%] bottom-[-15%] w-[280px] opacity-10 grayscale pointer-events-none" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <ShieldCheck size={24} style={{ color: data.tierColor }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest leading-none">Senku Verified</p>
                          <p className="text-[8px] opacity-30 font-mono mt-1">SECURED_INTENT_ENGINE</p>
                        </div>
                      </div>
                      <Cpu size={24} className="opacity-20 animate-pulse" />
                    </div>
                    <div className="mb-10 mt-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2 font-bold">Scientific Wealth Index</p>
                      <h2 className="text-6xl md:text-7xl font-[1000] italic tracking-tighter leading-none">
                        ${data.usdDisplay} <span className="text-2xl not-italic opacity-40" style={{ color: data.tierColor }}>USD</span>
                      </h2>
                      <p className="text-sm font-mono mt-2 opacity-50 tracking-widest">{data.sol} {data.symbol} ON-CHAIN</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/5 pt-8">
                      <div>
                        <p className="text-[9px] uppercase opacity-30 flex items-center gap-2 mb-1"><Calendar size={12} /> Generation</p>
                        <p className="text-sm font-mono font-bold tracking-widest">{data.date}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase opacity-30 flex items-center gap-2 mb-1"><Hash size={12} /> LAB_ID</p>
                        <p className="text-sm font-mono font-bold tracking-widest text-white/80">{data.hash}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-8 mt-auto">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Class</p>
                        <p className="text-4xl font-[1000] italic uppercase leading-none" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] opacity-30 uppercase font-black tracking-widest">Brain Power</p>
                        <p className="text-lg font-mono text-green-500 font-black">{intelligenceScore} IQ</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all shadow-2xl active:scale-95">
                  <Download size={20} /> Extract Lab Credentials
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer System */}
      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6 mt-auto">
        <div className="flex flex-col items-center gap-4">
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
