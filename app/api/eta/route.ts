import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const route = searchParams.get("route");

  if (!route) {
    return NextResponse.json({ error: "Route parameter is required" }, { status: 400 });
  }

  try {
    // 呼叫九巴官方 Open API
    const res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-eta/${route}/1`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 10 }, // 快取 10 秒
    });

    if (!res.ok) throw new Error("Failed to fetch KMB API");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}