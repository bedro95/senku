"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Download, MessageSquare, Send, X, Bot, Cpu, Link as LinkIcon } from 'lucide-react';

export default function WagmiFinalRevision() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchPrices = async () => {
    try {
      const [binanceRes, jupRes] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/price?symbols=["SOLUSDT","BTCUSDT"]'),
        fetch('https://api.jup.ag/price/v2?ids=JUP,WIF,BONK')
      ]);
      const bData = await binanceRes.json();
      const jData = await jupRes.json();
      setPrices({
        SOL: bData.find((t: any) => t.symbol === "SOLUSDT")?.price || 0,
        BTC: bData.find((t: any) => t.symbol === "BTCUSDT")?.price || 0,
        JUP: jData.data?.JUP?.price || 0,
        WIF: jData.data?.WIF?.price || 0,
        BONK: jData.data?.BONK?.price || 0,
      });
    } catch (e) { console.error("Price sync failed"); }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      
      setData({
        sol: solAmount,
        status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });
      setLoading(false);
    } catch (err) {
      alert("Invalid Solana Address");
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const context = data ? `User has ${data.sol} SOL.` : "User is browsing.";
      // محاولة الاتصال بمسار الـ API النسبي
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: context })
      });
      
      const result = await response.json();
      if (result.text) {
        setChatHistory(prev => [...prev, { role: 'bot', text: result.text }]);
      } else {
        throw new Error();
      }
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting. Please ensure the API route is deployed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden">
      {/* Ticker */}
      <div className="w-full bg-white/[0.03] border-b border-white/5 py-3 px-6 flex gap-8 items-center z-50 backdrop-blur-md">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Live Terminal</span>
        </div>
        <div className="flex gap-8 text-[10px] font-mono font-bold uppercase overflow-hidden">
           <span>SOL: ${Number(prices.SOL).toFixed(2)}</span>
           <span>BTC: ${Number(prices.BTC).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center py-20 px-5 max-w-2xl mx-auto w-full">
        <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter mb-4 shadow-cyan-500/20 drop-shadow-2xl">WAGMI</h1>
        <p className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] mb-16 uppercase font-black italic">Neural Analyzer v23.0</p>

        <div className="w-full space-y-4 mb-20">
          <input className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center font-mono text-lg outline-none focus:border-cyan-500 transition-all" placeholder="SOLANA_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={analyzeWallet} disabled={loading} className="w-full h-20 bg-white text-black rounded-[2rem] font-black text-xl uppercase tracking-tighter hover:bg-cyan-500 transition-all">
            {loading ? "SCANNING..." : "ANALYZE"}
          </button>
        </div>

        {data && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full mb-20">
            <div className="p-10 rounded-[3rem] bg-[#050505] border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 animate-pulse"/>
              <p className="text-[10px] text-gray-600 font-mono mb-2 uppercase tracking-widest font-bold italic">Identity Class</p>
              <h2 className="text-5xl md:text-7xl font-black italic mb-8 uppercase tracking-tighter">{data.status}</h2>
              <div className="pt-8 border-t border-white/5">
                <p className="text-[10px] text-gray-600 font-mono mb-2 uppercase tracking-widest font-bold italic">Net Worth</p>
                <p className="text-6xl font-black text-white">{data.sol.toFixed(2)} <span className="text-2xl text-cyan-500 italic">SOL</span></p>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- الشركات (Partners/Stack Section) --- */}
        <div className="w-full pt-10 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black tracking-widest uppercase">Solana</span>
              <div className="h-[2px] w-4 bg-purple-500"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black tracking-widest uppercase">Jupiter</span>
              <div className="h-[2px] w-4 bg-orange-500"></div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black tracking-widest uppercase">Helius</span>
              <div className="h-[2px] w-4 bg-cyan-500"></div>
            </div>
          </div>
          <p className="text-[11px] font-mono tracking-[0.4em] text-gray-600 font-bold uppercase italic text-center">
            Architected by <span className="text-white border-b border-cyan-500/50">Bader Alkorgli</span>
          </p>
        </div>
      </div>

      {/* Chat UI */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
          {isChatOpen ? <X size={28} className="text-black" /> : <MessageSquare size={28} className="text-black" />}
        </button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-20 right-0 w-[300px] md:w-[380px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl">
              <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                <Bot size={18} className="text-cyan-500"/>
                <h5 className="text-[10px] font-black uppercase tracking-widest">Wagmi AI Intelligence</h5>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[11px] font-mono scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-300 border border-white/10'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[9px] text-cyan-500 font-mono animate-pulse">Gemini is thinking...</div>}
              </div>
              <div className="p-4 bg-black border-t border-white/5 flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none text-white font-mono" placeholder="Ask anything..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} />
                <button onClick={handleChat} className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shrink-0 hover:bg-cyan-500 transition-colors"><Send size={16} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}