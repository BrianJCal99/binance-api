"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tickers, setTickers] = useState({}); // Object to store data for all symbols

  useEffect(() => {
    const symbols = ["xrpusdt", "btcusdt", "ethusdt"]; // Add more symbols as needed
    const streams = symbols.map((symbol) => `${symbol}@ticker`).join("/");
    const binanceSocket = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    binanceSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { s: symbol, ...data } = message.data; // Extract symbol and other data

      // Update the state for the corresponding symbol
      setTickers((prevTickers) => ({
        ...prevTickers,
        [symbol]: data,
      }));
    };

    // Cleanup WebSocket on component unmount
    return () => {
      binanceSocket.close();
    };
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Symbol
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Price Change
                </th>
                <th scope="col" className="px-6 py-3">
                  Price Change %
                </th>
                <th scope="col" className="px-6 py-3">
                  High Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Low Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Volume
                </th>
                <th scope="col" className="px-6 py-3">
                  Best Bid
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Best Ask
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tickers).map(([symbol, data]) => (
                <tr
                  key={symbol}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {symbol.toUpperCase()}
                  </th>
                  <td className="px-6 py-4">{parseFloat(data.c)}</td>
                  <td className="px-6 py-4">{parseFloat(data.p)}</td>
                  <td className="px-6 py-4">{data.P}%</td>
                  <td className="px-6 py-4">{parseFloat(data.h)}</td>
                  <td className="px-6 py-4">{parseFloat(data.l)}</td>
                  <td className="px-6 py-4">{parseFloat(data.v)}</td>
                  <td className="px-6 py-4">{parseFloat(data.b)}</td>
                  <td className="px-6 py-4">{parseFloat(data.B)}</td>
                  <td className="px-6 py-4">{parseFloat(data.a)}</td>
                  <td className="px-6 py-4">{parseFloat(data.A)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
