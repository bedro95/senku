"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Zap, BarChart3, FlaskConical } from "lucide-react";

// Components
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

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-6 pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-white/5 rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col">
          
          {/* 🧪 THE NEW NEON HEADER */}
          <div className="w-full px-10 py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent">
            <div className="flex items-center gap-6">
              <div className="relative group">
                {/* Laboratory S Logo */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF5F] to-[#00E0FF] rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-14 h-14 bg-black border border-[#00FF5F]/30 rounded-2xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_15px_rgba(0,255,95,0.2)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF5F]/40 animate-pulse" />
                  <span className="text-3xl font-black text-[#00FF5F] drop-shadow-[0_0_10px_rgba(0,255,95,0.5)]">S</span>
                  <FlaskConical className="absolute bottom-1 right-1 w-3 h-3 text-[#00E0FF] opacity-40" />
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-[-0.05em] text-white flex items-center">
                  SENKU
                  <span className="ml-1 text-[#00FF5F] drop-shadow-[0_0_15px_rgba(0,255,95,0.6)]">.FUN</span>
                </h1>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F] animate-ping" />
                   <span className="text-[8px] font-mono tracking-[0.5em] text-white/30 uppercase">Neural Lab Interface</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
               <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                  <BarChart3 className="w-3 h-3 text-[#00FF5F]" />
                  <span className="text-[9px] font-black text-white/60 tracking-widest uppercase">Nodes Online</span>
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

          <div className="flex flex-col md:flex-row min-h-[75vh]">
            
            {/* NAVIGATION */}
            <nav className="w-full md:w-32 border-r border-white/5 flex md:flex-col items-center justify-center gap-5 p-6 bg-black/40">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-5 rounded-[22px] transition-all duration-300 ${isActive ? "bg-[#00FF5F]/10 border border-[#00FF5F]/20" : "hover:bg-white/5 opacity-30 hover:opacity-100"}`}
                  >
                    <Icon className={`w-7 h-7 ${isActive ? tab.color : "text-white"}`} />
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute -right-[33px] top-1/2 -translate-y-1/2 w-1 h-12 bg-[#00FF5F] rounded-l-full shadow-[0_0_20px_#00FF5F] hidden md:block"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 relative p-6 md:p-12 overflow-y-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

                {/* FOOTER - Updated with GitHub Link */}
          <footer className="w-full px-10 py-5 flex justify-between items-center bg-black/60 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/20 uppercase">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 italic">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F]" /> 
                Session_Active
              </span>
              <span className="hidden md:inline">Integrity: 100% Secure</span>
            </div>

            <div className="flex items-center gap-6">
              {/* GitHub Profile Link */}
              <motion.a 
                whileHover={{ scale: 1.1, color: "#00FF5F" }}
                href="https://github.com/bedro95"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors duration-300 group"
              >
                <Github className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_#00FF5F]" />
                <span className="hidden sm:inline">bedro95</span>
              </motion.a>

              <div className="h-3 w-[1px] bg-white/10" />

              <div className="flex items-center gap-2 text-white/40">
                <Zap className="w-3 h-3 text-[#00FF5F]" />
                Senku Lab v2.5.0
              </div>
            </div>
          </footer>
