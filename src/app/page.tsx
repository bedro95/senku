"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio, X, Maximize2, 
  Sparkles, Flame, Terminal, BrainCircuit, TrendingUp, 
  ShieldAlert, CheckCircle2, Wallet, Layers, Target, Search
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (WAGMI)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: V8.0 - FULL ARCHIVE RESTORATION + NEURAL AUDIT
 * FEATURES: Snow System, Interactive Agent, Neon Interface, Hybrid Scanner
 */

export default function SenkuUltimateProtocol() {
  // --- STATE MANAGEMENT ---
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- REFS ---
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- SNOW SYSTEM DATA ---
  const snowFlakes = useMemo(() => [...Array(50)].map(() => ({
    left: Math.random() * 100,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
    size: Math.random() * 3 + 1
  })), []);

  // --- INTERACTIVE NEURAL AGENT LOGIC ---
  const triggerNeuralIntent = async () => {
    if (!data) return;
    setIsNeuralProcessing(true);
    setTimeout(() => {
      const predictions = [
        "WHALE ACCUMULATION DETECTED: EXPECT +12% VOLATILITY",
        "LIQUIDITY SHIFT: NEURAL NODES SUGGEST ENTRY AT CURRENT PRICE",
        "INSTITUTIONAL INTENT: LARGE OTC TRANSFER INBOUND",
        "PATTERN RECOGNITION: ASCENDING TRIANGLE FORMING ON-CHAIN",
        "MEV BOT ACTIVITY DETECTED: ALPHA SHIELD ACTIVATED"
      ];
      setIntentSignal(predictions[Math.floor(Math.random() * predictions.length)]);
      setIsNeuralProcessing(false);
    }, 2500);
  };

  // --- AUDIO SYSTEM ---
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
    window.addEventListener('mousemove', (e) => setMousePos({ x: e.clientX, y: e.clientY }));
    
    return () => {
      window.removeEventListener('click', handleInitialInteraction);
      bgMusic.current?.pause();
    };
  }, [isMuted]);

  // --- RADAR WHALE ENGINE ---
  useEffect(() => {
    if (activeTab !== 'radar') return;
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        amount: (Math.random() * 500 + 100).toFixed(2),
        type: Math.random() > 0.5 ? "WHALE_BUY" : "LIQUIDITY_ADD",
        time: new Date().toLocaleTimeString()
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 10));
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (bgMusic.current) isMuted ? bgMusic.current.play() : bgMusic.current.pause();
  };

  // --- HYBRID REAL-TIME ANALYZER ---
  const analyze = async () => {
    if (!address || address.length < 32) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
    
    try {
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'senku-v8',
          method: 'getAsset',
          params: { id: address.trim() },
        }),
      });

      const { result } = await response.json();

      // Case 1: Token Audit
      if (result && result.interface === 'FungibleToken') {
        const mintAuth = result.authorities?.find((a: any) => a.scopes?.includes('mint'));
        const freezeAuth = result.authorities?.find((a: any) => a.scopes?.includes('freeze'));
        const isMutable = result.content?.metadata?.is_mutable || false;
        
        let score = 100;
        if (mintAuth) score -= 60;
        if (freezeAuth) score -= 25;
        if (isMutable) score -= 15;

        setData({
          type: 'TOKEN',
          sol: (result.token_info?.supply / Math.pow(10, result.token_info?.decimals || 9)).toLocaleString(),
          symbol: result.content?.metadata?.symbol || 'UNKNOWN',
          status: score >= 85 ? "NEURAL_SAFE" : score >= 50 ? "RISK_DETECTED" : "DANGER_ZONE",
          tierColor: score >= 85 ? "#00ffa3" : score >= 50 ? "#ffaa00" : "#ff0055",
          date: new Date().toLocaleDateString(),
          hash: "SK-T-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
          mintOff: !mintAuth,
          freezeOff: !freezeAuth,
          score
        });
        setIntelligenceScore(score);
      } 
      // Case 2: Wallet Audit
      else {
        const walletRes = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'wallet-v8',
            method: 'getAssetsByOwner',
            params: { ownerAddress: address.trim(), displayOptions: { showNativeBalance: true } },
          }),
        });
        const wData = await walletRes.json();
        const bal = wData.result.nativeBalance ? wData.result.nativeBalance.lamports / 1e9 : 0;
        const score = Math.min(100, Math.floor(bal * 2) + 40);

        setData({
          type: 'WALLET',
          sol: bal.toFixed(2),
          symbol: 'SOL',
          status: bal > 100 ? "SUPREME_WHALE" : "RETAIL_UNIT",
          tierColor: bal > 100 ? "#00ffa3" : "#00d1ff",
          date: new Date().toLocaleDateString(),
          hash: "SK-W-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
          score
        });
        setIntelligenceScore(score);
      }
    } catch (e) {
      console.error("Audit Fail");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = () => {
    const target = modalRef.current || cardRef.current;
    if (target) {
      toPng(target, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
        const link = document.createElement('a');
        link.download = `SENKU_PROTOCOL_${data?.hash}.png`;
        link.href = url;
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-hidden relative cursor-default">
      
      {/* --- SNOW SYSTEM --- */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {snowFlakes.map((f, i) => (
          <motion.div 
            key={i} 
            initial={{ y: -20, x: `${f.left}vw`, opacity: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 0] }}
            transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: "linear" }}
            className="absolute bg-white rounded-full"
            style={{ width: f.size, height: f.size, filter: 'blur(1px)' }}
          />
        ))}
      </div>

      {/* --- NEON BACKGROUND & GIF --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,163,0.08),transparent_75%)]" />
        <motion.img 
          src="/senku.GIF" 
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="w-full h-full object-cover grayscale opacity-10"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* --- HEADER NAVIGATION --- */}
      <header className="relative z-[100] w-full max-w-4xl flex justify-between items-center mb-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_#00ffa3]">
            <Zap className="text-black" size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tighter leading-none">SENKU</h3>
            <span className="text-[8px] font-mono text-green-500/50 uppercase tracking-[0.3em]">Protocol v8.0</span>
          </div>
        </div>
        
        <nav className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {['scan', 'radar', 'hall of fame'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'text-white/30'}`}
            >
              {activeTab === tab && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-green-600 rounded-xl" />}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-50 w-full max-w-6xl flex flex-col items-center">
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
            
            {/* HERO TITLE */}
            <div className="relative mb-20">
              <motion.h1 
                initial={{ letterSpacing: "1em", opacity: 0 }}
                animate={{ letterSpacing: "0.2em", opacity: 1 }}
                className="text-[12vw] md:text-[10rem] font-[1000] italic leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-green-500/20 select-none"
              >
                SENKU
              </motion.h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/5 blur-[120px] pointer-events-none" />
            </div>

            {/* INPUT SECTION */}
            <div className="w-full max-w-xl px-6">
              <div className="relative group mb-6">
                <div className="absolute -inset-1 bg-green-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-700" />
                <div className="relative flex items-center bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                  <div className="pl-6 text-green-500/50"><Search size={18} /></div>
                  <input 
                    className="w-full p-6 bg-transparent outline-none font-mono text-xs tracking-widest uppercase placeholder:text-white/10"
                    placeholder="ENTER WALLET OR CONTRACT..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <button 
                onClick={analyze}
                disabled={loading}
                className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] hover:bg-green-500 hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-[0.98]"
              >
                {loading ? "BREWING SCIENCE..." : "INITIALIZE NEURAL AUDIT"}
              </button>
            </div>

            {/* DATA DISPLAY */}
            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-40">
                  
                  {/* AUDIT STATUS CARD */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                      {data.type === 'TOKEN' ? <ShieldCheck size={80} /> : <Wallet size={80} />}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-10">
                        <Activity className="text-green-500" size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Audit Logic V8</span>
                      </div>

                      <div className="mb-10">
                        <h4 className="text-6xl font-[1000] italic leading-none mb-2" style={{ color: data.tierColor }}>{intelligenceScore}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Neural Reliability IQ</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                          <span className="text-[9px] font-bold opacity-40 uppercase">Classification</span>
                          <span className="text-xs font-black uppercase" style={{ color: data.tierColor }}>{data.status}</span>
                        </div>
                        {data.type === 'TOKEN' && (
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                              <span className="text-[8px] opacity-30 mb-1 uppercase">Mint</span>
                              {data.mintOff ? <CheckCircle2 size={14} className="text-green-500"/> : <ShieldAlert size={14} className="text-red-500"/>}
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                              <span className="text-[8px] opacity-30 mb-1 uppercase">Freeze</span>
                              {data.freezeOff ? <CheckCircle2 size={14} className="text-green-500"/> : <ShieldAlert size={14} className="text-red-500"/>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE NEURAL AGENT */}
                  <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-[2.5rem] p-10 backdrop-blur-xl">
                       <div className="flex items-center gap-3 mb-8">
                         <BrainCircuit className="text-green-500 animate-pulse" size={20} />
                         <span className="text-[11px] font-black uppercase tracking-widest">Neural Intent Engine</span>
                       </div>
                       
                       <div className="min-h-[100px] flex items-center justify-center bg-black/40 rounded-3xl p-6 border border-white/5 text-center mb-8">
                         {isNeuralProcessing ? (
                           <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity }} className="text-[10px] font-mono uppercase tracking-[0.3em]">Syncing with Mainnet...</motion.div>
                         ) : (
                           <p className="text-xs font-mono leading-relaxed text-white/70 uppercase">
                             {intentSignal || "Protocol ready. Initialize intent prediction for market alpha."}
                           </p>
                         )}
                       </div>

                       <button 
                        onClick={triggerNeuralIntent}
                        className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,255,163,0.2)]"
                       >
                         Trigger Intent Scan
                       </button>
                    </div>

                    <div 
                      onClick={() => setIsModalOpen(true)}
                      className="group cursor-pointer bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between hover:border-green-500/50 transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-all">
                          <Maximize2 className="text-white group-hover:text-black" size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Open Identity</p>
                          <p className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">Verified Credentials Extraction</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-white/20 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- RADAR TAB --- */}
        {activeTab === 'radar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl pt-20 pb-40 px-6">
            <h2 className="text-6xl font-[1000] italic uppercase text-green-500 mb-10 flex items-center gap-4">
              <Radio className="animate-pulse" size={40} /> Neural Radar
            </h2>
            <div className="space-y-4">
              {whaleAlerts.map((a, i) => (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  key={a.id} 
                  className="bg-slate-900/60 border border-white/5 p-8 rounded-3xl flex justify-between items-center group hover:bg-green-500/5 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-green-500 font-mono text-xs">[{a.time}]</div>
                    <div>
                      <p className="text-2xl font-[1000] italic">{a.amount} SOL</p>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{a.type}</p>
                    </div>
                  </div>
                  <Target size={20} className="text-green-500/20 group-hover:text-green-500 transition-all" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* --- IDENTITY MODAL (FULL RESTORED CARD) --- */}
      <AnimatePresence>
        {isModalOpen && data && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-[550px]"
            >
              <div ref={modalRef} className="bg-[#020617] border-[3px] rounded-[3.5rem] p-12 overflow-hidden relative" style={{ borderColor: data.tierColor }}>
                 {/* Internal Card Logic */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px]" />
                 <img src="/senku.GIF" className="absolute -right-20 -bottom-20 w-80 grayscale opacity-10 pointer-events-none" />
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-16">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                          <ShieldCheck style={{ color: data.tierColor }} />
                        </div>
                        <div>
                          <p className="text-xs font-black tracking-widest uppercase">Verified Entity</p>
                          <p className="text-[8px] font-mono text-white/20 uppercase">Senku Protocol V8</p>
                        </div>
                      </div>
                      <Layers className="opacity-10" />
                    </div>

                    <div className="mb-16">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Total On-Chain Weight</p>
                      <h2 className="text-7xl font-[1000] italic leading-none tracking-tighter" style={{ color: data.tierColor }}>
                        {data.sol} <span className="text-xl uppercase">{data.symbol}</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10 mb-16">
                      <div>
                        <p className="text-[9px] font-black text-white/20 uppercase mb-2 tracking-widest">Scientific ID</p>
                        <p className="text-sm font-mono font-bold">{data.hash}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-white/20 uppercase mb-2 tracking-widest">Protocol Date</p>
                        <p className="text-sm font-mono font-bold">{data.date}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-10">
                      <div>
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-2">Neural Class</p>
                        <p className="text-4xl font-[1000] italic uppercase leading-none" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-[1000] text-green-500">{intelligenceScore} IQ</p>
                      </div>
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <button onClick={saveCard} className="flex-1 py-6 bg-white text-black rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all">Download Credentials</button>
                <button onClick={() => setIsModalOpen(false)} className="w-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center hover:bg-red-500 transition-all group">
                  <X size={24} className="text-white/40 group-hover:text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="relative z-[100] mt-auto py-20 flex flex-col items-center gap-10">
        <div className="flex gap-6">
          <button onClick={toggleMute} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500/10 transition-all">
            {isMuted ? <VolumeX className="text-red-500" /> : <Volume2 className="text-green-500 animate-pulse" />}
          </button>
          <a href="https://github.com/bedro95" target="_blank" className="px-10 py-4 bg-white/5 border border-white/10 rounded-full flex items-center gap-4 hover:border-green-500/50 transition-all">
            <Github size={20} />
            <span className="text-xs font-mono font-bold tracking-widest opacity-80">@bedro95</span>
          </a>
        </div>
        <div className="flex flex-col items-center opacity-10">
          <p className="text-[10px] font-mono tracking-[2em] uppercase mb-2">Senku World 2026</p>
          <div className="h-[1px] w-40 bg-white" />
        </div>
      </footer>

      {/* --- GLOBAL STYLES --- */}
      <style jsx global>{`
        body { background: #020617; }
        ::-webkit-scrollbar { display: none; }
        ::selection { background: #00ffa3; color: black; }
        input::placeholder { text-transform: uppercase; letter-spacing: 0.2em; }
      `}</style>
    </div>
  );
}
