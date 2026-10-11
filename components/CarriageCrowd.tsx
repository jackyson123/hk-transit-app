"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Users, ThermometerSnowflake } from "lucide-react";

interface Report {
  car_number: number;
  crowd_level: string;
  ac_status: string;
}

export default function CarriageCrowd() {
  const [reports, setReports] = useState<Record<number, Report>>({});

  // 1. Fetch Supabase 數據
  const fetchReports = async () => {
    const { data } = await supabase
      .from("crowd_reports")
      .select("*")
      .eq("route_code", "TKL")
      .order("created_at", { ascending: false });

    if (data) {
      const latestMap: Record<number, Report> = {};
      data.forEach((r) => {
        if (!latestMap[r.car_number]) latestMap[r.car_number] = r;
      });
      setReports(latestMap);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 2. 用戶即時報料
  const submitReport = async (carNum: number, crowd: string, ac: string) => {
    await supabase.from("crowd_reports").insert([
      {
        transport_type: "MTR",
        route_code: "TKL",
        car_number: carNum,
        crowd_level: crowd,
        ac_status: ac,
      },
    ]);
    fetchReports();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
      <div className="flex justify-between items-center text-sm font-semibold text-cyan-400">
        <span className="flex items-center gap-2">
          <ThermometerSnowflake className="w-4 h-4" /> 車廂人流與冷氣避人群 (將軍澳綫)
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((carNum) => {
          const report = reports[carNum];
          const isCrowded = report?.crowd_level === "high";
          const isAcWeak = report?.ac_status === "weak";

          return (
            <div
              key={carNum}
              className={`p-2 rounded-lg border text-center transition ${
                isCrowded
                  ? "bg-rose-950/60 border-rose-600 text-rose-200"
                  : "bg-emerald-950/60 border-emerald-600 text-emerald-200"
              }`}
            >
              <div className="text-xs font-bold">{carNum} 卡</div>
              <div className="text-[10px] my-1 opacity-80">
                {isCrowded ? "極擠迫" : "有空位"} | {isAcWeak ? "冷氣弱" : "夠涼"}
              </div>
              <button
                onClick={() => submitReport(carNum, "high", "weak")}
                className="text-[9px] bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded text-slate-300 border border-slate-600"
              >
                報料:迫/熱
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}