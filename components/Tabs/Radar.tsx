import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RadarTab = () => {
  const [topGainer, setTopGainer] = useState({ name: "SENKU", volume: "2.4M", change: "+145%" });
  const [whaleMovements, setWhaleMovements] = useState([
    { id: 1, wallet: "6p6W...5YtZ", action: "BOUGHT", amount: "450 SOL", token: "SENKU" },
    { id: 2, wallet: "4jK2...m9Qp", action: "BOUGHT", amount: "890 SOL", token: "WIF" },
  ]);

  // محاكاة تحديث البيانات الحية للحيتان
  useEffect(() => {
    const interval = setInterval(() => {
      const tokens = ["PUMP", "WIF", "BONK", "POPCAT"];
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
      
      const newMovement = {
        id: Date.now(),
        wallet: "0x" + Math.random().toString(36).substring(2, 8).toUpperCase() + "...",
        action: "BOUGHT",
        amount: (Math.random() * 1000 + 100).toFixed(0) + " SOL",
        token: randomToken
      };

      setWhaleMovements(prev => [newMovement, ...prev.slice(0, 4)]);
      // تحديث العملة الأكثر تجميعاً عشوائياً للمحاكاة
      setTopGainer({ 
        name: randomToken, 
        volume: (Math.random() * 5 + 1).toFixed(1) + "M", 
        change: "+" + (Math.random() * 200).toFixed(0) + "%" 
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2">
      {/* القسم الرئيسي: الرادار الحي */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="lg:col-span-2 bg-black/80 border border-green-500/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(34,197,94,0.1)]"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-black text-green-400 tracking-tighter uppercase italic">Whale Radar v2.0</h2>
            <p className="text-green-900 text-[10px] font-mono">SOLANA MAINNET LIVE FEED</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            <span className="text-green-500 text-[10px] font-bold animate-pulse">● SIGNAL ACTIVE</span>
          </div>
        </div>

        <div className="relative h-64 flex items-center justify-center">
          {/* تصميم الرادار التقني */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            {[1, 2, 3].map((circle) => (
              <div key={circle} className={`absolute border border-green-500 rounded-full`} style={{ width: `${circle * 30}%`, height: `${circle * 30}%` }} />
            ))}
          </div>
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,197,94,0.3)_100%)] animate-[spin_5s_linear_infinite] rounded-full" />
          
          {/* عرض العملة الأكبر تجميعاً في المنتصف */}
          <div className="z-10 text-center">
            <p className="text-green-700 text-[10px] uppercase font-mono mb-1">Top Accumulation</p>
            <motion.h3 
              key={topGainer.name}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white tracking-tighter shadow-green-500 drop-shadow-2xl"
            >
              ${topGainer.name}
            </motion.h3>
            <div className="mt-2 flex items-center justify-center space-x-3">
              <span className="text-green-400 font-mono text-xs">{topGainer.volume} VOL</span>
              <span className="bg-green-500 text-black text-[10px] px-2 font-bold rounded">{topGainer.change}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* القسم الجانبي: حركة الحيتان الأخيرة */}
      <div className="space-y-4">
        <h3 className="text-green-500 text-[10px] font-mono uppercase tracking-[0.3em] px-2">Whale Logs</h3>
        <AnimatePresence mode="popLayout">
          {whaleMovements.map((move) => (
            <motion.div 
              key={move.id}
              layout
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="bg-green-950/10 border border-green-500/10 p-3 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="text-[10px] text-green-700 font-mono">{move.wallet}</p>
                <p className="text-white text-xs font-bold">{move.action} <span className="text-green-400">{move.token}</span></p>
              </div>
              <p className="text-green-500 font-mono text-xs font-bold">{move.amount}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RadarTab;
