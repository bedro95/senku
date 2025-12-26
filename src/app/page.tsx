"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Layers, Radio, Cpu, Github, ExternalLink } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiStableEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;

      // منطق تحديد الرتبة والعملة
      let assetName = "SOL";
      let statusTitle = sol >= 10 ? "SOLANA ALPHA" : "SOLANA HODLER";

      // إذا أردت محاكاة اسم عملة معينة مثل Troll يدوياً بناءً على المحفظة
      if (address.toLowerCase().includes('troll') || sol > 50) {
        assetName = "TROLL";
        statusTitle = "TROLL HODLER";
      }

      setData({
        sol: sol.toFixed(2),
        asset: assetName,
        status: statusTitle,
        id: Math.floor(1000 + Math.random() * 9000)
      });
    } catch (e) {
      alert("Address Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative">
      
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-12">
        {/* CORRECTED LOGO */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.3em] text-cyan-400 uppercase mt-4 mb-16 text-center italic font-bold">
            PULSE TERMINAL
          </p>
        </motion.div>

        {/* Input UI */}
        <div className="w-full max-w-md mb-20 space-y-4">
            <div className="relative p-[1px] rounded-full bg-white/10 overflow-hidden focus-within:bg-cyan-500 transition-all">
                <input 
                  className="w-full bg-black rounded-full p-5 text-center outline-none font-mono text-white" 
                  placeholder="ENTER WALLET ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button onClick={analyze} disabled={loading} className="w-full py-5 bg-white text-black rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-95">
               {loading ? "SCANNING..." : "SCAN IDENTITY"}
            </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12 w-full max-w-[560px]">
              
              {/* THE ANIMATED NEON CARD */}
              <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] p-[3px] overflow-hidden">
                {/* Racing Border */}
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,#06b6d4,#a855f7,#06b6d4)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] p-8 md:p-10 overflow-hidden flex flex-col justify-between z-10">
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '25px 25px' }} />

                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                        <Layers size={24} className="text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-black italic text-white uppercase">Identity Pass</p>
                        <p className="text-[10px] font-mono text-white/30 tracking-tighter italic font-bold">//WAGMI-ID: {data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-6 h-6" />
                  </div>

                  {/* Wealth Section */}
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-16 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                        <Cpu size={28} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-none">{data.sol}</h2>
                        <p className="text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase mt-1 italic font-bold">PRIMARY_ASSET: {data.asset}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="text-left">
                        <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">NETWORK_ACCESS: SECURED</p>
                        <p className="text-lg font-black italic tracking-tight text-white/90">RANK: {data.status}</p>
                    </div>
                    <div className="w-14 h-14 bg-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_#06b6d4]">
                        <Zap size={28} className="text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-6 items-center">
                <button onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const link = document.createElement('a'); link.download = 'WAGMI-CARD.png'; link.href = url; link.click(); })} className="flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
                  EXPORT IMAGE <Download size={16} />
                </button>
                
                <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                  <Github size={18} /> <span className="text-[10px] font-mono tracking-widest uppercase">bedro95_kernel</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}