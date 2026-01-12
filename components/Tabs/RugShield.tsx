import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RugShieldTab = () => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleScan = () => {
    if (!address) return;
    setIsScanning(true);
    setReport(null);

    // محاكاة فحص أمني حقيقي
    setTimeout(() => {
      setReport({
        score: 85,
        risks: [
          { title: "Liquidity Lock", status: "SECURE", detail: "Locked for 365 days", color: "text-green-400" },
          { title: "Mint Function", status: "DISABLED", detail: "No minting detected", color: "text-green-400" },
          { title: "Top Holders", status: "WARNING", detail: "Owner holds 5%", color: "text-yellow-400" },
        ],
      });
      setIsScanning(false);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-black/60 border border-blue-500/30 rounded-2xl backdrop-blur-xl"
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-blue-400 tracking-tighter uppercase">Rug Shield Protocol</h2>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="ENTER CONTRACT ADDRESS (0x...)" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-blue-950/20 border border-blue-500/30 rounded-xl p-4 text-blue-100 placeholder:text-blue-900 focus:outline-none focus:border-blue-400 transition-all font-mono text-sm"
          />
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 text-black font-bold rounded-lg transition-all uppercase text-xs"
          >
            {isScanning ? "SHIELDING..." : "PROTECT"}
          </button>
        </div>

        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="py-10 flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-blue-400 font-mono text-xs animate-pulse">DECRYPTING SMART CONTRACT BYTES...</p>
            </motion.div>
          )}

          {report && !isScanning && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl flex justify-between items-center">
                <span className="text-blue-300 font-mono uppercase text-sm">Security Score:</span>
                <span className="text-2xl font-bold text-blue-400">{report.score}/100</span>
              </div>
              
              <div className="space-y-2">
                {report.risks.map((risk: any, i: number) => (
                  <div key={i} className="flex justify-between p-3 bg-black/40 border border-white/5 rounded-lg items-center">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">{risk.title}</p>
                      <p className="text-white text-xs font-mono">{risk.detail}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded bg-black/60 ${risk.color}`}>
                      {risk.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RugShieldTab;
