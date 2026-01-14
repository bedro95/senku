"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Zap, BarChart3, FlaskConical, Map } from "lucide-react";

// Components
import Terminal from '/components/Terminal';
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
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FF5F]/30 overflow-x-hidden">
      
      {/* 🌌 DYNAMIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#001a0a_0%,#000_100%)] opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-32 md:pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-white/5 rounded-[35px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col">
          
          {/* 🧪 HEADER WITH FLASHING NEON LOGO */}
          <div className="w-full px-5 md:px-10 py-6 md:py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF5F] to-[#00E0FF] rounded-xl md:rounded-2xl blur-md opacity-40 animate-pulse group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative w-11 h-11 md:w-14 md:h-14 bg-black border border-[#00FF5F]/30 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_15px_rgba(0,255,95,0.4)] transition-all duration-500">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00FF5F] shadow-[0_0_10px_#00FF5F] animate-[shimmer_2s_infinite]" />
                  <span className="text-2xl md:text-3xl font-black text-[#00FF5F] drop-shadow-[0_0_10px_rgba(0,255,95,0.8)]">S</span>
                  <FlaskConical className="absolute bottom-1 right-1 w-3 h-3 text-[#00E0FF] opacity-50" />
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
                  SENKU<span className="text-[#00FF5F] animate-pulse">.FUN</span>
                </h1>
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-[#00FF5F] shadow-[0_0_5px_#00FF5F]" />
                   <span className="text-[7px] md:text-[8px] font-mono tracking-[0.4em] text-white/30 uppercase">Neural interface loaded</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4">
               <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                  <BarChart3 className="w-3 h-3 text-[#00FF5F]" />
                  <span className="text-[9px] font-black text-white/60 tracking-widest uppercase">Nodes_Online</span>
               </div>
               <motion.a 
                whileHover={{ scale: 1.05 }}
                href="https://github.com/bedro95"
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:text-[#00FF5F] transition-colors"
               >
                <Github className="w-5 h-5" />
               </motion.a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[75vh]">
            
            {/* NAVIGATION (Mobile Floating Nav Optimized) */}
            <nav className="fixed bottom-6 left-6 right-6 md:relative md:bottom-auto md:left-auto md:right-auto md:w-32 border md:border-r border-white/10 md:border-white/5 flex md:flex-col items-center justify-around md:justify-center gap-1 md:gap-5 p-3 md:p-6 bg-black/95 md:bg-black/40 backdrop-blur-3xl rounded-[28px] md:rounded-none z-[200] shadow-2xl">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-3.5 md:p-5 rounded-2xl md:rounded-[22px] transition-all duration-300 ${isActive ? "bg-white/10 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "opacity-20 hover:opacity-100"}`}
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

            {/* MAIN CONTENT AREA - Padding bottom adjusted for mobile agent safety */}
            <main className="flex-1 relative p-4 md:p-12 pb-56 md:pb-12 overflow-y-auto overflow-x-hidden scroll-smooth">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* FOOTER */}
          <footer className="hidden md:flex w-full px-10 py-5 justify-between items-center bg-black/60 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/20 uppercase">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 italic"><div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F]" /> Session_Active</span>
              <span>Integrity: 100%</span>
            </div>
            <div className="flex items-center gap-2 italic">
              <Zap className="w-3 h-3 text-[#fbbf24]" />
              Senku Lab v2.5.0
            </div>
          </footer>
        </div>
      </div>

      {/* 🚀 SENKU AGENT - NON-INVASIVE SMART POSITIONING */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 0.7 }}
        whileHover={{ opacity: 1, scale: 0.9 }}
        className="fixed bottom-28 right-2 md:bottom-10 md:right-10 z-[50] pointer-events-auto origin-bottom-right transition-all duration-700 ease-in-out"
      >
        <div className="relative group cursor-help">
          {/* Subtle Glow behind Agent */}
          <div className="absolute inset-0 bg-[#00FF5F]/10 blur-3xl rounded-full scale-150 group-hover:bg-[#00FF5F]/20 transition-all" />
          <SenkuAgent activeTab={activeTab} />
        </div>
      </motion.div>
    </div>
  );
}
