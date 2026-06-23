import { NextRequest, NextResponse } from "next/server";

const NAS_BASE = "https://springdream0406.myqnapcloud.com:8081";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const range = req.headers.get("range") ?? undefined;
  const nasUrl = `${NAS_BASE}/${id}.mp3`;

  let nasRes: Response;
  try {
    nasRes = await fetch(nasUrl, {
      headers: range ? { Range: range } : {},
    });
  } catch (e) {
    console.error("NAS fetch error:", e);
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "audio/mpeg");
  headers.set("Accept-Ranges", "bytes");
  const contentRange = nasRes.headers.get("content-range");
  const contentLength = nasRes.headers.get("content-length");
  if (contentRange) headers.set("Content-Range", contentRange);
  if (contentLength) headers.set("Content-Length", contentLength);

  return new NextResponse(nasRes.body, {
    status: nasRes.status,
    headers,
  });
}
