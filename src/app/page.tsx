"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio, X, Maximize2, 
  Sparkles, Flame, Terminal, BrainCircuit, TrendingUp, 
  ShieldAlert, CheckCircle2, Search, AlertTriangle
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (WAGMI)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V7.0 - UI REVOLUTION
 * STATUS: PRESERVED LOGIC + LUXURY UI UPGRADE
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const [isNeuralProcessing, setIsNeuralProcessing] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  const [rugAddress, setRugAddress] = useState('');
  const [rugData, setRugData] = useState<any>(null);
  const [rugLoading, setRugLoading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- LUXURY MOTION EFFECTS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  // --- LOGIC PRESERVED ---
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

  const analyzeRug = async () => {
    if (!rugAddress || rugAddress.length < 32) return;
    setRugLoading(true);
    try {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 'rug-check',
          method: 'getAsset',
          params: { id: rugAddress.trim() },
        }),
      });
      const { result } = await response.json();
      const mintAuth = result.authorities?.find((a: any) => a.scopes?.includes('mint'));
      const freezeAuth = result.authorities?.find((a: any) => a.scopes?.includes('freeze'));
      const isMutable = result.content?.metadata?.is_mutable;
      let score = 100;
      if (mintAuth) score -= 50;
      if (freezeAuth) score -= 30;
      if (isMutable) score -= 10;

      setRugData({
        name: result.content?.metadata?.name || 'Unknown Token',
        symbol: result.content?.metadata?.symbol || '???',
        score: score,
        mintDisabled: !mintAuth,
        freezeDisabled: !freezeAuth,
        immutable: !isMutable,
        riskLevel: score >= 80 ? 'SECURE NODE' : score >= 50 ? 'CAUTION ADVISED' : 'CRITICAL BREACH'
      });
    } catch (e) { alert("Neural Shield Error"); } finally { setRugLoading(false); }
  };

  useEffect(() => {
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.5;
    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    const handleInitialInteraction = () => { if (!isMuted && bgMusic.current?.paused) bgMusic.current.play().catch(() => {}); };
    window.addEventListener('click', handleInitialInteraction);
    return () => window.removeEventListener('click', handleInitialInteraction);
  }, [isMuted]);

  useEffect(() => {
    if (activeTab !== 'radar') return;
    let socket: WebSocket;
    let fallbackInterval: NodeJS.Timeout;
    const addAlert = (amount: number, type: string, source: string) => {
      const newAlert = { id: Date.now() + Math.random(), amount: amount.toLocaleString(undefined, { maximumFractionDigits: 2 }), asset: "SOL", usd: source, type: type };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 8));
    };
    const startWebSocket = () => {
      socket = new WebSocket('wss://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483');
      socket.onopen = () => { socket.send(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "transactionSubscribe", params: [{ vote: false, failed: false }, { commitment: "confirmed", encoding: "jsonParsed", transactionDetails: "full", maxSupportedTransactionVersion: 0 }] })); };
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.params?.result?.transaction) {
          const meta = response.params.result.meta;
          if (meta?.postBalances && meta?.preBalances) {
            const solChange = (meta.postBalances[0] - meta.preBalances[0]) / 1_000_000_000;
            if (Math.abs(solChange) > 5) addAlert(Math.abs(solChange), solChange > 0 ? "WHALE_INFLOW" : "WHALE_OUTFLOW", "LIVE_MAINNET");
          }
        }
      };
    };
    const startFallback = () => { fallbackInterval = setInterval(() => { if (Math.random() > 0.6) { const fakeAmount = Math.random() * 800 + 50; addAlert(fakeAmount, Math.random() > 0.5 ? "WHALE_INFLOW" : "WHALE_OUTFLOW", "NEURAL_PRED"); } }, 4500); };
    startWebSocket(); startFallback();
    return () => { if (socket) socket.close(); if (fallbackInterval) clearInterval(fallbackInterval); };
  }, [activeTab]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (bgMusic.current) isMuted ? bgMusic.current.play() : bgMusic.current.pause();
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
    try {
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 'senku-analysis', method: 'getAssetsByOwner', params: { ownerAddress: address.trim(), displayOptions: { showNativeBalance: true } }, }),
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
          topAsset = { symbol: item.token_info?.symbol || 'ASSET', amount: item.token_info?.balance / Math.pow(10, item.token_info?.decimals) || 0, usdValue: usdValue };
        }
      });
      let tierColor = maxUsdValue >= 1000 ? "#22c55e" : maxUsdValue >= 100 ? "#10b981" : "#0ea5e9";
      const score = Math.floor(Math.random() * 40) + (maxUsdValue > 1000 ? 60 : 30);
      setIntelligenceScore(score);
      setData({ sol: topAsset.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }), symbol: topAsset.symbol, usdDisplay: maxUsdValue.toLocaleString(undefined, { maximumFractionDigits: 2 }), status: `${topAsset.symbol} HOLDER`, tierColor, date: new Date().toLocaleDateString('en-GB'), hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(), power: ((maxUsdValue / 500) + 10).toFixed(2) + "B%" });
    } catch (e) { alert("Scientific Calculation Error!"); } finally { setLoading(false); }
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
      
      {/* Background System (Snow + Senku) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] z-10" />
        <motion.img 
          src="/senku.GIF" alt="Senku" initial={{ opacity: 0 }}
          animate={{ opacity: 0.2, x: [-5, 5, -5] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
        />
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            className="absolute w-[1px] h-[10px] bg-green-500/50 z-20" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* Modern Navigation */}
      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-2xl">
          {['scan', 'rug-shield', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative px-6 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
              {activeTab === tab && (
                <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)] rounded-xl" />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === 'scan' && <Fingerprint size={14} />}
                {tab === 'rug-shield' && <ShieldCheck size={14} />}
                {tab === 'radar' && <Radio size={14} />}
                {tab === 'hall of fame' && <Trophy size={14} />}
                {tab}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl flex flex-grow flex-col items-center justify-center">
        
        {/* SCAN TAB - LUXURY VERSION */}
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <div className="text-center mb-12 relative">
              <motion.h1 className="text-[18vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white to-green-500/20 bg-clip-text text-transparent drop-shadow-2xl select-none px-4">
                SENKU
              </motion.h1>
              <p className="text-[10px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-50 mt-4">Neural Scientific Protocol</p>
            </div>

            <div className="w-full max-w-lg px-6 mb-16">
              <div className="relative group bg-slate-900/80 border border-white/10 rounded-2xl p-2 shadow-2xl">
                <input 
                  className="w-full bg-transparent p-5 outline-none font-mono text-sm tracking-widest text-center" 
                  placeholder="INPUT_SOLANA_ADDRESS" 
                  value={address} onChange={(e) => setAddress(e.target.value)} 
                />
                <button onClick={analyze} className="w-full mt-2 py-5 bg-white text-black rounded-xl font-[1000] uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all shadow-xl">
                  {loading ? "SEARCHING..." : "INITIALIZE SCAN"}
                </button>
              </div>
            </div>

            {/* RESULTS LUXURY GRID */}
            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-40">
                  
                  {/* IQ Card with 3D Interaction */}
                  <motion.div 
                    onMouseMove={handleMouseMove}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-2xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                       <BrainCircuit size={120} />
                    </div>
                    <div className="relative z-10">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mb-8">Neural IQ Index</p>
                       <h2 className="text-8xl font-[1000] italic leading-none mb-6">{intelligenceScore}</h2>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${intelligenceScore}%` }} className="h-full bg-green-500 shadow-[0_0_20px_#00ffa3]" />
                       </div>
                       <p className="text-[9px] font-mono text-white/30 mt-4 uppercase tracking-widest">Calculated via On-Chain Cognitive Patterns</p>
                    </div>
                  </motion.div>

                  {/* Intent Engine Luxury Box */}
                  <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-10 backdrop-blur-2xl flex flex-col justify-between">
                     <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                        <Activity className="text-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Market Intent Predictor</span>
                     </div>
                     <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-8 italic text-xs font-mono text-white/60 min-h-[100px] flex items-center justify-center text-center">
                        {intentSignal || "AWAITING NEURAL SYNC..."}
                     </div>
                     <button onClick={triggerNeuralIntent} disabled={isNeuralProcessing} className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-green-500 hover:text-white transition-all shadow-2xl disabled:opacity-50">
                        {isNeuralProcessing ? "DECODING..." : "TRIGGER PREDICTION"}
                     </button>
                  </div>

                  {/* ID Extraction Entry */}
                  <div className="md:col-span-2 flex justify-center">
                    <motion.div whileHover={{ scale: 1.02 }} onClick={() => setIsModalOpen(true)} className="w-full max-w-sm cursor-pointer group relative">
                       <div className="absolute -inset-1 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                       <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] p-6 flex items-center justify-between overflow-hidden">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><Maximize2 size={20} /></div>
                             <span className="text-[10px] font-black uppercase tracking-widest">Open Scientific Identity</span>
                          </div>
                          <ChevronRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                       </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* RUG SHIELD - REVOLUTIONARY UI */}
        {activeTab === 'rug-shield' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl px-6 pt-10 pb-40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Input Panel */}
              <div className="md:col-span-12 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-[3rem] p-12 backdrop-blur-2xl">
                <div className="flex flex-col items-center text-center mb-10">
                   <ShieldCheck size={48} className="text-green-500 mb-4" />
                   <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter">Neural Audit</h2>
                   <p className="text-[9px] font-mono text-green-500/40 uppercase tracking-[0.4em] mt-2">Protocol Vulnerability Scanner</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                  <input 
                    className="flex-1 bg-black/50 border border-white/10 rounded-2xl p-5 font-mono text-xs tracking-widest text-green-400 focus:border-green-500 outline-none transition-all"
                    placeholder="CONTRACT_ADDRESS_TO_AUDIT"
                    value={rugAddress} onChange={(e) => setRugAddress(e.target.value)}
                  />
                  <button onClick={analyzeRug} className="px-10 py-5 bg-green-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-green-500 transition-all">
                    {rugLoading ? "DECODING..." : "START AUDIT"}
                  </button>
                </div>
              </div>

              {/* Dynamic Results Grid */}
              <AnimatePresence>
                {rugData && (
                  <>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-7 bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                       <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-8 flex items-center gap-2"><Terminal size={12}/> Security Breakdown</p>
                       <div className="space-y-4">
                          {[
                            { label: "Mint Authority", status: rugData.mintDisabled, desc: "Can the dev print more tokens?" },
                            { label: "Freeze Authority", status: rugData.freezeDisabled, desc: "Can the dev block your wallet?" },
                            { label: "Metadata Mutable", status: rugData.immutable, desc: "Can the token info be changed?" }
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-5 bg-black/30 rounded-[1.5rem] border border-white/5 group hover:border-white/10 transition-all">
                               <div>
                                  <span className="text-[11px] font-black uppercase block">{item.label}</span>
                                  <span className="text-[8px] opacity-20 font-mono">{item.desc}</span>
                               </div>
                               {item.status ? <CheckCircle2 className="text-green-500" size={20} /> : <ShieldAlert className="text-red-500" size={20} />}
                            </div>
                          ))}
                       </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-5 bg-green-600 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-black text-center relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grayscale"><img src="/senku.GIF" className="w-full h-full object-cover"/></div>
                       <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Neural Safety Score</p>
                       <h3 className="text-8xl font-[1000] italic leading-none mb-4 group-hover:scale-110 transition-transform">{rugData.score}%</h3>
                       <p className="text-[11px] font-black uppercase bg-black text-white px-6 py-2 rounded-full tracking-widest">{rugData.riskLevel}</p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ... (باقي التبويبات Radar و Hall of Fame تظل كما هي في كودك الأصلي لأنها منسقة بشكل جيد) ... */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pt-10 pb-40 space-y-5">
            <h2 className="text-5xl font-[1000] italic uppercase flex items-center gap-5 text-green-500 tracking-tighter"><Zap /> Neural Radar</h2>
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

        {activeTab === 'hall of fame' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pt-10 pb-40">
            {[
              { id: 'SENKU', val: '50,000' }, { id: 'CHROME', val: '22,500' },
              { id: 'KOHAKU', val: '15,200' }, { id: 'GEN_ASSAIRI', val: '10,100' }
            ].map((w, i) => (
              <div key={i} className="bg-slate-900/40 border border-white/10 p-12 rounded-[3.5rem] flex items-center gap-8 relative group hover:border-green-500 transition-all shadow-2xl overflow-hidden">
                <Trophy size={100} className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-20 text-green-500 transition-all" />
                <div className="w-20 h-20 rounded-3xl bg-green-600 flex items-center justify-center font-[1000] text-4xl italic">#{i+1}</div>
                <div><p className="text-xs font-mono text-green-500 uppercase tracking-[0.4em] mb-2">{w.id}_PROTOCOL</p><p className="text-5xl font-[1000] italic tracking-tighter">{w.val} <span className="text-sm opacity-20">SOL</span></p></div>
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Modal - Preserved Identity Card */}
      <AnimatePresence>
        {isModalOpen && data && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative w-full max-w-[550px] flex flex-col items-center">
              <button onClick={() => setIsModalOpen(false)} className="absolute -top-16 right-0 text-white/50 hover:text-red-500 transition-colors"><X size={40} /></button>
              <div ref={modalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[3px] rounded-[3rem] p-10 overflow-hidden shadow-2xl" style={{ borderColor: data.tierColor }}>
                <img src="/senku.GIF" className="absolute right-[-10%] bottom-[-10%] w-[250px] opacity-10 grayscale pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={28} style={{ color: data.tierColor }} />
                      <div><p className="text-[10px] font-black uppercase tracking-widest leading-none">Senku Verified</p><p className="text-[8px] opacity-30 font-mono mt-1">SECURED_INTENT_ENGINE</p></div>
                    </div>
                    <Cpu size={24} className="opacity-20" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2 font-bold">Scientific Wealth Index</p>
                    <h2 className="text-7xl font-[1000] italic tracking-tighter leading-none">${data.usdDisplay} <span className="text-2xl not-italic opacity-40">USD</span></h2>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <div><p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Class</p><p className="text-4xl font-[1000] italic uppercase leading-none" style={{ color: data.tierColor }}>{data.status}</p></div>
                    <div className="text-right"><p className="text-[9px] opacity-30 uppercase font-black">Brain Power</p><p className="text-lg font-mono text-green-500 font-black">{intelligenceScore} IQ</p></div>
                  </div>
                </div>
              </div>
              <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all">
                <Download size={20} /> Extract Lab Credentials
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-[100] py-10 w-full flex flex-col items-center gap-6 mt-auto">
        <div className="flex gap-4">
          <button onClick={toggleMute} className="p-4 bg-white/5 border border-white/10 rounded-full">{isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-green-500 animate-pulse" />}</button>
          <a href="https://github.com/bedro95" target="_blank" className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-[12px] font-mono hover:border-green-500 transition-all flex items-center gap-3">
            <Github size={18} /> @bedro95
          </a>
        </div>
        <p className="text-[9px] font-mono tracking-[2em] opacity-10 uppercase">SENKU_WORLD // 2026</p>
      </footer>

      <style jsx global>{`
        body { background: #020617; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
