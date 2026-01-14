"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Zap, BarChart3, FlaskConical, LayoutGrid } from "lucide-react";

// Components
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
  { id: "bags", label: "Bags Tool", icon: LayoutGrid, color: "text-[#22C55E]" },
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
      case "bags": return (
        <div className="p-6 md:p-8 text-center border border-[#22C55E]/20 bg-[#22C55E]/5 rounded-3xl backdrop-blur-xl mx-2">
          <h2 className="text-[#22C55E] text-xl font-black mb-4 uppercase tracking-tighter">Bags Ecosystem</h2>
          <p className="text-white/60 text-[10px] md:text-sm leading-relaxed">Senku Neural Engine analyzing real-time social metrics for BagsApp users.</p>
          <div className="mt-6 py-2 px-4 bg-[#22C55E]/20 text-[#22C55E] rounded-full text-[8px] animate-pulse inline-block font-bold tracking-widest uppercase">
            Live_Sync_Active
          </div>
        </div>
      );
      case "hall of fame": return <HallOfFameTab />;
      default: return <ScanTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FF5F]/30 overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#001a0a_0%,#000_100%)] opacity-90" />
      </div>

      {/* Adjusted padding bottom to ensure content isn't hidden by nav */}
      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-32 md:pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-white/5 rounded-[30px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col">
          
          {/* HEADER */}
          <div className="w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF5F] to-[#00E0FF] rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-10 h-10 md:w-14 md:h-14 bg-black border border-[#00FF5F]/30 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden">
                  <span className="text-xl md:text-3xl font-black text-[#00FF5F]">S</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">
                  SENKU<span className="text-[#00FF5F]">.FUN</span>
                </h1>
                <span className="text-[7px] md:text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">Neural Interface</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
               <div className="px-3 py-1.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[7px] md:text-[9px] font-black text-[#22C55E] uppercase tracking-widest">Bags_Lab</span>
               </div>
               <motion.a whileHover={{ scale: 1.05 }} href="https://github.com/bedro95" className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-xl">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
               </motion.a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[75vh]">
            
            {/* NAVIGATION (FIXED ON MOBILE TO PREVENT OVERLAP) */}
            <nav className="fixed bottom-6 left-6 right-6 md:relative md:bottom-auto md:left-auto md:right-auto md:w-32 border md:border-r border-white/10 md:border-white/5 flex md:flex-col items-center justify-around md:justify-center gap-2 md:gap-5 p-4 md:p-6 bg-black/95 md:bg-black/40 backdrop-blur-3xl md:backdrop-blur-none rounded-[28px] md:rounded-none z-[200] shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-3 md:p-5 rounded-xl md:rounded-[22px] transition-all duration-300 ${isActive ? "bg-white/10 border border-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]" : "opacity-30 hover:opacity-100"}`}
                  >
                    <Icon className={`w-5 h-5 md:w-7 md:h-7 ${isActive ? tab.color : "text-white"}`} />
                    {isActive && (
                      <motion.div layoutId="navIndicator" className="absolute -bottom-1 md:-right-[33px] md:top-1/2 md:-translate-y-1/2 w-8 h-1 md:w-1 md:h-12 bg-[#00FF5F] rounded-full shadow-[0_0_15px_#00FF5F]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* MAIN CONTENT Area - with extra bottom padding for mobile */}
            <main className="flex-1 relative p-4 md:p-12 pb-40 md:pb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      {/* 🚀 SENKU AGENT - MOVED HIGHER AND SCALED DOWN ON MOBILE */}
      <div className="fixed bottom-36 right-6 md:bottom-10 md:right-10 z-[150] scale-[0.7] md:scale-100 origin-bottom-right transition-all duration-500">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
