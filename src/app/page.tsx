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

const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-green-400" },
  { id: "rug shield", label: "Shield", icon: Shield, color: "text-blue-400" },
  { id: "radar", label: "Radar", icon: Radar, color: "text-emerald-400" },
  { id: "hall of fame", label: "Fame", icon: Trophy, color: "text-yellow-400" },
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useAudioController();

  // تتبع حركة الماوس لتأثير Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* 🌌 HYPER-MODERN BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a192f_0%,#000_100%)] opacity-80" />
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen"
        />
        {/* Animated Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[180px] rounded-full animate-pulse" />
      </div>

      {/* 🛰️ THE COMMAND CENTER (UI FRAME) */}
      <div className="relative z-10 w-full max-w-7xl h-[90vh] bg-white/[0.02] border border-white/10 rounded-[40px] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
        
        {/* TOP STATUS BAR */}
        <div className="w-full px-10 py-6 flex justify-between items-center border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500 fill-green-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] italic">Senku Protocol</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 opacity-40">
              <Globe className="w-3 h-3" />
              <span className="text-[9px] font-mono tracking-widest uppercase">Nodes: Active [Global]</span>
            </div>
          </div>

          {/* GITHUB INTEGRATION: bedro95 */}
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
            href="https://github.com/bedro95"
            target="_blank"
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full transition-all"
          >
            <span className="text-[10px] font-mono text-white/50 tracking-tighter italic">sys_auth: bedro95</span>
            <Github className="w-4 h-4 text-white" />
          </motion.a>
        </div>

        {/* MIDDLE CONTENT AREA */}
        <div className="flex-grow flex flex-col md:flex-row">
          
          {/* SIDE NAVIGATION (TESLA STYLE) */}
          <nav className="w-full md:w-24 border-r border-white/5 flex md:flex-col items-center justify-center gap-8 p-4 bg-black/10">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative p-4 rounded-2xl transition-all duration-500 group ${isActive ? "bg-white/5 border border-white/10" : "hover:bg-white/5"}`}
                >
                  <Icon className={`w-6 h-6 transition-all duration-500 ${isActive ? tab.color : "text-white/20 group-hover:text-white/50"}`} />
                  {isActive && (
                    <motion.div layoutId="navLight" className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full shadow-[0_0_15px_#22c55e]" />
                  )}
                  {/* Tooltip */}
                  <span className="absolute left-full ml-4 px-3 py-1 bg-white text-black text-[9px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* MAIN STAGE */}
          <main className="flex-grow relative flex items-center justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

        {/* SYSTEM ANALYTICS FOOTER */}
        <footer className="w-full px-10 py-4 flex justify-between items-center bg-black/40 border-t border-white/5 text-[8px] font-mono tracking-[0.3em] text-white/20">
          <div className="flex gap-8">
            <span>Uptime: 99.99%</span>
            <span>Latency: 14ms</span>
            <span className="text-green-500/40">Secure Connection: TLS 1.3</span>
          </div>
          <div className="italic">Project_Senku © 2026 — Terminal_Access</div>
        </footer>
      </div>

      {/* 🤖 FLOATING SENKU AGENT */}
      <div className="fixed bottom-10 right-10 z-[100] scale-110">
        <SenkuAgent activeTab={activeTab} />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}
