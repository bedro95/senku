"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Layers, Radio, Cpu, Github, ShieldCheck, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiFinalVersion() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // استخدام اتصال ثابت ومباشر
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const pubKey = new PublicKey(address.trim());
      const balance = await connection.getBalance(pubKey);
      const solValue = balance / 1_000_000_000;

      // منطق تحديد الرتبة والعملة
      let userRank = "WAGMI SOLDIER";
      let assetType = "SOL";

      if (solValue >= 10) userRank = "ALPHA TRADER";
      if (solValue >= 100) userRank = "SOLANA WHALE";
      
      // ميزة الحاملين الخاصة بك
      if (address.toLowerCase().includes('troll')) {
        userRank = "TROLL HODLER";
        assetType = "TROLL";
      }

      setData({
        sol: solValue.toFixed(2),
        rank: userRank,
        asset: assetType,
        id: Math.floor(1000 + Math.random() * 9000)
      });

      // تمرير تلقائي للكرت
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (err) {
      console.error(err);
      alert("خطأ: تأكد من صحة عنوان المحفظة.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[60vw] h-[60vw] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[60vw] h-[60vw] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* LOGO FIX: تباعد أحرف مدروس لعدم التداخل */}
          <h1 className="text-[15vw] md:text-[12rem] font-[1000] italic tracking-normal leading-[0.8] bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            WAGMI
          </h1>
          <p className="text-cyan-400 font-mono tracking-[1.5em] text-[10px] md:text-sm uppercase font-black italic mt-8">
            PULSE TERMINAL v3.0
          </p>
        </motion.div>

        <div className="mt-20 w-full max-w-xl px-4 space-y-4">
          <input 
            className="w-full bg-white/5 border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg focus:border-cyan-500 transition-all shadow-2xl" 
            placeholder="ENTER SOLANA ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet} 
            disabled={loading} 
            className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-lg tracking-[0.3em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95"
          >
            {loading ? "SCANNING..." : "GENERATE IDENTITY"}
          </button>
        </div>
      </section>

      {/* --- RESULT SECTION --- */}
      <AnimatePresence>
        {data && (
          <section id="result-section" className="relative z-10 py-32 flex flex-col items-center bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-[580px] px-6">
              
              <div className="relative aspect-[1.58/1] rounded-[3rem] p-[3px] overflow-hidden">
                <div className="absolute inset-[-500%] animate-[spin_6s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.9rem] p-10 flex flex-col justify-between overflow-hidden">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                          <Layers className="text-cyan-400" size={32} />
                        </div>
                        <div className="text-left leading-none">
                           <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">Identity Pass</h2>
                           <p className="text-[10px] font-mono text-white/30 uppercase mt-1 italic">ID: //WAGMI-{data.id}//</p>
                        </div>
                      </div>
                      <Radio className="text-cyan-500 animate-pulse" size={28} />
                   </div>

                   <div className="flex items-center gap-8 text-left">
                      <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                        <Cpu size={35} className="text-white/20" />
                      </div>
                      <div>
                        <h3 className="text-6xl md:text-8xl font-[1000] tracking-tighter text-white leading-none drop-shadow-xl">{data.sol}</h3>
                        <p className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase mt-2 font-bold italic">RESERVE: {data.asset}</p>
                      </div>
                   </div>

                   <div className="flex justify-between items-end border-t border-white/5 pt-8">
                      <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest italic mb-1">NETWORK_ACCESS: GRANTED</p>
                        <p className="text-xl font-[1000] italic text-white/90 uppercase tracking-tight">RANK: {data.rank}</p>
                      </div>
                      <div className="w-16 h-16 bg-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                        <Zap size={35} className="text-black" fill="currentColor" />
                      </div>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const a = document.createElement('a'); a.download = 'WAGMI-ID.png'; a.href = url; a.click(); })}
                className="mt-12 w-full flex items-center justify-center gap-4 bg-white/5 border border-white/10 py-5 rounded-full font-black text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all"
              >
                DOWNLOAD PASS <Download size={18} />
              </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <h4 className="text-3xl font-black italic tracking-tighter">WAGMI PULSE</h4>
              <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em] mt-1 italic">Designed by Bader Alkorgli</p>
           </div>
           <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all font-black text-xs">
              <Github size={20} /> DEVELOPER REPO
           </a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}