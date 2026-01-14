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
  { id: "bags", label: "Bags Tool", icon: LayoutGrid, color: "text-[#22C55E]" }, // Bags Green Color
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
      case "bags": return <div className="p-8 text-center border border-[#22C55E]/20 bg-[#22C55E]/5 rounded-3xl backdrop-blur-xl">
          <h2 className="text-[#22C55E] text-2xl font-black mb-4">BAGS INSIGHTS</h2>
          <p className="text-white/60">Senku Neural Engine analyzing BagsApp social metrics...</p>
          <div className="mt-8 py-2 px-4 bg-[#22C55E]/20 text-[#22C55E] rounded-full text-[10px] animate-pulse inline-block">SCANNING ECOSYSTEM</div>
      </div>;
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

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-24 md:pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-white/5 rounded-[30px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col">
          
          {/* 🧪 HEADER */}
          <div className="w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF5F] to-[#00E0FF] rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-10 h-10 md:w-14 md:h-14 bg-black border border-[#00FF5F]/30 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden">
                  <span className="text-xl md:text-3xl font-black text-[#00FF5F]">S</span>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-lg md:text-2xl font-black text-white">
                  SENKU<span className="text-[#00FF5F]">.FUN</span>
                </h1>
                <span className="text-[7px] md:text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">Neural Interface</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
               {/* Mobile/Desktop Bags Indicator */}
               <div className="px-3 py-1.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[7px] md:text-[9px] font-black text-[#22C55E] uppercase tracking-widest">Bags_Module</span>
               </div>
               <motion.a whileHover={{ scale: 1.05 }} href="https://github.com/bedro95" className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-xl">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
               </motion.a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[75vh]">
            
            {/* NAVIGATION (Updated for Mobile & Desktop) */}
            <nav className="fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto md:w-32 border md:border-r border-white/10 md:border-white/5 flex md:flex-col items-center justify-around md:justify-center gap-2 md:gap-5 p-3 md:p-6 bg-black/80 md:bg-black/40 backdrop-blur-2xl md:backdrop-blur-none rounded-2xl md:rounded-none z-[100]">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-3 md:p-5 rounded-xl md:rounded-[22px] transition-all duration-300 ${isActive ? "bg-white/10 border border-white/20" : "opacity-30 hover:opacity-100"}`}
                  >
                    <Icon className={`w-5 h-5 md:w-7 md:h-7 ${isActive ? tab.color : "text-white"}`} />
                    {isActive && (
                      <motion.div layoutId="navIndicator" className="absolute -bottom-1 md:-right-[33px] md:top-1/2 md:-translate-y-1/2 w-8 h-1 md:w-1 md:h-12 bg-[#00FF5F] rounded-full shadow-[0_0_15px_#00FF5F]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* MAIN CONTENT */}
            <main className="flex-1 relative p-4 md:p-12">
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

          {/* FOOTER */}
          <footer className="hidden md:flex w-full px-10 py-5 justify-between items-center bg-black/60 border-t border-white/5 text-[10px] font-mono text-white/20">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00FF5F]" /> Senku_Engine_v2</span>
              <span className="text-[#22C55E]">Bags_Analytics_Active</span>
            </div>
            <span>© 2026 Senku Lab</span>
          </footer>
        </div>
      </div>

      <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[90]">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
