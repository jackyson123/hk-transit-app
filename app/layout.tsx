import "./globals.css";
import React from "react";

export const metadata = {
  title: "HK Transit & Crowd Radar | 香港即時交通避人群",
  description: "結合九巴/城巴/港鐵即時 ETA、車廂冷氣人流報料與天氣導航",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4">
        <header className="w-full max-w-md my-4 text-center border-b border-slate-800 pb-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            🚌 港鐵/巴士避人群雷達
          </h1>
          <p className="text-xs text-slate-400 mt-1">即時 ETA · 車廂冷氣報料 · 天氣資訊</p>
        </header>
        <main className="w-full max-w-md space-y-4">{children}</main>
      </body>
    </html>
  );
}