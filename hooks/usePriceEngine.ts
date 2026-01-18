"use client";

import { useState, useEffect } from "react";

const JUP_PRICE_API = "https://api.jup.ag/price/v2?ids=";

export function usePriceEngine() {
  const [prices, setPrices] = useState({
    sol: 0,
    jup: 0,
    ray: 0
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const solMint = "So11111111111111111111111111111111111111112";
        const jupMint = "JUPyiwrB7vYmhcduj6CwLDJgfSotp96Z5H8Mv1YV69S";
        const rayMint = "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R";
        
        const response = await fetch(`${JUP_PRICE_API}${solMint},${jupMint},${rayMint}`);
        const json = await response.json();
        
        setPrices({
          sol: parseFloat(json.data[solMint]?.price || "0"),
          jup: parseFloat(json.data[jupMint]?.price || "0"),
          ray: parseFloat(json.data[rayMint]?.price || "0")
        });
      } catch (e) {
        console.error("Price fetch error", e);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return prices;
}
