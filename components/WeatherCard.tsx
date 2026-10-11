"use client";

import React, { useEffect, useState } from "react";
import { CloudSun, Navigation } from "lucide-react";

interface WeatherState {
  temp: string;
  humidity: string;
  warning: string;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [gps, setGps] = useState<string>("定位中...");

  useEffect(() => {
    // 1. 天氣 API
    fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc")
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: `${data.temperature.data[0].value}°C`,
          humidity: `${data.humidity.data[0].value}%`,
          warning: data.warningMessage ? data.warningMessage[0] : "無特別警告",
        });
      })
      .catch(() => setWeather(null));

    // 2. GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGps(`${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`),
        () => setGps("定位失敗/未授權")
      );
    }
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center shadow-md">
      <div>
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
          <CloudSun className="w-4 h-4" /> 即時天氣 (香港天文台)
        </div>
        <div className="text-xl font-bold mt-1">
          {weather ? `${weather.temp} | 濕度 ${weather.humidity}` : "載入中..."}
        </div>
        <div className="text-xs text-slate-400 mt-1">⚠️ {weather?.warning}</div>
      </div>
      <div className="text-right text-xs text-emerald-400 flex flex-col items-end">
        <Navigation className="w-4 h-4 mb-1 animate-pulse" />
        <span>📍 GPS 位置</span>
        <span className="text-[10px] text-slate-400">{gps}</span>
      </div>
    </div>
  );
}