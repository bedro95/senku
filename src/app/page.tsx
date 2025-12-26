"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Radio, Cpu, ShieldCheck, Fingerprint, Volume2, VolumeX, Github } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiDrStoneEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Audio References
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    clickSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    successSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  const playSound = (sound: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (!isMuted && sound.current) {
      sound.current.currentTime = 0;
      sound.current.play().catch(() => {});
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString()
      });
      if (scanSound.current) scanSound.current.pause();
      playSound(successSound);
    } catch (e) { 
      if (scanSound.current) scanSound.current.pause();
      alert("Invalid Address."); 
    } finally { setLoading(false); }
  };

  const saveCard = async () => {
    playSound(clickSound);
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 4, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-LEGACY-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Error saving card."); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-cyan-500">
      
      {/* DR. STONE PERSONA (SENKU) - Desktop Only for Clean Design */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="fixed bottom-0 right-0 z-0 hidden lg:block pointer-events-none"
      >
        <div className="relative">
          {/* Neon Glow behind Character */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full" />
          <motion.img 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="https://www.transparentpng.com/download/dr-stone/senku-ishigami-dr-stone-png-7.png" // رابط صورة Senku (Dr. Stone)
            alt="Senku Ishigami"
            className="w-[450px] object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] grayscale-[30%] hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </motion.div>

      {/* Audio Toggle */}
      <button onClick={() => setIsMuted(!isMuted)} className="fixed top-6 right-6 z-50 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-cyan-400" />}
      </button>

      {/* --- SNOW SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: (Math.random() * 100) + "vw" }}
            transition={{ duration: Math.random() * 8 + 7, repeat: Infinity, ease: "linear", delay: Math.random() * 15 }}
            className="absolute w-[1.5px] h-[1.5px] bg-cyan-400/60 rounded-full shadow-[0_0_8px_#06b6d4]"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-10 md:mt-20">
        
        {/* LOGO SECTION */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-16 md:mb-24">
          <h1 className="text-8xl md:text-[15rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            WAGMI
          </h1>
          <div className="mt-4 flex flex-col items-center">
             <motion.p animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="text-[10px] md:text-[14px] font-mono tracking-[1.2em] text-cyan-400 uppercase font-black italic">
               NEURAL INTERFACE v4.7 // SCIENCE OVER LUCK
             </motion.p>
             <div className="mt-2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
        </motion.div>

        {/* INPUT SECTION */}
        <div className="w-full max-w-lg mb-20 px-4 relative z-20">
          <div className="relative p-[1px] rounded-full bg-white/10 focus-within:bg-gradient-to-r focus-within:from-cyan-500 focus-within:to-purple-600 transition-all duration-700">
            <input 
              onMouseEnter={() => playSound(hoverSound)}
              className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-base md:text-lg text-white placeholder:text-white/20" 
              placeholder="ENTER WALLET ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onMouseEnter={() => playSound(hoverSound)}
            onClick={() => { playSound(clickSound); analyze(); }} 
            disabled={loading} 
            className="w-full mt-6 py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-lg tracking-[0.4em] hover:scale-[1.02] transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            {loading ? "SCANNIG FREQUENCIES..." : "AUTHORIZE SCAN"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12 w-full px-2 relative z-20">
              
              <div className="relative w-full max-w-[620px] aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.8rem] p-[3px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] md:rounded-[3.7rem] p-8 md:p-14 overflow-hidden flex flex-col justify-between z-10">
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                  
                  <div className="flex justify-between items-start relative z-20">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                        <Fingerprint size={32} className="md:w-11 md:h-11 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-xl md:text-3xl font-black italic text-white uppercase tracking-tighter">Wagmi Legacy</p>
                        <p className="text-[10px] md:text-[12px] font-mono text-white/30 tracking-[0.2em] uppercase italic">Verified Asset Node</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-7 h-7 md:w-10 md:h-10" />
                  </div>

                  <div className="flex items-center gap-4 text-left relative z-20">
                    <h2 className="text-6xl md:text-[7rem] font-[1000] tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] leading-none italic">{data.sol}</h2>
                    <span className="text-xl md:text-3xl font-black text-cyan-400 italic self-end mb-2 md:mb-4">SOL</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-8 md:pt-12 relative z-20">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck size={14} className="text-cyan-400" />
                           <p className="text-[9px] md:text-[11px] font-black text-cyan-400 uppercase tracking-[0.2em] italic">Access: Premium</p>
                        </div>
                        <p className="text-sm md:text-2xl font-black italic tracking-tight text-white/90 uppercase">{data.status}</p>
                    </div>
                    <p className="text-[10px] font-mono text-white/40">ID: #{data.id}</p>
                  </div>
                </div>
              </div>

              <button 
                onMouseEnter={() => playSound(hoverSound)}
                onClick={saveCard} 
                className="flex items-center gap-6 bg-white/5 border border-white/10 px-24 py-6 rounded-full font-black text-xs uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all mb-2 group"
              >
                EXPORT IDENTITY <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 pb-10 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-all duration-500">
          <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playSound(hoverSound)} className="group flex flex-col items-center gap-2">
              <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all">
                <Github size={24} className="group-hover:text-cyan-400" />
              </div>
          </a>
          <p className="text-[10px] font-mono tracking-[1.5em] uppercase text-center">
            WAGMI PROTOCOL // <span className="text-white">Bader Alkorgli</span>
          </p>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}