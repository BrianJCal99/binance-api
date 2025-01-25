"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { createChart } from "lightweight-charts";

export default function Home() {
  const params = useParams();
  const { param } = params;
  const candlestickChartRef = useRef(null); // Reference to the chart container
  const areaChartRef = useRef(null); // Reference to the chart container
  const candlestickSeriesRef = useRef(null); // Reference to the candlestick series
  const areaSeriesRef = useRef(null); // Reference to the candlestick series
  const [ticker, setTicker] = useState({}); // State to store data for all symbols
  const [kline, setKline] = useState({}); // State to store data for all symbols

  useEffect(() => {
    const candlestickChart = createChart(areaChartRef.current, {
      width: 1200,
      height: 400,
    });

    // Add Candlestick Series to Chart
    const candlestickSeries = candlestickChart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeriesRef.current = candlestickSeries;
    candlestickChart.timeScale().fitContent();

    const areaChart = createChart(candlestickChartRef.current, {
      width: 1200,
      height: 400,
    });

    const areaSeries = areaChart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });
    areaSeriesRef.current = areaSeries;
    areaChart.timeScale().fitContent();

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

      // Update klines state
      setKline((prevTickers) => ({
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

      if (candlestickSeriesRef.current) {
        console.log(candlestickData);
        candlestickSeriesRef.current.update(candlestickData);
        // candlestickSeriesRef.current.setKline([candlestickData]);
      }
    };

    // Cleanup WebSocket on component unmount
    return () => {
      binanceSocket.close();
    };
  }, [param]);

  useEffect(() => {
    // Connect to Binance WebSocket
    const binanceSocket_Ticker = new WebSocket(
      `wss://stream.binance.com:9443/ws/${param}@ticker`
    );

    binanceSocket_Ticker.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      const {
        e: eventType,
        E: eventTime,
        s: symbol,
        p: priceChange,
        P: priceChangePercent,
        c: lastPrice,
      } = message;

      // Update tickers state
      setTicker((prevTickers) => ({
        ...prevTickers,
        [symbol]: {
          eventType,
          symbol,
          priceChange,
          priceChangePercent,
          lastPrice,
        },
      }));

      // Update chart data
      const areaSeriesData = {
        time: Math.floor(eventTime / 1000),
        value: parseFloat(lastPrice),
      };

      if (areaSeriesRef.current) {
        console.log(areaSeriesData);
        areaSeriesRef.current.update(areaSeriesData);
        // areaSeriesRef.current.setTicker([areaSeriesData]);
      }
    };

    // Cleanup WebSocket on component unmount
    return () => {
      binanceSocket_Ticker.close();
    };
  }, [param]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {Object.keys(ticker).length > 0 && (
          <div className="">
            <h2 className="text-xl font-semibold">
              {Object.keys(ticker).map((symbol) => symbol.toUpperCase())}
            </h2>
            {Object.values(ticker).map((data, index) => (
              <div key={index} className="text-lg">
                <div>US${parseFloat(data.lastPrice).toFixed(2)}</div>
                {parseFloat(data.priceChange).toFixed(2)}
                <span className="px-2">
                  ({parseFloat(data.priceChangePercent).toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        )}
        <div ref={candlestickChartRef}></div>
        <div ref={areaChartRef}></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
