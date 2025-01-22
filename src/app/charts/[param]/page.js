"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { createChart } from "lightweight-charts";

export default function Home() {
  const params = useParams();
  const { param } = params;
  const chartContainerRef = useRef(null); // Reference to the chart container
  const candlestickSeriesRef = useRef(null); // Reference to the candlestick series
  const areaSeriesRef = useRef(null); // Reference to the candlestick series
  const [data, setData] = useState({}); // State to store data for all symbols
  

  useEffect(() => {
    // Initialize Lightweight Chart
    const chart = createChart(chartContainerRef.current, {
      width: 1200,
      height: 400,
    });

    // Add Candlestick Series to Chart
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeriesRef.current = candlestickSeries;

    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });
    areaSeriesRef.current = areaSeries;

    // chart.timeScale().fitContent();

    // Cleanup on unmount
    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    // Connect to Binance WebSocket
    const binanceSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${param}@kline_1s`
    );

    binanceSocket.onmessage = (event) => {
      
      const message = JSON.parse(event.data);
      console.log(message);
      const { e: eventType, E: eventTime, s: symbol } = message;
      const {
        c: closePrice,
        h: highPrice,
        l: lowPrice,
        o: openPrice,
        t: startTime,
        T: closeTime,
        x: klineClosed,
      } = message.k;

      // Update tickers state
      setData((prevTickers) => ({
        ...prevTickers,
        [symbol]: {
          closePrice,
          highPrice,
          lowPrice,
          openPrice,
          eventTime,
          startTime,
          closeTime,
          klineClosed,
        },
      }));

      // Update chart data
      const candlestickData = {
        time: Math.floor(eventTime / 1000),
        open: parseFloat(openPrice),
        high: parseFloat(highPrice),
        low: parseFloat(lowPrice),
        close: parseFloat(closePrice),
      };
      const areaSeriesData = {
        time: Math.floor(eventTime / 1000),
        value: parseFloat(closePrice),
      };

      if (candlestickSeriesRef.current) {
        console.log(candlestickData);
        // candlestickSeriesRef.current.setData([candlestickData]);
        candlestickSeriesRef.current.update(candlestickData);
      }

      if (areaSeriesRef.current) {
        console.log(areaSeriesData);
        // areaSeriesRef.current.setData([areaSeriesData]);
        areaSeriesRef.current.update(areaSeriesData);
      }
    };

    // Cleanup WebSocket on component unmount
    return () => {
      binanceSocket.close();
    };
  }, [param]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {Object.keys(data).length > 0 && (
          <h2 className="text-xl font-semibold">
            {Object.keys(data).map((symbol) => symbol.toUpperCase())}
          </h2>
        )}
        <div ref={chartContainerRef}></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
