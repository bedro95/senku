"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Zap, BarChart3 } from "lucide-react";

// Components
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

/**
 * @project Senku.fun
 * @engineering Focused on high-performance scrolling and rapid tab switching.
 * @description Removed all Wagmi references, specialized for Senku's identity.
 */

const TABS = [
  { id: "scan", label: "Bags Scanner", icon: Search, color: "text-[#00FF5F]" },
  { id: "rug shield", label: "Security", icon: Shield, color: "text-[#00E0FF]" },
  { id: "radar", label: "Deal Radar", icon: Radar, color: "text-[#00FF5F]" },
  { id: "hall of fame", label: "Top Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  
  useAudioController();

  // Optimizing Tab Content Rendering to prevent lag
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
    // FIX 1: Changed overflow-hidden to min-h-screen to allow natural scrolling
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FF5F]/30 overflow-x-hidden">
      
      {/* 🌌 DYNAMIC BACKGROUND INTERFACE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#001a0a_0%,#000_100%)] opacity-90" />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"
        />
      </div>

      {/* 🛰️ THE COMMAND CENTER - Re-engineered for scrolling */}
      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-10 pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-[#00FF5F]/10 rounded-[40px] backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col">
          
          {/* TOP STATUS BAR */}
          <div className="w-full px-8 py-6 flex justify-between items-center border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00FF5F]/10 border border-[#00FF5F]/20 rounded-xl">
                  <BarChart3 className="w-5 h-5 text-[#00FF5F]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black uppercase tracking-tighter text-white">
                    SENKU<span className="text-[#00FF5F]">.FUN</span>
                  </span>
                  <span className="text-[7px] font-mono tracking-[0.4em] text-white/40 uppercase">Scientific Alpha Terminal</span>
                </div>
              </div>
            </div>

            <motion.a 
              whileHover={{ scale: 1.02 }}
              href="https://github.com/bedro95"
              target="_blank"
              className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl"
            >
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">Operator: bedro95</span>
              <Github className="w-4 h-4 text-white" />
            </motion.a>
          </div>

          <div className="flex flex-col md:flex-row min-h-[70vh]">
            
            {/* SIDE NAVIGATION - Optimized for speed */}
            <nav className="w-full md:w-28 border-r border-white/5 flex md:flex-col items-center justify-center gap-4 p-6 bg-black/40">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-5 rounded-2xl transition-all duration-200 ${isActive ? "bg-[#00FF5F]/10 border border-[#00FF5F]/20 shadow-[0_0_30px_rgba(0,255,95,0.05)]" : "hover:bg-white/5 opacity-40 hover:opacity-100"}`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? tab.color : "text-white"}`} />
                    {isActive && (
                      <motion.div 
                        layoutId="navGlow" 
                        className="absolute inset-0 bg-[#00FF5F]/5 rounded-2xl"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* MAIN STAGE - FIX 2: Added flex-1 and removed internal overflow lock */}
            <main className="flex-1 relative p-6 md:p-10 bg-gradient-to-br from-black to-[#050505]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }} // Accelerated transition
                  className="w-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* ANALYTICS FOOTER */}
          <footer className="w-full px-8 py-4 flex justify-between items-center bg-black/60 border-t border-white/5 text-[9px] font-mono tracking-widest text-white/20 uppercase">
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F] animate-pulse" /> Network: Encrypted</span>
              <span className="text-[#00E0FF]">Protocol: 10 Billion% Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-[#00FF5F]" />
              Senku Final Engine v2.5
            </div>
          </footer>
        </div>
      </div>

      {/* AGENT LAYER */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
