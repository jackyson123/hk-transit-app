import React from "react";
import WeatherCard from "@/components/WeatherCard";
import BusEtaSearch from "@/components/BusEtaSearch";
import CarriageCrowd from "@/components/CarriageCrowd";
import FareCalculator from "@/components/FareCalculator";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. 天氣與 GPS */}
      <WeatherCard />

      {/* 2. 巴士/港鐵到站 ETA */}
      <BusEtaSearch />

      {/* 3. 車廂人流與冷氣避人群社群報料 */}
      <CarriageCrowd />

      {/* 4. 雙向分段與轉乘車費算盤 */}
      <FareCalculator />
    </div>
  );
}