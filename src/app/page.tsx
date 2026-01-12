"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Globe, Zap } from "lucide-react";

// Components
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

// ألوان سولانا الرسمية وتخصيصها للأيقونات
const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-[#14F195]" }, // Solana Green
  { id: "rug shield", label: "Shield", icon: Shield, color: "text-[#9945FF]" }, // Solana Purple
  { id: "radar", label: "Radar", icon: Radar, color: "text-[#19FBDB]" }, // Solana Cyan
  { id: "hall of fame", label: "Fame", icon: Trophy, color: "text-[#FFD700]" }, // Gold
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useAudioController();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-[#14F195]/30">
      
      {/* 🌌 SOLANA GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a192f_0%,#000_100%)] opacity-90" />
        
        {/* Solana Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#9945FF]/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#14F195]/10 blur-[150px] rounded-full" 
        />
      </div>

      {/* 🛰️ THE COMMAND CENTER */}
      <div className="relative z-10 w-full max-w-7xl h-[90vh] bg-black/40 border border-white/10 rounded-[40px] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
        
        {/* TOP STATUS BAR */}
        <div className="w-full px-10 py-6 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-lg">
                <Zap className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="text-[12px] font-black uppercase tracking-[0.4em] italic bg-clip-text text-transparent bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                Senku Protocol
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="hidden md:flex items-center gap-2 opacity-40">
              <Globe className="w-3 h-3 text-[#19FBDB]" />
              <span className="text-[9px] font-mono tracking-widest uppercase italic">Solana Mainnet: Operational</span>
            </div>
          </div>

          <motion.a 
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
            href="https://github.com/bedro95"
            target="_blank"
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full transition-all"
          >
            <span className="text-[10px] font-mono text-white/50 tracking-tighter">sys_auth: bedro95</span>
            <Github className="w-4 h-4 text-[#9945FF]" />
          </motion.a>
        </div>

        <div className="flex-grow flex flex-col md:flex-row">
          
          {/* SIDE NAVIGATION */}
          <nav className="w-full md:w-24 border-r border-white/5 flex md:flex-col items-center justify-center gap-8 p-4 bg-white/[0.01]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative p-4 rounded-2xl transition-all duration-500 group ${isActive ? "bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(153,69,255,0.1)]" : "hover:bg-white/5"}`}
                >
                  <Icon className={`w-6 h-6 transition-all duration-500 ${isActive ? tab.color : "text-white/20 group-hover:text-white/50"}`} />
                  {isActive && (
                    <motion.div 
                      layoutId="navLight" 
                      className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-[#14F195] to-[#9945FF] rounded-r-full shadow-[0_0_15px_#14F195]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* MAIN STAGE */}
          <main className="flex-grow relative flex items-center justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar bg-gradient-to-br from-transparent to-[#9945FF]/[0.02]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl"
              >
                {activeTab === "scan" && <ScanTab />}
                {activeTab === "rug shield" && <RugShieldTab />}
                {activeTab === "radar" && <RadarTab />}
                {activeTab === "hall of fame" && <HallOfFameTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* ANALYTICS FOOTER */}
        <footer className="w-full px-10 py-5 flex justify-between items-center bg-black/60 border-t border-white/5 text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase italic">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" /> TPS: 2,450</span>
            <span className="text-[#9945FF]">Design: bedro95</span>
          </div>
          <div>Project_Senku © 2026</div>
        </footer>
      </div>

      <div className="fixed bottom-10 right-10 z-[100] scale-110">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
