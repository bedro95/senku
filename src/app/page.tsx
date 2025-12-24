"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Terminal as TermIcon, Activity } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiExcitementEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

  // تتبع حركة الماوس للإضاءة الخلفية
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const playSound = (type: 'click' | 'success') => {
    const audio = new Audio(type === 'click' ? '/click.mp3' : '/success.mp3'); 
    // ملاحظة: سأضيف لك كود برمجي لتوليد صوت إلكتروني بسيط في حال عدم وجود ملفات
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(type === 'click' ? 150 : 440, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const analyzeWallet = async () => {
    if (!address) return;
    playSound('click');
    setLoading(true);
    setData(null);
    try {
      const connection = new Connection(HELIUS_RPC, 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      setTimeout(() => {
        playSound('success');
        const topTokens = ["SOL", "JUP", "PYTH", "BONK", "WIF", "RAY"];
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (70 + Math.random() * 28).toFixed(1),
          status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: topTokens[Math.floor(Math.random() * topTokens.length)],
          bigWinMultiplier: (3 + Math.random() * 7).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
      }, 1500); // محاكاة وقت التحليل للإثارة
    } catch (err) {
      alert("Neural Link Interrupted: Check Address");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col items-center py-12 px-6 font-sans overflow-hidden cursor-none">
      
      {/* Custom Cursor Glow */}
      <motion.div 
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
        className="fixed w-10 h-10 bg-cyan-500 rounded-full blur-xl opacity-50 pointer-events-none z-50"
      />

      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-xl text-center">
        
        {/* Animated Title */}
        <div className="relative mb-16">
          <motion.h1 
            animate={{ textShadow: ["0 0 10px #06b6d4", "0 0 30px #06b6d4", "0 0 10px #06b6d4"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl font-black tracking-tighter italic text-white"
          >
            WAGMI
          </h1 >
          <div className="flex items-center justify-center gap-2 mt-2">
            <Activity size={14} className="text-cyan-500 animate-pulse" />
            <p className="text-[10px] tracking-[0.6em] text-cyan-500 font-bold uppercase italic font-mono">Quantum Terminal v11.0</p>
          </div>
        </div>

        {/* Professional Input Box */}
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
          <input 
            className="relative w-full bg-black border border-white/10 p-7 rounded-3xl text-center font-mono text-xl outline-none focus:border-cyan-500 transition-all placeholder:text-gray-800"
            placeholder="INPUT_WALLET_ID"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button 
          onClick={analyzeWallet}
          disabled={loading}
          className="relative w-full h-24 bg-white text-black rounded-3xl font-black text-2xl uppercase tracking-[0.2em] overflow-hidden group mb-20 shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-black">
            {loading ? "INITIALIZING SCAN..." : <>START NEURAL SCAN <Zap size={24} fill="currentColor" /></>}
          </span>
        </button>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 100, opacity: 0, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              className="group"
            >
              <div ref={cardRef} className="p-12 rounded-[3.5rem] bg-[#050505] border-2 border-white/10 text-left relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)]">
                
                {/* Floating Particles In Card */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                   <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500 blur-3xl animate-pulse" />
                   <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-500 blur-3xl animate-pulse" />
                </div>

                <div className="flex justify-between items-center mb-12 relative z-10">
                   <div className="flex items-center gap-3">
                      <TermIcon size={18} className="text-cyan-500" />
                      <span className="text-xs font-mono text-gray-500 tracking-tighter">{data.address}</span>
                   </div>
                   <ShieldCheck className="text-green-500 animate-bounce" size={24} />
                </div>

                <div className="space-y-8 relative z-10">
                  <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Elite Ranking</p>
                    <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl">{data.status}</h2>
                  </motion.div>

                  <div className="bg-white/[0.03] border border-white/10 p-7 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={40} /></div>
                    <p className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-[0.2em] mb-2 italic">Legendary Trade</p>
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tight">
                        {data.bigWinToken} <span className="text-cyan-500 ml-2">+{data.bigWinMultiplier}x</span>
                    </h3>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-2">Verified Net Worth</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-7xl font-black text-white tracking-tighter">
                          {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <span className="text-3xl text-cyan-500 font-light italic">SOL</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-center opacity-30 font-mono text-[9px] tracking-widest uppercase italic">
                   <span>SECURE_NODE_041</span>
                   <span>© 2025 WAGMI_CORP</span>
                </div>
              </div>

              <button 
                onClick={() => { playSound('click'); /* وظيفة التحميل */ }}
                className="mt-8 w-full h-16 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
              >
                <Download size={20} /> Capture Data & Share
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Ticker (أسفل الصفحة) */}
        <div className="mt-24 w-full overflow-hidden whitespace-nowrap opacity-20 font-mono text-[9px] uppercase tracking-[0.5em]">
           <motion.div 
             animate={{ x: [0, -1000] }} 
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="inline-block"
           >
             BLOCK_HEIGHT: 310,249,121 // NEURAL_LINK_ESTABLISHED // SCANNING_MEMPOOL // BADER_ALKORGLI_NODE_ACTIVE //
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
}