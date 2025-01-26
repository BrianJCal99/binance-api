"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { createChart } from "lightweight-charts";

export default function Home() {
  const params = useParams();
  const { param } = params;

  const candlestickChartRef = useRef(null); // Reference to the chart container
  const areaChartRef = useRef(null); // Reference to the chart container
  const barChartRef = useRef(null); // Reference to the chart container
  const baselineChartRef = useRef(null); // Reference to the chart container
  const histogramChartRef = useRef(null); // Reference to the chart container
  const lineChartRef = useRef(null); // Reference to the chart container

  const candlestickSeriesRef = useRef(null); // Reference to the candlestick series
  const areaSeriesRef = useRef(null); // Reference to the area series
  const barSeriesRef = useRef(null); // Reference to the bar series
  const baselineSeriesRef = useRef(null); // Reference to the bar series
  const histogramSeriesRef = useRef(null); // Reference to the bar series
  const lineSeriesRef = useRef(null); // Reference to the bar series

  const [ticker, setTicker] = useState({}); // State to store data for all symbols
  const [kline, setKline] = useState({}); // State to store data for all symbols

  const [priceMovementState, setPriceMovementState] = useState(null); // State to store price movement state

  // Charts
  useEffect(() => {
    // Candlestick
    const candlestickChart = createChart(candlestickChartRef.current, {
      width: 1200,
      height: 400,
      layout: {
        background: { type: "solid", color: "black" }, // Dark background color
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2c2c2c", // Vertical grid lines color
        },
        horzLines: {
          color: "#2c2c2c", // Horizontal grid lines color
        },
      },
      priceScale: {
        borderColor: "#555", // Color of the border for the price scale
      },
      timeScale: {
        borderColor: "#555", // Color of the border for the time scale
      },
    });

    const candlestickSeries = candlestickChart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeriesRef.current = candlestickSeries;
    candlestickChart.timeScale().applyOptions({ timeVisible: true });

    // Area
    const areaChart = createChart(areaChartRef.current, {
      width: 1200,
      height: 400,
      layout: {
        background: { type: "solid", color: "black" }, // Dark background color
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2c2c2c", // Vertical grid lines color
        },
        horzLines: {
          color: "#2c2c2c", // Horizontal grid lines color
        },
      },
      priceScale: {
        borderColor: "#555", // Color of the border for the price scale
      },
      timeScale: {
        borderColor: "#555", // Color of the border for the time scale
      },
    });

    const areaSeries = areaChart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });
    areaSeriesRef.current = areaSeries;
    areaChart.timeScale().applyOptions({ timeVisible: true });

    // Bar
    const barChart = createChart(barChartRef.current, {
      width: 1200,
      height: 400,
      layout: {
        background: { type: "solid", color: "black" }, // Dark background color
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2c2c2c", // Vertical grid lines color
        },
        horzLines: {
          color: "#2c2c2c", // Horizontal grid lines color
        },
      },
      priceScale: {
        borderColor: "#555", // Color of the border for the price scale
      },
      timeScale: {
        borderColor: "#555", // Color of the border for the time scale
      },
    });

    const barSeries = barChart.addBarSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    barSeriesRef.current = barSeries;
    barChart.timeScale().applyOptions({ timeVisible: true });

    // Baseline
    const baselineChart = createChart(baselineChartRef.current, {
      width: 1200,
      height: 400,
      layout: {
        background: { type: "solid", color: "black" }, // Dark background color
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2c2c2c", // Vertical grid lines color
        },
        horzLines: {
          color: "#2c2c2c", // Horizontal grid lines color
        },
      },
      priceScale: {
        borderColor: "#555", // Color of the border for the price scale
      },
      timeScale: {
        borderColor: "#555", // Color of the border for the time scale
      },
    });

    const baselineSeries = baselineChart.addBaselineSeries({
      baseValue: { type: "price", price: 25 },
      topLineColor: "rgba( 38, 166, 154, 1)",
      topFillColor1: "rgba( 38, 166, 154, 0.28)",
      topFillColor2: "rgba( 38, 166, 154, 0.05)",
      bottomLineColor: "rgba( 239, 83, 80, 1)",
      bottomFillColor1: "rgba( 239, 83, 80, 0.05)",
      bottomFillColor2: "rgba( 239, 83, 80, 0.28)",
    });
    baselineSeriesRef.current = baselineSeries;
    baselineChart.timeScale().applyOptions({ timeVisible: true });

    // Histogram
    const histogramChart = createChart(histogramChartRef.current, {
      width: 1200,
      height: 400,
      layout: {
        background: { type: "solid", color: "black" }, // Dark background color
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2c2c2c", // Vertical grid lines color
        },
        horzLines: {
          color: "#2c2c2c", // Horizontal grid lines color
        },
      },
      priceScale: {
        borderColor: "#555", // Color of the border for the price scale
      },
      timeScale: {
        borderColor: "#555", // Color of the border for the time scale
      },
    });

    const histogramSeries = histogramChart.addHistogramSeries({
      color: "#26a69a",
    });
    histogramSeriesRef.current = histogramSeries;
    histogramChart.timeScale().applyOptions({ timeVisible: true });

    // Area
    const lineChart = createChart(lineChartRef.current, {
      width: 1200,
      height: 400,
      layout: {
        background: { type: "solid", color: "black" }, // Dark background color
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2c2c2c", // Vertical grid lines color
        },
        horzLines: {
          color: "#2c2c2c", // Horizontal grid lines color
        },
      },
      priceScale: {
        borderColor: "#555", // Color of the border for the price scale
      },
      timeScale: {
        borderColor: "#555", // Color of the border for the time scale
      },
    });

    const lineSeries = lineChart.addLineSeries({
      lineColor: "#2962FF",
    });
    lineSeriesRef.current = lineSeries;
    lineChart.timeScale().applyOptions({ timeVisible: true });

    // Cleanup on unmount
    return () => {
      chart.remove();
    };
  }, []);

  // Candlestick, Bar
  useEffect(() => {
    // Connect to Binance WebSocket
    const binanceSocket_Kline = new WebSocket(
      `wss://stream.binance.com:9443/ws/${param}@kline_1s`
    );

    binanceSocket_Kline.onopen = () => {
      console.log("WebSocket connection for kline payload established.");
    };

    binanceSocket_Kline.onmessage = (event) => {
      const message = JSON.parse(event.data);
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

      // Update Candlestick chart data
      const candlestickData = {
        time: Math.floor(eventTime / 1000),
        open: parseFloat(openPrice),
        high: parseFloat(highPrice),
        low: parseFloat(lowPrice),
        close: parseFloat(closePrice),
      };

      if (candlestickSeriesRef.current) {
        candlestickSeriesRef.current.update(candlestickData);
      }

      // Update Bar chart data
      const barData = {
        open: parseFloat(openPrice),
        high: parseFloat(highPrice),
        low: parseFloat(lowPrice),
        close: parseFloat(closePrice),
        time: Math.floor(eventTime / 1000),
      };

      if (barSeriesRef.current) {
        barSeriesRef.current.update(barData);
      }
    };

    // Cleanup WebSocket on component unmount
    return () => {
      binanceSocket_Kline.close();
    };
  }, [param]);

  // Area, Baseline, Histogram, Line
  useEffect(() => {
    // Connect to Binance WebSocket
    const binanceSocket_Ticker = new WebSocket(
      `wss://stream.binance.com:9443/ws/${param}@ticker`
    );

    binanceSocket_Ticker.onopen = () => {
      console.log("WebSocket connection for ticker payload established.");
    };

    let previousLastPrice = null; // Initialize to null to indicate no prior price

    let previousPriceChange = null;
    let previousPriceMovementState = null;

    binanceSocket_Ticker.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const {
        e: eventType,
        E: eventTime,
        s: symbol,
        p: priceChange,
        P: priceChangePercent,
        c: lastPrice,
      } = message;

      // Determine the color for the histogram based on price comparison
      const color =
        previousLastPrice === null
          ? "#26a69a" // Default color for the first update (green)
          : lastPrice < previousLastPrice
          ? "#ef5350" // Red for price drop
          : "#26a69a"; // Green for price rise

      // Update the ref for the next message
      previousLastPrice = lastPrice;

      // Determine price movement state (UP/DOWN)
      let newPriceMovementState;
      if (previousPriceChange === null) {
        newPriceMovementState = null; // Initial state
      } else {
        if (priceChange === previousPriceChange) {
          newPriceMovementState = previousPriceMovementState; // Retain previous state
        } else {
          newPriceMovementState =
            priceChange < previousPriceChange ? "DOWN" : "UP";
        }
      }

      // Update previous variables for next iteration
      previousPriceChange = priceChange;
      previousPriceMovementState = newPriceMovementState;

      // Update the price movement state
      setPriceMovementState(newPriceMovementState);

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

      // Update area chart data
      const areaSeriesData = {
        value: parseFloat(lastPrice),
        time: Math.floor(eventTime / 1000),
      };

      if (areaSeriesRef.current) {
        areaSeriesRef.current.update(areaSeriesData);
      }

      // Update baseline chart data
      const baselineSeriesData = {
        value: parseFloat(lastPrice),
        time: Math.floor(eventTime / 1000),
      };

      if (baselineSeriesRef.current) {
        baselineSeriesRef.current.update(baselineSeriesData);
      }

      // Update histogram chart data
      const histogramSeriesData = {
        value: parseFloat(lastPrice),
        time: Math.floor(eventTime / 1000),
        color: color,
      };

      if (histogramSeriesRef.current) {
        histogramSeriesRef.current.update(histogramSeriesData);
      }
      // Update line chart data
      const lineSeriesData = {
        value: parseFloat(lastPrice),
        time: Math.floor(eventTime / 1000),
      };

      if (lineSeriesRef.current) {
        lineSeriesRef.current.update(lineSeriesData);
      }
    };

    // Cleanup WebSocket on component unmount
    return () => {
      binanceSocket_Ticker.close();
    };
  }, [param]);

  return (
    <div className="bg-black text-white grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {Object.keys(ticker).length > 0 && (
          <div className="">
            <h2 className="text-xl font-semibold">
              {Object.keys(ticker).map((symbol) => symbol.toUpperCase())}
            </h2>
            {Object.values(ticker).map((data, index) => (
              <div key={index} className="text-lg">
                <div>
                  {parseFloat(data.lastPrice).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div
                  className={
                    priceMovementState === "UP"
                      ? "text-green-500"
                      : priceMovementState === "DOWN"
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  <span className="mr-2">
                    {priceMovementState === "UP"
                      ? "↗"
                      : priceMovementState === "DOWN"
                      ? "↘"
                      : "N/A"}
                  </span>
                  <span>
                    {parseFloat(data.priceChange).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 4,
                    })}
                  </span>
                  <span className="px-2">
                    ({parseFloat(data.priceChangePercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-8">
          <div ref={areaChartRef}></div>
          <div ref={candlestickChartRef}></div>
          <div ref={barChartRef}></div>
          <div ref={baselineChartRef}></div>
          <div ref={histogramChartRef}></div>
          <div ref={lineChartRef}></div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
