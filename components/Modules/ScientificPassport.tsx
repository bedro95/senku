"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ShieldCheck, Cpu, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { QRCodeSVG } from 'qrcode.react';

export default function ScientificPassport({ walletAddress = "0x...SOL" }) {
  const passportRef = useRef<HTMLDivElement>(null);
  const maskedAddress = walletAddress.length > 10 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : walletAddress;

  const handleExport = async () => {
    if (passportRef.current === null) return;
    try {
      const dataUrl = await toPng(passportRef.current, { cacheBust: true });
      download(dataUrl, 'senku-quantum-passport.png');
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Quantum Passport</h3>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1 bg-[#00FFCC]/10 hover:bg-[#00FFCC]/20 border border-[#00FFCC]/30 rounded-full transition-colors group"
        >
          <Download className="w-3 h-3 text-[#00FFCC]" />
          <span className="text-[10px] font-mono font-bold text-[#00FFCC] uppercase">Export ID</span>
        </button>
      </div>

      <div 
        ref={passportRef}
        className="relative aspect-[1.6/1] w-full bg-[#050505] rounded-3xl border border-[#00FFCC]/40 overflow-hidden shadow-[0_0_50px_rgba(0,255,204,0.1)] p-8 flex flex-col justify-between"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="/senku.GIF" alt="Watermark" className="w-full h-full object-cover grayscale mix-blend-screen" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">Senku</h4>
            <span className="text-[8px] font-mono tracking-[0.4em] text-[#00FFCC] uppercase">Quantum Division</span>
          </div>
          <div className="p-2 bg-[#00FFCC]/10 border border-[#00FFCC]/30 rounded-xl">
            <QRCodeSVG 
              value={typeof window !== 'undefined' ? window.location.href : 'https://senku.protocol'} 
              size={40}
              bgColor="transparent"
              fgColor="#00FFCC"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
             <span className="text-[10px] font-mono text-[#00FFCC] uppercase tracking-widest">Quantum Scientist</span>
          </div>
          <div className="text-sm font-mono text-white/80 break-all bg-white/5 p-3 rounded-xl border border-white/5">
            {maskedAddress}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">Rank Assignment</span>
            <span className="text-xs font-bold text-white uppercase tracking-tighter">Master Researcher v.5</span>
          </div>
          <div className="flex items-center gap-4 text-white/20">
            <Cpu className="w-4 h-4" />
            <Globe className="w-4 h-4" />
          </div>
        </div>

        {/* Holographic Overlays */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00FFCC]/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
      </div>
    </div>
  );
}
