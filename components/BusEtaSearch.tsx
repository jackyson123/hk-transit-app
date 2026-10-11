"use client";

import React, { useState } from "react";
import { Search, Bus } from "lucide-react";

interface ETAItem {
  route: string;
  dest: string;
  eta: string;
}

export default function BusEtaSearch() {
  const [inputRoute, setInputRoute] = useState("");
  const [etaList, setEtaList] = useState<ETAItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputRoute) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/eta?route=${inputRoute.toUpperCase()}`);
      const result = await res.json();

      if (result.data) {
        const formatted = result.data.slice(0, 4).map((item: any) => ({
          route: item.route,
          dest: item.dest_tc,
          eta: item.eta
            ? new Date(item.eta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "無班次 / 已過站",
        }));
        setEtaList(formatted);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
        <Bus className="w-4 h-4" /> 九巴 / 路線 ETA 快速查詢
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="輸入路線 (如: 98D, 290A, 1A)"
          value={inputRoute}
          onChange={(e) => setInputRoute(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
        >
          <Search className="w-4 h-4" /> {loading ? "搜尋中..." : "查 ETA"}
        </button>
      </div>

      <div className="space-y-2 pt-2">
        {etaList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50"
          >
            <div>
              <span className="font-bold text-amber-400 mr-2">[{item.route}]</span>
              <span className="text-xs text-slate-300">往 {item.dest}</span>
            </div>
            <div className="text-sm font-mono font-bold text-emerald-400">{item.eta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}