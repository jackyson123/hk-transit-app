import React from "react";
import WeatherCard from "../components/WeatherCard";
import BusEtaSearch from "../components/BusEtaSearch";
import CarriageCrowd from "../components/CarriageCrowd";
import FareCalculator from "../components/FareCalculator";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <WeatherCard />
      <BusEtaSearch />
      <CarriageCrowd />
      <FareCalculator />
    </div>
  );
}
