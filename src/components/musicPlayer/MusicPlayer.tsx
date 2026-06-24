"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
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

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const shuffleArray = <T,>(arr: T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);


const MusicPlayer = ({ nasMode = false }: { nasMode?: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setIsMobileView(isMobile()); setMounted(true); }, []);
  const isPlayer = isMobileView || pathname === "/mp" || pathname === "/mp-cm";

  const { playMusics, playlistCategory, volume, setVolume, selectPlaylist, initSongs } =
    useMusicStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isFirstLoad = useRef(true);
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
  const [isInitializing, setIsInitializing] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekingRef = useRef(false);

  const realPlaylist = useMemo(
    () => (isShuffleOn ? shuffledPlaylist : playMusics),
    [isShuffleOn, shuffledPlaylist, playMusics],
  );

  const safeIndex =
    realPlaylist.length > 0 ? currentIndex % realPlaylist.length : 0;
  const currentMusic = realPlaylist[safeIndex];
  const isEmpty = realPlaylist.length === 0;

  const songInfo = isInitializing || (!songTitle && playMusics.length > 0)
    ? "로딩 중..."
    : songTitle
      ? `${songTitle} - ${songArtist}`
      : isPlayer
        ? "CM Music을 눌러 플레이리스트를 선택해주세요."
        : "쥬크박스에서 노래를 선택해주세요";

  useEffect(() => {
    initSongs().then(() => {
      const { playMusics, playlistCategory, selectPlaylist } =
        useMusicStore.getState();
      if (playlistCategory && playMusics.length === 0) {
        isFirstLoad.current = true;
        selectPlaylist(playlistCategory).then(() => setIsInitializing(false));
      } else {
        setIsInitializing(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShuffledPlaylist(shuffleArray(playMusics));
    setCurrentIndex(0);
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    } else if (playMusics.length > 0) {
      setIsPlaying(true);
    }
  }, [playMusics]);

  useEffect(() => {
    if (!nasMode || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, nasMode, currentIndex]);

  useEffect(() => {
    if (!nasMode || !audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume, nasMode]);

  useEffect(() => {
    if (!songTitle || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songTitle,
      artist: songArtist,
      album: "CM Music",
      artwork: currentMusic?.url ? [
        { src: `https://img.youtube.com/vi/${currentMusic.url}/mqdefault.jpg`, sizes: "320x180", type: "image/jpeg" },
        { src: `https://img.youtube.com/vi/${currentMusic.url}/hqdefault.jpg`, sizes: "480x360", type: "image/jpeg" },
      ] : [],
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => changeIndex(-1));
    navigator.mediaSession.setActionHandler("nexttrack", () => changeIndex(1));
    navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
    navigator.mediaSession.setActionHandler("pause", () => setIsPlaying(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songTitle, songArtist]);

  if (!mounted) return null;

  const changeIndex = (delta: number) => {
    if (realPlaylist.length === 0) return;
    setCurrentIndex((prev) => {
      const next = prev + delta;
      if (next < 0) return realPlaylist.length - 1;
      if (next >= realPlaylist.length) return 0;
      return next;
    });
    setIsPlayerReady(false);
    setPlayed(0);
    setPlayedSeconds(0);
    setDuration("00:00");
  };

  const seek = (val: number) => {
    seekingRef.current = true;
    setPlayed(val);
    if (nasMode && audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = val * audioRef.current.duration;
    } else {
      playerRef.current?.seekTo(val);
    }
    setTimeout(() => { seekingRef.current = false; }, 1000);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => seek(Number(e.target.value));

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

  const getUrl = (id?: string) => {
    if (!id) return undefined;
    if (nasMode) return `https://springdream0406.myqnapcloud.com:8081/${id}.mp3`;
    return `https://www.youtube.com/watch?v=${id}`;
  };

  const reactPlayerEl = (controls: boolean) => (
    <ReactPlayer
      ref={playerRef}
      url={getUrl(currentMusic?.url)}
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
        setTimeout(() => {
          const internal = playerRef.current?.getInternalPlayer?.();
          if (internal?.setVolume) internal.setVolume(useMusicStore.getState().volume);
        }, 300);
      }}
      onDuration={(dur: number) => { if (dur) setDuration(formatTime(dur)); }}
      onEnded={() => { changeIndex(1); setIsPlayerReady(false); setIsPlaying(true); }}
      onProgress={({ played, playedSeconds }: { played: number; playedSeconds: number }) => {
        if (seekingRef.current) return;
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
          <button onClick={() => changeIndex(-1)} disabled={!isPlayerReady || isEmpty || realPlaylist.length <= 1}>
            <FontAwesomeIcon icon={faBackwardStep} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => setIsPlaying(false)} disabled={isEmpty} className={!isPlaying ? activeCls : ""}>
            <FontAwesomeIcon icon={faPause} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => setIsPlaying(true)} disabled={isEmpty} className={isPlaying && !isLoading ? activeCls : ""}>
            <FontAwesomeIcon icon={isLoading ? faSpinner : faPlay} spin={isLoading} style={{ fontSize: "1em" }} />
          </button>
          <button onClick={() => changeIndex(1)} disabled={!isPlayerReady || isEmpty || realPlaylist.length <= 1}>
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
        <button onClick={() => changeIndex(-1)} disabled={!isPlayerReady || isEmpty || realPlaylist.length <= 1} className="sideMusic-btn">
          <FontAwesomeIcon icon={faBackwardStep}  />
        </button>
        <button onClick={() => setIsPlaying(false)} disabled={isEmpty} className={`sideMusic-btn ${!isPlaying ? "btn-active-side" : ""}`}>
          <FontAwesomeIcon icon={faPause}  />
        </button>
        <button onClick={() => setIsPlaying(true)} disabled={isEmpty} className={`sideMusic-btn ${isPlaying && !isLoading ? "btn-active-side" : ""}`}>
          <FontAwesomeIcon icon={isLoading ? faSpinner : faPlay} spin={isLoading}  />
        </button>
        <button onClick={() => changeIndex(1)} disabled={!isPlayerReady || isEmpty || realPlaylist.length <= 1} className="sideMusic-btn">
          <FontAwesomeIcon icon={faForwardStep}  />
        </button>
        <button onClick={() => setIsShuffleOn((p) => !p)} className={`sideMusic-btn ${isShuffleOn ? "btn-active-side" : ""}`}>
          <FontAwesomeIcon icon={faShuffle}  />
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
                <div className="h-full overflow-y-auto bg-black/65 rounded" ref={(el) => {
                  if (!el) return;
                  const active = el.querySelector("[data-active='true']") as HTMLElement;
                  if (active && el.scrollTop === 0) el.scrollTop = active.offsetTop - el.clientHeight / 2 + active.clientHeight / 2;
                }}>
                  {realPlaylist.map((music, index) => (
                    <button
                      key={index}
                      data-active={currentIndex === index}
                      onClick={() => { setCurrentIndex(index); setIsPlaying(true); setShowPlayingList(false); }}
                      className="w-full text-center py-3 hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer px-3"
                    >
                      <div className={`player-list-title font-medium truncate ${currentIndex === index ? "text-pink-300" : "text-white"}`}>{music.title}</div>
                      <div className="player-list-artist text-white/60 truncate">{music.artist}</div>
                    </button>
                  ))}
                </div>
              )}
              {/* 영상/썸네일 - 목록 안 띄울 때만 보임 */}
              <div style={{ height: showPlaylist || showPlayingList ? 0 : "100%", overflow: "hidden" }}>
                {nasMode && currentMusic?.url
                  ? <img src={`https://img.youtube.com/vi/${currentMusic.url}/hqdefault.jpg`} alt={songTitle} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                  : reactPlayerEl(false)
                }
              </div>
              {/* nasMode 오디오 플레이어 - native audio 태그 직접 사용 */}
              {nasMode && currentMusic?.url && (
                <audio
                  ref={audioRef}
                  src={getUrl(currentMusic.url)}
                  style={{ display: "none" }}
                  loop={realPlaylist.length === 1 || repeat}
                  onPlay={(e) => { const a = e.target as HTMLAudioElement; a.volume = useMusicStore.getState().volume / 100; setIsPlaying(true); setIsLoading(false); setIsPlayerReady(true); setSongTitle(currentMusic?.title || ""); setSongArtist(currentMusic?.artist || ""); }}
                  onPause={() => setIsPlaying(false)}
                  onWaiting={() => setIsLoading(true)}
                  onCanPlay={() => setIsLoading(false)}
                  onLoadedMetadata={(e) => {
                    const dur = (e.target as HTMLAudioElement).duration;
                    if (dur) setDuration(formatTime(dur));
                    setIsPlayerReady(true);
                    setSongTitle(currentMusic?.title || "");
                    setSongArtist(currentMusic?.artist || "");
                  }}
                  onSeeked={() => { seekingRef.current = false; }}
                  onEnded={() => { changeIndex(1); setIsPlaying(true); }}
                  onTimeUpdate={(e) => {
                    if (seekingRef.current) return;
                    const audio = e.target as HTMLAudioElement;
                    if (audio.duration) {
                      setPlayed(audio.currentTime / audio.duration);
                      setPlayedSeconds(audio.currentTime);
                    }
                  }}
                />
              )}
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
                  type="range" min={0} max={0.999999} step="any"
                  value={played}
                  onChange={handleSeek}
                  onTouchEnd={(e) => seek(Number((e.target as HTMLInputElement).value))}
                  disabled={isEmpty}
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
      {/* 흐르는 곡 정보 - 클릭 시 YouTube 영상 토글 */}
      <div
        className="flex-[3] flex items-center overflow-hidden cursor-pointer"
        onClick={() => isEmpty ? router.push("/jukebox") : setIsVideoOpen((p) => !p)}
      >
        <div className={`flow-text ${!isPlaying && !isEmpty ? "paused" : ""}`}>
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
      <div className="flex-[2] flex items-center px-3 gap-2 min-w-0 overflow-hidden">
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

      {/* 플레이어 - 항상 마운트, 열리면 보이게 / 닫히면 숨김 */}
      <div style={isVideoOpen
        ? { width: "100%", aspectRatio: "16/9" }
        : { position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none", overflow: "hidden" }
      }>
        {nasMode
          ? (isVideoOpen && currentMusic?.url
              ? <img src={`https://img.youtube.com/vi/${currentMusic.url}/hqdefault.jpg`} alt={songTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : null)
          : reactPlayerEl(isVideoOpen)
        }
      </div>
    </div>
  );
};

export default MusicPlayer;
