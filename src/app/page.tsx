"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Shield, Radar, Search, Trophy, 
  Map, Activity, Flame, Menu, X
} from "lucide-react";

import RoadmapTab from "../../components/Tabs/RoadmapTab";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";
import { useCryptoData } from "../../hooks/useCryptoData";

import DNAHelixBackground from "../../components/Visuals/DNAHelix";
import DigitalDust from "../../components/Visuals/DigitalDust";
import WhaleRadar from "../../components/Modules/WhaleRadar";
import { usePriceEngine } from "../../hooks/usePriceEngine";

const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-[#00FFCC]" },
  { id: "security", label: "Security", icon: Shield, color: "text-[#00E0FF]" },
  { id: "radar", label: "Radar", icon: Radar, color: "text-[#00FFCC]" },
  { id: "roadmap", label: "Roadmap", icon: Map, color: "text-[#fbbf24]" }, 
  { id: "alpha", label: "Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  const [hasEntered, setHasEntered] = useState(false);
  const [solMetrics, setSolMetrics] = useState<any>(null);
  const prices = usePriceEngine();
  
  useAudioController();

  useEffect(() => {
    const fetchMetrics = async () => {
      const metrics = await getSolanaMetrics();
      if (metrics) setSolMetrics(metrics);
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "scan": return <ScanTab />;
      case "security": return <RugShieldTab />;
      case "radar": return <RadarTab />;
      case "roadmap": return <RoadmapTab />; 
      case "alpha": return <HallOfFameTab />;
      default: return <ScanTab />;
    }
  }, [activeTab]);

  return (
    <>
      <AnimatePresence>
        {!hasEntered && <BlackHoleGateway onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FFCC]/30 overflow-x-hidden font-sans">
        
        <DNAHelixBackground />
        <DigitalDust />
        <HologramAvatar />

        {/* 🛸 MOBILE FLOATING DOCK */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] md:hidden">
          <div className="glass-morphism px-6 py-3 rounded-full border border-white/20 flex items-center gap-6 shadow-[0_0_50px_rgba(0,255,204,0.2)]">
            <h2 className="text-xl font-black italic tracking-tighter text-white">Senku</h2>
            <div className="w-px h-6 bg-white/20" />
            <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="p-2 bg-black rounded-full border border-[#00FFCC]/30">
              <Github className="w-5 h-5 text-[#00FFCC]" />
            </a>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] min-h-screen flex flex-col pt-4 md:pt-6 pb-24 md:pb-10 px-4">
          
          {/* 📊 SOLANA LIVE METRICS */}
          <div className="w-full flex justify-between px-6 py-3 mb-6 glass-morphism rounded-full text-[10px] font-mono tracking-tighter uppercase text-white gap-6 border border-[#00FFCC]/20 shadow-[0_0_30px_rgba(0,255,204,0.1)] overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-pulse" />
              SOL_TPS: <span className="text-[#00FFCC] font-bold">{solMetrics?.tps || '---'}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              EPOCH: <span className="text-[#00E0FF] font-bold">{solMetrics?.epoch || '---'}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              SOL: <span className="text-[#00FFCC] font-bold">${prices.sol.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              JUP: <span className="text-[#00E0FF] font-bold">${prices.jup.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              RAY: <span className="text-[#00FFCC] font-bold">${prices.ray.toFixed(2)}</span>
            </div>
          </div>

          <div className="w-full bg-black/60 border border-white/10 rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_150px_rgba(0,255,204,0.05)] flex flex-col">
            
            <div className="w-full px-5 md:px-10 py-10 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-[#00FFCC]/[0.05] to-transparent">
              <div className="flex flex-col">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-[0_0_15px_rgba(0,255,204,0.5)]">
                  Senku
                </h1>
                <div className="flex items-center gap-3 mt-4">
                   <div className="w-2 h-2 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC]" />
                   <span className="text-[12px] font-mono tracking-[0.6em] text-[#00FFCC] uppercase font-bold">Protocol Terminal</span>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                 <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="https://github.com/bedro95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-5 bg-black border border-[#00FFCC]/30 rounded-full shadow-[0_0_30px_rgba(0,255,204,0.3)] group"
                 >
                  <Github className="w-8 h-8 text-[#00FFCC]" />
                  <div className="absolute inset-0 rounded-full bg-[#00FFCC] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                 </motion.a>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row min-h-[80vh]">
              
              {/* 🛡️ NAVIGATION */}
              <nav className="hidden md:flex md:w-32 border-r border-white/10 flex-col items-center justify-center gap-12 p-8 bg-black/40">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`p-5 rounded-[2rem] transition-all duration-500 ${isActive ? "bg-[#00FFCC]/10 border border-[#00FFCC]/30 shadow-[0_0_30px_rgba(0,255,204,0.1)]" : "opacity-20 group-hover:opacity-100"}`}
                      >
                        <Icon className={`w-8 h-8 ${isActive ? "text-[#00FFCC]" : "text-white"}`} />
                      </motion.div>
                      {isActive && (
                        <motion.div 
                          layoutId="navIndicator" 
                          className="absolute -right-[40px] top-1/2 -translate-y-1/2 w-2 h-20 bg-[#00FFCC] rounded-full shadow-[0_0_40px_#00FFCC]"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="flex-1 flex flex-col lg:flex-row">
                {/* 📊 MAIN CONTENT */}
                <main className="flex-1 relative p-6 md:p-12 overflow-y-auto custom-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.02, filter: "blur(20px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full"
                    >
                      {renderTabContent}
                    </motion.div>
                  </AnimatePresence>
                </main>

                {/* 🚀 SIDEBARS */}
                <aside className="w-full lg:w-[450px] p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col gap-10 bg-black/[0.02]">
                  <WhaleRadar />
                  <QuantumScanner />
                  <IntelligenceTerminal />
                </aside>
              </div>
            </div>

            <footer className="hidden lg:flex w-full px-10 py-6 justify-between items-center bg-black/80 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/30 uppercase italic">
              <div className="flex items-center gap-10">
                <span className="flex items-center gap-3 text-[#00FFCC] font-bold">
                  <div className="w-2 h-2 rounded-full bg-[#00FFCC] animate-ping" /> 
                  Sync_Status: Optimal
                </span>
                <span className="text-white/50 border-l border-white/10 pl-10">Network: Solana_Mainnet</span>
                <span className="text-white/50 border-l border-white/10 pl-10">Uptime: 99.9997%</span>
              </div>
              <div className="flex items-center gap-3 text-[#00FFCC]/60">
                <Activity className="w-4 h-4" />
                Senku_OS v5.0.0
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

        </div>
      </div>
    </>
  );
}
