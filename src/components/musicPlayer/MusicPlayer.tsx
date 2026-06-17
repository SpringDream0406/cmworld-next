"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useMusicStore } from "@/store";
import { playlists, IMusicData } from "@/data/musicData";
import { isMobile } from "@/utils";
import { Volume2, VolumeX, Repeat1 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faPause,
  faPlay,
  faForwardStep,
  faShuffle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

type PlayerRef = { seekTo: (amount: number, type?: string) => void };

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const shuffleArray = <T,>(arr: T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);

const MusicPlayer = () => {
  const pathname = usePathname();
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => { setIsMobileView(isMobile()); }, []);
  const isPlayer = isMobileView || pathname === "/musicplayer";

  const { playMusics, playlistCategory, volume, setVolume, selectPlaylist, initSongs } =
    useMusicStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState("00:00");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showPlayingList, setShowPlayingList] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState<IMusicData[]>([]);
  const [muted, setMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(70);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  const realPlaylist = useMemo(
    () => (isShuffleOn ? shuffledPlaylist : playMusics),
    [isShuffleOn, shuffledPlaylist, playMusics],
  );

  const safeIndex =
    realPlaylist.length > 0 ? currentIndex % realPlaylist.length : 0;
  const currentMusic = realPlaylist[safeIndex];
  const isEmpty = realPlaylist.length === 0;

  const songInfo = songTitle
    ? `${songTitle} - ${songArtist}`
    : isPlayer
      ? "CM Music을 눌러 플레이리스트를 선택해주세요."
      : "쥬크박스에서 노래를 선택해주세요";

  useEffect(() => {
    initSongs().then(() => {
      const { playMusics, playlistCategory, selectPlaylist } =
        useMusicStore.getState();
      if (playlistCategory && playMusics.length === 0) {
        selectPlaylist(playlistCategory);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShuffledPlaylist(shuffleArray(playMusics));
    setCurrentIndex(0);
    if (playMusics.length > 0) setIsPlaying(true);
  }, [playMusics]);

  const changeIndex = (delta: number) => {
    if (realPlaylist.length === 0) return;
    setCurrentIndex((prev) => {
      const next = prev + delta;
      if (next < 0) return realPlaylist.length - 1;
      if (next >= realPlaylist.length) return 0;
      return next;
    });
    setIsPlayerReady(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPlayed(val);
    playerRef.current?.seekTo(val, "fraction");
  };

  const handleMuteToggle = () => {
    if (!muted) {
      setPrevVolume(volume);
      setVolume(0);
      setMuted(true);
    } else {
      setVolume(prevVolume);
      setMuted(false);
    }
  };

  const reactPlayerEl = (controls: boolean) => (
    <ReactPlayer
      ref={playerRef}
      url={currentMusic?.url}
      playing={isPlaying}
      loop={realPlaylist.length === 1 || repeat}
      volume={volume / 100}
      width="100%"
      height="100%"
      controls={controls}
      onPlay={() => { setIsPlaying(true); setIsLoading(false); }}
      onPause={() => setIsPlaying(false)}
      onBuffer={() => setIsLoading(true)}
      onBufferEnd={() => setIsLoading(false)}
      onReady={() => {
        setIsPlayerReady(true);
        setIsLoading(false);
        setSongTitle(currentMusic?.title || "");
        setSongArtist(currentMusic?.artist || "");
        const dur = playerRef.current?.getDuration?.();
        if (dur) setDuration(formatTime(dur));
      }}
      onEnded={() => { changeIndex(1); setIsPlayerReady(false); }}
      onProgress={({ played, playedSeconds }: { played: number; playedSeconds: number }) => {
        setPlayed(played);
        setPlayedSeconds(playedSeconds);
      }}
    />
  );

  // 공통 컨트롤 버튼
  const controlButtons = (isLarge: boolean) => {
    if (isLarge) {
      // 풀 플레이어 버튼 (원본 .play-btns-p 구조)
      const activeCls = "btn-active-player";
      return (
        <div className="player-play-btns">
          <button onClick={() => changeIndex(-1)} disabled={!isPlayerReady || isEmpty}>
            <FontAwesomeIcon icon={faBackwardStep} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => setIsPlaying(false)} disabled={isEmpty} className={!isPlaying ? activeCls : ""}>
            <FontAwesomeIcon icon={faPause} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => setIsPlaying(true)} disabled={isEmpty} className={isPlaying && !isLoading ? activeCls : ""}>
            <FontAwesomeIcon icon={isLoading ? faSpinner : faPlay} spin={isLoading} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => changeIndex(1)} disabled={!isPlayerReady || isEmpty}>
            <FontAwesomeIcon icon={faForwardStep} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => setIsShuffleOn((p) => !p)} className={isShuffleOn ? activeCls : ""}>
            <FontAwesomeIcon icon={faShuffle} style={{ fontSize: "1em" }} />
          </button>
        </div>
      );
    }
    // 사이드 플레이어 버튼
    return (
      <div className="flex justify-around w-full h-full">
        <button onClick={() => changeIndex(-1)} disabled={!isPlayerReady || isEmpty} className="sideMusic-btn">
          <FontAwesomeIcon icon={faBackwardStep} style={{ fontSize: "1.5rem" }} />
        </button>
        <button onClick={() => setIsPlaying(false)} disabled={isEmpty} className={`sideMusic-btn ${!isPlaying ? "btn-active-side" : ""}`}>
          <FontAwesomeIcon icon={faPause} style={{ fontSize: "1.5rem" }} />
        </button>
        <button onClick={() => setIsPlaying(true)} disabled={isEmpty} className={`sideMusic-btn ${isPlaying && !isLoading ? "btn-active-side" : ""}`}>
          <FontAwesomeIcon icon={isLoading ? faSpinner : faPlay} spin={isLoading} style={{ fontSize: "1.5rem" }} />
        </button>
        <button onClick={() => changeIndex(1)} disabled={!isPlayerReady || isEmpty} className="sideMusic-btn">
          <FontAwesomeIcon icon={faForwardStep} style={{ fontSize: "1.5rem" }} />
        </button>
        <button onClick={() => setIsShuffleOn((p) => !p)} className={`sideMusic-btn ${isShuffleOn ? "btn-active-side" : ""}`}>
          <FontAwesomeIcon icon={faShuffle} style={{ fontSize: "1.5rem" }} />
        </button>
      </div>
    );
  };

  // ====== 풀 플레이어 모드 (/musicplayer) ======
  if (isPlayer) {
    return (
      <div className="w-full h-full player-bg">
        <div className="w-full h-full flex flex-col items-center bg-black/50 overflow-hidden">
          {/* TOP */}
          <div className="h-[10%] w-[90%] flex justify-between">
            {/* 반복 */}
            <div className="w-[10%] flex items-center">
              <button
                onClick={() => setRepeat((p) => !p)}
                className="border-none bg-transparent outline-none cursor-pointer"
                style={{ color: repeat ? "pink" : "rgba(255,255,255,0.6)" }}
              >
                <Repeat1 className="player-top-icon" />
              </button>
            </div>
            {/* CM Music */}
            <div className="w-[60%] flex">
              <button
                onClick={() => { setShowPlaylist((p) => !p); setShowPlayingList(false); }}
                className="player-cm-music-txt"
              >
                {playlistCategory
                  ? playlists[playlistCategory as keyof typeof playlists]
                  : "CM Music"}
              </button>
            </div>
            {/* 플레잉 리스트 아이콘 */}
            <div className="w-[10%] flex justify-end items-center">
              <button
                onClick={() => { setShowPlayingList((p) => !p); setShowPlaylist(false); }}
                className="border-none bg-transparent outline-none cursor-pointer"
                style={{ color: showPlayingList ? "pink" : "rgba(255,255,255,0.6)" }}
              >
                <svg className="player-playlist-icon" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="5" width="14" height="2" rx="1" />
                  <rect x="3" y="10" width="10" height="2" rx="1" />
                  <rect x="3" y="15" width="12" height="2" rx="1" />
                  <circle cx="19" cy="14" r="3" />
                  <path d="M19 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="h-[75%] w-[90%] flex flex-col">
            {/* 쇼박스 */}
            <div className="h-[65%]">
              {showPlaylist && (
                <div className="h-full overflow-y-auto bg-black/65 rounded">
                  {Object.entries(playlists).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => { selectPlaylist(key); setShowPlaylist(false); }}
                      className={`w-full text-center py-3 player-list-label text-white hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer ${playlistCategory === key ? "text-pink-300" : ""}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {showPlayingList && (
                <div className="h-full overflow-y-auto bg-black/65 rounded">
                  {realPlaylist.map((music, index) => (
                    <button
                      key={index}
                      onClick={() => { setCurrentIndex(index); setIsPlaying(true); setShowPlayingList(false); }}
                      className="w-full text-center py-3 hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer"
                    >
                      <div className={`player-list-title font-medium ${currentIndex === index ? "text-pink-300" : "text-white"}`}>{music.title}</div>
                      <div className="player-list-artist text-white/60">{music.artist}</div>
                    </button>
                  ))}
                </div>
              )}
              {/* YouTube 영상 - 목록 안 띄울 때만 보임, 오디오는 항상 재생 */}
              <div style={{ height: showPlaylist || showPlayingList ? 0 : "100%", overflow: "hidden" }}>
                {reactPlayerEl(false)}
              </div>
            </div>

            {/* 곡 정보 */}
            <div className="h-[15%] overflow-hidden cursor-pointer" onClick={() => { setShowPlayingList((p) => !p); setShowPlaylist(false); }}>
              {/* 모바일: 정적 타이틀/아티스트 */}
              <div className="song-info-mobile player-mobile-only">
                <div className="song-title" style={showPlayingList ? { color: "pink" } : {}}>
                  {songTitle}
                </div>
                <div className="song-artist" style={showPlayingList ? { color: "pink" } : {}}>
                  {songArtist}
                </div>
              </div>
              {/* 데스크탑: 흐르는 텍스트 */}
              <div className={`flow-text-player player-desktop-only h-full ${isPlaying ? "text-white" : "text-white/60 paused"} ${showPlayingList ? "!text-pink-300" : ""}`}>
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="flow-wrap-player">{songInfo}</div>
                ))}
              </div>
            </div>

            {/* 컨트롤 */}
            <div className="h-[20%] flex flex-col">
              <div className="player-play-bar">
                <span className="player-time">{formatTime(playedSeconds)}</span>
                <input
                  type="range" min={0} max={1} step={0.001} value={played}
                  onChange={handleSeek} disabled={isEmpty}
                  className="player-range h-1 disabled:opacity-40"
                />
                <span className="player-time">{duration}</span>
              </div>
              {controlButtons(true)}
            </div>
          </div>

          {/* 볼륨 - CSS로 모바일(≤480px) 숨김 처리 */}
          <div className="player-volume-bar">
            <button onClick={handleMuteToggle} className="text-white/80 hover:text-white shrink-0">
              {muted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
            <input
              type="range" min={0} max={100} value={muted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
              className="flex-1 h-1 accent-white"
            />
            <span className="text-white text-xs w-7 text-right shrink-0">{muted ? 0 : volume}</span>
          </div>
        </div>
      </div>
    );
  }

  // ====== 사이드 플레이어 모드 ======
  return (
    <div className="w-full rounded-2xl bg-[whitesmoke] flex flex-col py-2 gap-1 relative" style={{ minHeight: "100%" }}>
      {/* YouTube 오디오 플레이어 - 영상 닫혀있을 때 숨김 */}
      <div style={isVideoOpen
        ? { display: "none" }
        : { position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none", overflow: "hidden" }
      }>
        {reactPlayerEl(false)}
      </div>

      {/* 흐르는 곡 정보 - 클릭 시 YouTube 영상 토글 */}
      <div
        className="flex-[3] flex items-center overflow-hidden cursor-pointer"
        onClick={() => setIsVideoOpen((p) => !p)}
      >
        <div className={`flow-text ${!isPlaying ? "paused" : ""}`}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flow-wrap">{songInfo}</div>
          ))}
        </div>
      </div>

      {/* 팝업: 플레이리스트 / 플레잉리스트 */}
      {(showPlaylist || showPlayingList) && (
        <div className="absolute inset-x-0 top-[30%] bottom-[25%] bg-white shadow-lg overflow-y-auto z-10">
          {showPlaylist &&
            Object.entries(playlists).map(([key, label]) => (
              <button
                key={key}
                onClick={() => { selectPlaylist(key); setShowPlaylist(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs border-none bg-transparent hover:bg-gray-100 cursor-pointer ${playlistCategory === key ? "text-[#6e2c17] font-bold" : ""}`}
              >
                {label}
              </button>
            ))}
          {showPlayingList &&
            realPlaylist.map((music, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); setIsPlaying(true); setShowPlayingList(false); }}
                className={`w-full text-left px-3 py-1 border-none bg-transparent hover:bg-gray-100 cursor-pointer ${currentIndex === index ? "text-[#6e2c17] font-bold" : ""}`}
              >
                <div className="text-xs truncate">{music.title}</div>
                <div className="text-[0.65rem] text-gray-500 truncate">{music.artist}</div>
              </button>
            ))}
        </div>
      )}

      {/* 컨트롤 버튼 */}
      <div className="flex-[3]">
        {controlButtons(false)}
      </div>

      {/* 볼륨 슬라이더 */}
      <div className="flex-[2] flex items-center px-3 gap-2">
        <button onClick={handleMuteToggle} className="border-none bg-transparent outline-none cursor-pointer shrink-0">
          {muted || volume === 0 ? <VolumeX size={18} className="text-gray-500" /> : <Volume2 size={18} />}
        </button>
        <input
          type="range" min={0} max={100} value={muted ? 0 : volume}
          onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
          className="flex-1 h-1"
          style={{ accentColor: '#6e2c17' }}
        />
        <span className="text-xs text-gray-600 w-7 text-right shrink-0 tabular-nums">{muted ? 0 : volume}</span>
      </div>

      {/* YouTube 영상 - 곡 정보 클릭 시 토글 */}
      {isVideoOpen && (
        <div className="w-full mt-1" style={{ aspectRatio: "16/9" }}>
          {reactPlayerEl(true)}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
