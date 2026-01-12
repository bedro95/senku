"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Activity } from "lucide-react";

// Components
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

const TABS = [
  { id: "scan", label: "Scanner", icon: Search },
  { id: "rug shield", label: "Shield", icon: Shield },
  { id: "radar", label: "Radar", icon: Radar },
  { id: "hall of fame", label: "Fame", icon: Trophy },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function SenkuPage() {
  const [activeTab, setActiveTab] = useState<Tab>("scan");
  const [mounted, setMounted] = useState(false);

  useAudioController();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#000205] text-white flex flex-col items-center overflow-hidden relative selection:bg-green-500/30">
      
      {/* 🌌 DEEP SPACE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a192f_0%,#000_100%)]" />
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        
        {/* Floating Light Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/5 blur-[150px] rounded-full" 
        />
      </div>

      {/* 🛰️ TOP NAVIGATION BAR (THE APPLE/TESLA FINISH) */}
      <header className="relative z-50 w-full max-w-[1400px] px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-green-500/20 rounded-full blur group-hover:bg-green-500/40 transition duration-500" />
            <div className="relative w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-green-500/50 rounded-full" />
               <span className="font-black text-xs">S</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic leading-none">Senku Protocol</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Mainnet v4.0.2</span>
            </div>
          </div>
        </div>

        {/* GitHub & Profile */}
        <div className="flex items-center space-x-6">
          <a 
            href="https://github.com/bedro95" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all"
          >
            <span className="text-[10px] font-mono text-white/40 group-hover:text-white transition-colors">bedro95</span>
            <Github className="w-4 h-4 text-white/60 group-hover:text-white group-hover:rotate-12 transition-all" />
          </a>
        </div>
      </header>

      {/* 🕹️ MAIN HUB CONTAINER */}
      <main className="relative z-10 w-full max-w-7xl flex-grow flex flex-col items-center justify-center px-4">
        
        {/* TAB CONTROLLERS (TESLA STYLE) */}
        <div className="mb-12 flex space-x-2 p-1 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-3xl shadow-2xl">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 px-8 py-3.5 rounded-xl transition-all duration-700
                ${activeTab === tab.id ? "text-white" : "text-white/30 hover:text-white/60"}`}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="teslaGlow"
                    className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent border border-white/20 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  />
                )}
                <Icon className={`w-4 h-4 transition-transform duration-500 ${activeTab === tab.id ? "scale-110 text-green-400" : ""}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENT STAGE */}
        <div className="w-full relative flex items-center justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: "brightness(0) blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "brightness(0) blur(20px)" }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="w-full flex justify-center"
            >
              <div className="w-full max-w-4xl relative">
                {/* Cyber Frame Decorators */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-500/30 rounded-tl-xl" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-500/30 rounded-br-xl" />
                
                {activeTab === "scan" && <ScanTab />}
                {activeTab === "rug shield" && <RugShieldTab />}
                {activeTab === "radar" && <RadarTab />}
                {activeTab === "hall of fame" && <HallOfFameTab />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 🧠 SENKU AGENT (FLOATING AI) */}
      <div className="fixed bottom-12 right-12 z-[100]">
        <SenkuAgent activeTab={activeTab} />
      </div>

      {/* 📊 SYSTEM STATUS FOOTER */}
      <footer className="relative z-10 w-full px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-6 text-[8px] font-mono text-white/20 tracking-[0.3em] uppercase">
          <div className="flex items-center space-x-2">
            <Activity className="w-3 h-3 text-green-500/40" />
            <span>Network Load: 12%</span>
          </div>
          <div className="hidden md:block italic">Designed by Bader Alkorgli</div>
        </div>
        
        <div className="text-[10px] font-black tracking-widest text-white/40">
           SENKU PROTOCOL <span className="text-white/10 mx-2">|</span> 2026
        </div>
      </footer>
    </div>
  );
}
