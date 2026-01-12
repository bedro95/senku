"use client";

import { useState } from "react";

export type RugScanResult = {
  score: number;
  liquidity: string;
  mint: string;
  topHolders: string;
  status: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
};

export function useRugScan() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RugScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateAddress = (value: string) => {
    if (value.length < 32) return false;
    return true;
  };

  const scan = async () => {
    setError(null);
    setResult(null);

    if (!validateAddress(address)) {
      setError("INVALID TOKEN ADDRESS");
      return;
    }

    setLoading(true);

    // 🔧 Mock Engine (جاهز للاستبدال بـ API حقيقي)
    await new Promise((r) => setTimeout(r, 2500));

    const score = Math.floor(Math.random() * 20) + 80;

    setResult({
      score,
      liquidity: "LOCKED (99.2%)",
      mint: "DISABLED",
      topHolders: "4.2%",
      status: score > 85 ? "SAFE_GRAIL" : "CAUTION",
      riskLevel: score > 85 ? "LOW" : "MEDIUM",
    });

    setLoading(false);
  };

  return {
    address,
    setAddress,
    scan,
    loading,
    result,
    error,
  };
}
