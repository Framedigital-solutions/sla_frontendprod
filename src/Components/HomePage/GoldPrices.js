import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { OTHER, WS_CONFIG } from "../../config/api.config";
import axios from "axios";
import { io } from "socket.io-client";

const GoldPrices = () => {
  const [prices, setPrices] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const socketRef = useRef(null);
  const pricesRef = useRef({});

  // Fetch prices from API
  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get(OTHER.GOLD_PRICE);

      const priceMap = {};
      response.data.forEach((item) => {
        priceMap[item.Carat] = item.TodayPricePerGram;
      });

      if (JSON.stringify(priceMap) !== JSON.stringify(pricesRef.current)) {
        setPrices(priceMap);
        pricesRef.current = priceMap;
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      setConnectionStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchPrices();

    const pollInterval = setInterval(() => {
      fetchPrices();
    }, 10000);

    try {
      socketRef.current = io(WS_CONFIG.BASE);

      socketRef.current.on("connect", () => {
        setConnectionStatus("connected");
      });

      socketRef.current.on("disconnect", () => {
        setConnectionStatus("disconnected");
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setConnectionStatus("error");
      });

      socketRef.current.on("priceUpdate", (data) => {
        const priceMap = {};
        data.forEach((item) => {
          priceMap[item.Carat] = item.TodayPricePerGram;
        });

        if (JSON.stringify(priceMap) !== JSON.stringify(pricesRef.current)) {
          setPrices(priceMap);
          pricesRef.current = priceMap;
          setLastUpdate(new Date());
        }
      });
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      setConnectionStatus("error");
    }

    return () => {
      clearInterval(pollInterval);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [fetchPrices]);

  const getPriceChangeIndicator = (carat) => {
    if (!prices[carat]) return null;
    return (
      <div className="mt-2 text-xs">
        {/* <span className="text-black font-bold">
          Latest Gold Price & The Last Card (Silver) shows today’s silver rate
        </span> */}
      </div>
    );
  };

  const renderPriceCard = (carat, purity) => {
    const pricePerGram = prices[carat];
    const priceFormatted = pricePerGram ? pricePerGram.toLocaleString() : "...";

    return (
      <div
        key={carat}
        className="flex-1 text-center w-full sm:w-auto bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border border-orange-100"
      >
        <h2 className="text-base sm:text-lg mb-3 sm:mb-4 font-brown font-semibold">
          {carat} Price
        </h2>
        <div className="text-brown-600 text-4xl sm:text-5xl font-semibold mb-3 sm:mb-4">
          <span className="font-normal">₹</span> {priceFormatted}
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          {carat === "Silver" ? "10g Silver" : `${purity} Gold`}
        </p>
        {getPriceChangeIndicator(carat)}
      </div>
    );
  };

  const caratData = [
    { carat: "24K", purity: "99.9%" },
    { carat: "22K", purity: "91.7%" },
    { carat: "18K", purity: "75%" },
    { carat: "Silver", purity: "4.1%" },
  ];

  const renderConnectionStatus = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        );
      case "connecting":
        return (
          <span className="ml-2 inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
        );
      case "disconnected":
      case "error":
        return (
          <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-orange-500 text-3xl font-bold sm:text-3xl text-center mb-2 font-garamond">
        Current Gold & Silver Prices
      </h1>
      <p className="text-center text-gray-600 mb-2 sm:mb-3 font-garamond text-sm sm:text-base">
        PURE & TRANSPARENT
      </p>
      <p className="text-center text-xs text-gray-500 mb-8 sm:mb-12">
        Last updated: {lastUpdate.toLocaleTimeString()}
        {renderConnectionStatus()}
        <button
          onClick={fetchPrices}
          className="ml-3 text-blue-500 hover:text-blue-700 underline"
        >
          Refresh Now
        </button>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {caratData.map((item) => (
          <React.Fragment key={item.carat}>
            {renderPriceCard(item.carat, item.purity)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(GoldPrices);
