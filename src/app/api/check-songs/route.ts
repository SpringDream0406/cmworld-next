import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const { data: allSongs } = await supabase
    .from("songs")
    .select("id,url,title,artist")
    .eq("is_active", true);

  if (!allSongs) return NextResponse.json({ error: "songs fetch failed" }, { status: 500 });

  // 숫자만인 건 NAS, 나머지가 유튜브 ID
  const songs = allSongs.filter((s) => !/^\d+$/.test(s.url));

  // 50개씩 배치로 YouTube API 호출
  const unavailable = [];
  for (let i = 0; i < songs.length; i += 50) {
    const batch = songs.slice(i, i + 50);
    const ids = batch.map((s) => s.url).join(",");

    const res = await fetch(`${YOUTUBE_API_URL}?part=status&id=${ids}&key=${API_KEY}`);
    const data = await res.json();

    const returnedIds = new Set((data.items ?? []).map((item: { id: string }) => item.id));

    for (const song of batch) {
      const item = (data.items ?? []).find((v: { id: string; status: { privacyStatus: string } }) => v.id === song.url);
      if (!returnedIds.has(song.url)) {
        // API 응답에 없으면 삭제된 영상
        unavailable.push({ ...song, reason: "삭제됨" });
      } else if (item?.status?.privacyStatus !== "public") {
        unavailable.push({ ...song, reason: `비공개/미등록 (${item.status.privacyStatus})` });
      }
    }
  }

  return NextResponse.json({ unavailable, total: songs.length });
}
