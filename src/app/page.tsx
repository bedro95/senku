"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// تصحيح المسارات للعودة للخلف خطوة واحدة للخروج من مجلد src
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";

import { useAudioController } from "../../hooks/useAudio";


/**
 * SENKU PROTOCOL – CORE PAGE
 * Clean Architecture Edition
 */

const TABS = ["scan", "rug shield", "radar", "hall of fame"] as const;
type Tab = (typeof TABS)[number];

export default function SenkuPage() {
  const [activeTab, setActiveTab] = useState<Tab>("scan");

  useAudioController(); // 🎧 audio lifecycle handled هنا

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 overflow-hidden relative">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)]" />
        <motion.img
          src="/senku.GIF"
          alt="Senku Background"
          animate={{ opacity: 0.25, x: [-10, 10, -10], y: [-5, 5, -5] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
        />
      </div>

      {/* 🧭 NAV */}
      <nav className="relative z-10 mt-6 mb-14">
        <div className="flex bg-slate-900/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]
              ${activeTab === tab ? "text-white" : "text-white/30 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* 🧠 MAIN */}
      <main className="relative z-10 w-full max-w-6xl flex-grow flex items-center justify-center">
        {activeTab === "scan" && <ScanTab />}
        {activeTab === "rug shield" && <RugShieldTab />}
        {activeTab === "radar" && <RadarTab />}
        {activeTab === "hall of fame" && <HallOfFameTab />}
      </main>

      {/* 🤖 AGENT */}
      <SenkuAgent activeTab={activeTab} />

      {/* 🦶 FOOTER */}
      <footer className="relative z-10 mt-16 mb-6 text-[10px] text-white/40 tracking-widest">
        © 2025 SENKU PROTOCOL — Powered by Bader
      </footer>
    </div>
  );
}
