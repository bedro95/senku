"use client";

import { useState, useEffect } from "react";

const JUP_PRICE_API = "https://price.jup.ag/v6/price?ids=SOL,JUP,RAY,SEND";

export interface PriceData {
  price: number;
  trend: "up" | "down" | "stable";
}

// Hardcoded fallback prices to ensure the UI never looks empty
const FALLBACK_PRICES = {
  SOL: 142.58,
  JUP: 1.12,
  RAY: 2.45,
  SEND: 0.08,
};

export function usePriceEngine() {
  const [prices, setPrices] = useState<Record<string, PriceData>>({
    SOL: { price: FALLBACK_PRICES.SOL, trend: "stable" },
    JUP: { price: FALLBACK_PRICES.JUP, trend: "stable" },
    RAY: { price: FALLBACK_PRICES.RAY, trend: "stable" },
    SEND: { price: FALLBACK_PRICES.SEND, trend: "stable" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(JUP_PRICE_API);
        if (!response.ok) throw new Error("API Limit");
        const json = await response.json();
        
        if (!json.data) throw new Error("Invalid Data");

        setPrices((prev) => {
          const newPrices: Record<string, PriceData> = {};
          ["SOL", "JUP", "RAY", "SEND"].forEach((id) => {
            const currentPrice = json.data[id]?.price || FALLBACK_PRICES[id as keyof typeof FALLBACK_PRICES];
            const prevPrice = prev[id]?.price || FALLBACK_PRICES[id as keyof typeof FALLBACK_PRICES];
            let trend: "up" | "down" | "stable" = "stable";
            
            if (prevPrice !== 0) {
              if (currentPrice > prevPrice) trend = "up";
              else if (currentPrice < prevPrice) trend = "down";
            }
            
            newPrices[id] = { price: currentPrice, trend };
          });
          return newPrices;
        });
        setLoading(false);
      } catch (e) {
        console.error("Price fetch error, using fallbacks", e);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // 10s auto-refresh
    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
}
