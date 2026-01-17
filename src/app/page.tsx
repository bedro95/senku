"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Shield, Radar, Search, Trophy, 
  Zap, BarChart3, FlaskConical, Map, Activity,
  Cpu, Globe, Flame
} from "lucide-react";

import RoadmapTab from "../../components/Tabs/RoadmapTab";
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";
import { useCryptoData } from "../../hooks/useCryptoData";

import DNAHelixBackground from "../../components/Visuals/DNAHelix";
import DigitalDust from "../../components/Visuals/DigitalDust";

const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-[#00FFCC]" },
  { id: "rug shield", label: "Security", icon: Shield, color: "text-[#00E0FF]" },
  { id: "radar", label: "Radar", icon: Radar, color: "text-[#00FFCC]" },
  { id: "roadmap", label: "Roadmap", icon: Map, color: "text-[#fbbf24]" }, 
  { id: "hall of fame", label: "Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  const { prices, gas } = useCryptoData();
  
  useAudioController();

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "scan": return <ScanTab />;
      case "rug shield": return <RugShieldTab />;
      case "radar": return <RadarTab />;
      case "roadmap": return <RoadmapTab />; 
      case "hall of fame": return <HallOfFameTab />;
      default: return <ScanTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FFCC]/30 overflow-x-hidden font-sans">
      
      <DNAHelixBackground />
      <DigitalDust />

      {/* SVG Filters for Liquid Effect */}
      <svg className="hidden">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-32 md:pb-20 px-4">
        
        {/* 📊 TRACKER */}
        <div className="w-full flex justify-between px-6 py-2 mb-4 glass-morphism rounded-full text-[10px] font-mono tracking-tighter uppercase text-white/60 overflow-x-auto whitespace-nowrap gap-6 border border-[#00FFCC]/20 shadow-[0_0_20px_rgba(0,255,204,0.1)]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#00FFCC] rounded-full animate-pulse shadow-[0_0_10px_#00FFCC]" />
            BTC: <span className="text-white">${prices.btc.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            ETH: <span className="text-white">${prices.eth.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            SOL: <span className="text-white">${prices.sol.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-3 h-3 text-orange-500" />
            GAS: <span className="text-white">{gas} Gwei</span>
          </div>
        </div>

        <div className="w-full bg-black/60 border border-white/10 rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_150px_rgba(0,255,204,0.05)] flex flex-col">
          
          {/* 🧪 LOGO ONLY "SENKU" */}
          <div className="w-full px-5 md:px-10 py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-[#00FFCC]/[0.05] to-transparent">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">
                  SENKU
                </h1>
                <div className="flex items-center gap-2 mt-2">
                   <div className="w-1 h-1 bg-[#00FFCC] rounded-full" />
                   <span className="text-[10px] font-mono tracking-[0.5em] text-[#00FFCC]/80 uppercase">Bioluminescent Terminal</span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-4">
               <motion.a 
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://github.com/bedro95"
                className="relative p-4 bg-black border border-[#00FFCC]/30 rounded-full shadow-[0_0_20px_rgba(0,255,204,0.2)] group"
               >
                <Github className="w-6 h-6 text-[#00FFCC]" />
                <div className="absolute inset-0 rounded-full bg-[#00FFCC] opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
               </motion.a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[75vh]">
            
            {/* 🛡️ ZEN NAVIGATION */}
            <nav className="fixed bottom-6 left-6 right-6 md:relative md:w-32 border md:border-r border-white/10 flex md:flex-col items-center justify-around md:justify-center gap-1 md:gap-10 p-4 md:p-8 bg-black/90 md:bg-transparent backdrop-blur-3xl rounded-[40px] md:rounded-none z-[200]">
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
                      whileHover={{ scale: 1.2, filter: "url(#liquid)" }}
                      className={`p-5 rounded-3xl transition-all duration-500 ${isActive ? "bg-[#00FFCC]/10 border border-[#00FFCC]/20" : "opacity-30 group-hover:opacity-100"}`}
                    >
                      <Icon className={`w-7 h-7 md:w-8 md:h-8 ${isActive ? "text-[#00FFCC]" : "text-white"}`} />
                    </motion.div>
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute -bottom-3 md:-right-[40px] md:top-1/2 md:-translate-y-1/2 w-10 h-[5px] md:w-2 md:h-20 bg-[#00FFCC] rounded-full shadow-[0_0_40px_#00FFCC]"
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <main className="flex-1 relative p-6 md:p-16 pb-64 md:pb-16 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


          {/* 📡 FOOTER */}
          <footer className="hidden md:flex w-full px-10 py-5 justify-between items-center bg-black/80 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/30 uppercase italic">
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-3 text-[#00FFCC]">
                <div className="w-2 h-2 rounded-full bg-[#00FFCC] animate-ping" /> 
                System_Status: Optimal
              </span>
              <span className="text-white/50 border-l border-white/10 pl-8">Latency: 24ms</span>
              <span className="text-white/50 border-l border-white/10 pl-8">Uptime: 99.99%</span>
            </div>
            <div className="flex items-center gap-3 text-[#00FFCC]/60">
              <Activity className="w-4 h-4" />
              Processing Engine v3.0.0-PRO
            </div>
          </footer>
        </div>
      </div>

      {/* 🚀 AGENT */}
      <div className="fixed bottom-28 right-4 md:bottom-10 md:right-10 z-[50]">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
