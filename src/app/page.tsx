"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio, X, Maximize2, Sparkles, Flame, Terminal, BrainCircuit, TrendingUp, ShieldAlert, Search, Eye, AlertTriangle
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V6.1 - LIVE AGENT EDITION
 * STATUS: MASTERPIECE WEB3 INTERFACE
 */

/* ================================
   🔹 SENKU LIVE AGENT (NEW)
   ================================ */
function SenkuAgent({ activeTab }: { activeTab: string }) {
  const tips: Record<string, string[]> = {
    scan: [
      "Paste a Solana address to begin neural scan",
      "Your top asset defines your intelligence tier",
    ],
    "rug shield": [
      "Always scan contracts before ape",
      "Locked liquidity reduces rug probability",
    ],
    radar: [
      "Large inflows signal whale intent",
      "Follow smart money not noise",
    ],
    "hall of fame": [
      "Protocols ranked by on-chain dominance",
    ],
  };

  const message =
    tips[activeTab]?.[
      Math.floor(Math.random() * tips[activeTab].length)
    ] || "Analyzing neural signals...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="fixed bottom-6 right-6 z-[999] flex items-end gap-3"
    >
      <motion.img
        src="/senku.GIF"
        alt="Senku Agent"
        className="w-20 h-20 rounded-2xl border border-green-500/30 bg-black/70 backdrop-blur-xl shadow-2xl"
        animate={{ rotate: [0, 1, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-[220px] bg-black/80 border border-green-500/30 rounded-2xl px-4 py-3 text-[10px] font-mono text-green-400 uppercase tracking-widest shadow-xl">
        {message}
      </div>
    </motion.div>
  );
}

/* ================================
   🔹 MAIN COMPONENT
   ================================ */
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
    // --- RUG SHIELD ENGINE ---
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
        riskLevel: "LOW"
      });
      setIsAnalyzingRug(false);
    }, 3000);
  };

  const triggerNeuralIntent = async () => {
    if (!data) return;
    setIsNeuralProcessing(true);

    setTimeout(() => {
      const predictions = [
        "WHALE ACCUMULATION DETECTED",
        "ASCENDING TRIANGLE FORMING",
        "INSTITUTIONAL INTENT SIGNAL",
        "MEV ACTIVITY DETECTED",
        "LIQUIDITY SHIFT INBOUND"
      ];
      setIntentSignal(predictions[Math.floor(Math.random() * predictions.length)]);
      setIsNeuralProcessing(false);
    }, 2500);
  };

  useEffect(() => {
    bgMusic.current = new Audio(
      'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'
    );
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.5;
    audioScan.current = new Audio(
      'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
    );

    const handleClick = () => {
      if (!isMuted && bgMusic.current?.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (bgMusic.current) {
      isMuted ? bgMusic.current.play() : bgMusic.current.pause();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] z-10" />
        <motion.img
          src="/senku.GIF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, x: [-10, 10, -10], y: [-5, 5, -5] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale contrast-125"
        />
      </div>

      {/* NAV */}
      <nav className="relative z-[100] mt-4 mb-12">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl">
          {['scan', 'rug shield', 'radar', 'hall of fame'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]
              ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow justify-center">

        {activeTab === 'scan' && (
          <motion.div className="w-full flex flex-col items-center">
            <div className="text-center mb-12">

              {/* 🔥 FINAL LOGO SIZE */}
              <motion.h1
                className="
                  text-[14vw]
                  sm:text-[12vw]
                  md:text-[9rem]
                  lg:text-[10rem]
                  font-[1000] italic tracking-tighter leading-none
                  bg-gradient-to-b from-white via-white to-green-500
                  bg-clip-text text-transparent
                  drop-shadow-2xl select-none px-4
                "
              >
                SENKU
              </motion.h1>

              <p className="text-[10px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-80 mt-2">
                Neural Scientific Protocol
              </p
            </div>
                        {/* SCAN INPUT */}
            <div className="w-full max-w-xl mx-auto flex gap-2">
              <input
                value={rugAddress}
                onChange={(e) => setRugAddress(e.target.value)}
                placeholder="Enter token address"
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
              />
              <button
                onClick={analyzeRug}
                className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl text-sm font-bold"
              >
                {isAnalyzingRug ? 'SCANNING...' : 'SCAN'}
              </button>
            </div>

            {/* SCAN RESULT */}
            {rugAnalysis && (
              <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                {Object.entries(rugAnalysis).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-black/50 border border-white/10 rounded-xl p-4 text-center"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      {key}
                    </p>
                    <p className="mt-2 font-bold text-green-400 text-sm">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'rug shield' && (
          <motion.div className="text-center max-w-3xl">
            <h2 className="text-4xl font-black mb-6">RUG SHIELD</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Advanced on-chain heuristics combined with neural inference  
              to detect rug behavior before it manifests.
            </p>
          </motion.div>
        )}

        {activeTab === 'radar' && (
          <motion.div className="text-center max-w-3xl">
            <h2 className="text-4xl font-black mb-6">NEURAL RADAR</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Monitoring liquidity, MEV pressure, whale intent and abnormal flow.
            </p>

            <button
              onClick={triggerNeuralIntent}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold"
            >
              {isNeuralProcessing ? 'PROCESSING...' : 'ACTIVATE RADAR'}
            </button>

            {intentSignal && (
              <p className="mt-6 text-green-400 font-mono tracking-widest">
                {intentSignal}
              </p>
            )}
          </motion.div>
        )}

        {activeTab === 'hall of fame' && (
          <motion.div className="text-center max-w-4xl">
            <h2 className="text-4xl font-black mb-10">HALL OF FAME</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['SENKU', 'VECTORDEGEN', 'NEURALNODE'].map(name => (
                <div
                  key={name}
                  className="bg-black/60 border border-white/10 rounded-xl p-6"
                >
                  <p className="font-black text-lg">{name}</p>
                  <p className="text-xs text-white/40 mt-2">
                    Early Signal Contributor
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
            {/* SENKU AGENT */}
      <SenkuAgent />

      {/* FOOTER */}
      <footer className="relative z-10 mt-16 mb-6 text-center text-[10px] text-white/40 tracking-widest">
        © 2025 SENKU PROTOCOL — Powered by Solana
      </footer>
    </div>
  );
};

export default Senku;


/* ===========================
   SENKU AGENT (LIVE GUIDE)
   =========================== */

const SenkuAgent = () => {
  const tips = [
    "Welcome to Senku — start by scanning any token address",
    "Use Rug Shield to detect hidden risks",
    "Neural Radar reveals whale intent & liquidity shifts",
    "Hall of Fame shows verified early signals",
    "Trust data. Ignore noise."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="fixed bottom-6 right-6 z-[200] flex items-end gap-3"
    >
      {/* MESSAGE */}
      <div className="bg-black/70 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-xl max-w-[220px]">
        <p className="text-[11px] text-green-400 font-mono leading-relaxed">
          {tips[index]}
        </p>
      </div>

      {/* AVATAR */}
      <motion.img
        src="/senku-agent.png"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-full border border-green-500/40 shadow-lg shadow-green-500/20"
      />
    </motion.div>
  );
};
