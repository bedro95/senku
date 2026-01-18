"use client";

import { useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";

const JUP_PRICE_API = "https://api.jup.ag/price/v2?ids=";
const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

export function usePriceEngine() {
  const [prices, setPrices] = useState({
    sol: 0,
    jup: 0,
    ray: 0
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${JUP_PRICE_API}So11111111111111111111111111111111111111112,JUPyiwrB7vYmhcduj6CwLDJgfSotp96Z5H8Mv1YV69S,4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R`);
        const json = await response.json();
        setPrices({
          sol: parseFloat(json.data.So11111111111111111111111111111111111111112?.price || 0),
          jup: parseFloat(json.data.JUPyiwrB7vYmhcduj6CwLDJgfSotp96Z5H8Mv1YV69S?.price || 0),
          ray: parseFloat(json.data.4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R?.price || 0)
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
