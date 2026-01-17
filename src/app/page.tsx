"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Shield, Radar, Search, Trophy, 
  Zap, BarChart3, FlaskConical, Map, Activity 
} from "lucide-react";

// ✅ CLEAN IMPORTS (Removed Missing Terminal) [cite: 2026-01-10]
import RoadmapTab from "../../components/Tabs/RoadmapTab";
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-[#00FF5F]" },
  { id: "rug shield", label: "Security", icon: Shield, color: "text-[#00E0FF]" },
  { id: "radar", label: "Radar", icon: Radar, color: "text-[#00FF5F]" },
  { id: "roadmap", label: "Roadmap", icon: Map, color: "text-[#fbbf24]" }, 
  { id: "hall of fame", label: "Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  
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
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FF5F]/30 overflow-x-hidden font-sans">
      
      {/* 🌌 NEURAL BACKDROP */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#001a0a_0%,#000_100%)] opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-32 md:pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-[#00FF5F]/10 rounded-[35px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col">
          
          {/* 🧪 HEADER */}
          <div className="w-full px-5 md:px-10 py-6 md:py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-[#00FF5F]/[0.02] to-transparent">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative w-11 h-11 md:w-14 md:h-14 bg-black border border-[#00FF5F]/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-black text-[#00FF5F] drop-shadow-[0_0_10px_rgba(0,255,95,0.8)]">S</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
                  SENKU<span className="text-[#00FF5F] animate-pulse">.PROTOCOL</span>
                </h1>
                <div className="flex items-center gap-2">
                   <Activity className="w-2 h-2 text-[#00FF5F] animate-bounce" />
                   <span className="text-[7px] md:text-[8px] font-mono tracking-[0.4em] text-[#00FF5F]/60 uppercase">Neural Engine Active</span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-4">
               <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://github.com/bedro95"
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-[#00FF5F] transition-all text-white"
               >
                <Github className="w-5 h-5" />
               </motion.a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[75vh]">
            
            {/* 🛡️ NAVIGATION */}
            <nav className="fixed bottom-6 left-6 right-6 md:relative md:w-32 border md:border-r border-white/10 flex md:flex-col items-center justify-around md:justify-center gap-1 md:gap-5 p-3 md:p-6 bg-black/90 md:bg-transparent backdrop-blur-3xl rounded-[28px] md:rounded-none z-[200]">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-3.5 md:p-5 rounded-2xl md:rounded-[22px] transition-all duration-500 group ${isActive ? "bg-[#00FF5F]/10 border border-[#00FF5F]/20" : "opacity-30 hover:opacity-100"}`}
                  >
                    <Icon className={`w-5 h-5 md:w-7 md:h-7 ${isActive ? tab.color : "text-white"}`} />
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute -bottom-1 md:-right-[33px] md:top-1/2 md:-translate-y-1/2 w-6 h-[3px] md:w-1 md:h-12 bg-[#00FF5F] rounded-full shadow-[0_0_15px_#00FF5F]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ⚡ CONTENT */}
            <main className="flex-1 relative p-4 md:p-12 pb-56 md:pb-12 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* 📡 FOOTER */}
          <footer className="hidden md:flex w-full px-10 py-5 justify-between items-center bg-black/60 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/20 uppercase italic">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#00FF5F]"><div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F] animate-ping" /> Connection_Secure</span>
              <span className="text-white/40">Operator: Bader Alkorgli</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-[#fbbf24]" />
              Senku Lab v2.5.0-ALPHA
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
