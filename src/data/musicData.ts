export type TPlaylistKey =
  | "Total"
  | "Cyworld"
  | "Feeling"
  | "Tensionup"
  | "Groove"
  | "Working"
  | "Favorite"
  | "Rainy"
  | "Nolyrics"
  | "Pick2026"
  | "Pick2025"
  | "Pick2024"
  | "Before2024";

export interface IMusicData {
  url: string;
  artist: string;
  title: string;
  playlists: TPlaylistKey[];
}

export const playlists: Record<TPlaylistKey, string> = {
  Total: "음악 전체",
  Cyworld: "싸이월드 감성",
  Feeling: "감성 & 느낌",
  Tensionup: "텐션 올려!!",
  Groove: "그루브 좀 타볼까~",
  Working: "노동요~",
  Favorite: "춘몽's Pick!",
  Rainy: "비오는 날..",
  Nolyrics: "가사가 없는?!",
  Pick2026: "2026 Pick",
  Pick2025: "2025 Pick",
  Pick2024: "2024 Pick",
  Before2024: "Before 2024 Pick",
};
