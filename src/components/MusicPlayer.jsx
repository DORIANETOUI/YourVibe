import { useEffect, useState } from "react";

export default function MusicPlayer({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
}) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong?.audio && audioRef.current) {
      audioRef.current.src = currentSong.audio;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {/* espace vide pour ne pas cacher les cartes */}
      <div className="h-28 md:h-0"></div>

      <div
        className="
          fixed md:static
          bottom-0 left-0
          w-full md:w-[380px]
          md:rounded-2xl
          bg-base-200 md:bg-base-200/90
          border-t border-base-300 md:border md:shadow-lg
          p-3 md:p-4
          flex flex-col items-center
          backdrop-blur-md
          z-40
        "
      >
        {/* 🎵 Infos chanson */}
        <div className="flex items-center gap-3 w-full mb-2">
          {currentSong?.cover ? (
            <img
              src={currentSong.cover}
              alt="cover"
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-md"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs">
              🎵
            </div>
          )}

          <div className="flex-1 text-left">
            <p className="font-semibold text-sm truncate">
              {currentSong?.titre || "Aucune chanson"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentSong?.artiste || "-"}
            </p>
          </div>
        </div>

        {/* Barre de progression */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="range range-warning range-xs w-full"
        />
        <div className="w-full flex justify-between text-[10px] text-gray-600 mt-1 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Bouton play/pause */}
        <button
          onClick={togglePlay}
          className="btn btn-circle btn-sm btn-primary hover:scale-105 transition-transform"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>

        <audio ref={audioRef} />
      </div>
    </>
  );
}
