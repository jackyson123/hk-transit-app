"use client";

import React, { useState } from "react";
import { Calculator } from "lucide-react";

export default function FareCalculator() {
  const [hasTapOut, setHasTapOut] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);

  // 邏輯算盤：正價 $10.5，雙向分段扣 $3.7，轉乘優惠扣 $4.2
  let fare = 10.5;
  if (hasTapOut) fare -= 3.7;
  if (isTransfer) fare = Math.max(0, fare - 4.2);

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
        <Calculator className="w-4 h-4" /> 雙向分段與轉乘車費計算器
      </div>

      <div className="space-y-2 text-xs">
        <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-2 rounded">
          <input
            type="checkbox"
            checked={hasTapOut}
            onChange={(e) => setHasTapOut(e.target.checked)}
            className="rounded text-amber-500 focus:ring-0"
          />
          <span>落車有拍卡機 (享用雙向分段回扣)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-2 rounded">
          <input
            type="checkbox"
            checked={isTransfer}
            onChange={(e) => setIsTransfer(e.target.checked)}
            className="rounded text-amber-500 focus:ring-0"
          />
          <span>150 分鐘內轉乘指定路線 (扣減 $4.2)</span>
        </label>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm">
        <span className="text-slate-400">預計應付車費：</span>
        <span className="text-xl font-bold font-mono text-amber-400">${fare.toFixed(1)}</span>
      </div>
    </div>
  );
}