import { NextResponse } from "next/server";

const GWANGJU_LAT = 35.1595;
const GWANGJU_LON = 126.8526;

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "No API key" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${GWANGJU_LAT}&lon=${GWANGJU_LON}&appid=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    const data = await res.json();
    const weatherMain: string = data?.weather?.[0]?.main ?? "";
    return NextResponse.json({ weatherMain });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
