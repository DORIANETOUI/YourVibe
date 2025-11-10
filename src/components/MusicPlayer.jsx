import { useRef, useEffect, useState } from "react";

export default function MusicPlayer({ currentSong, isPlaying, setIsPlaying, audioRef }) {
  const [progress, setProgress] = useState(0);        // % d’avancement
  const [currentTime, setCurrentTime] = useState(0);  // temps actuel
  const [duration, setDuration] = useState(0);        // durée totale

  // 🔄 Met à jour la source audio quand la chanson change
  useEffect(() => {
    if (currentSong?.audio && audioRef.current) {
      audioRef.current.src = currentSong.audio;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  // ▶️ / ⏸️ Gère lecture et pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // ⏱️ Suivi du temps et progression
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

  // 🕹️ Lecture manuelle : déplacer le curseur
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
    <div className="fixed bottom-4 left-3 -translate-x-3 bg-base-200 rounded-lg shadow-lg p-4 flex flex-col items-center gap-2 w-[90%] md:w-96 bg-yellow-200">

      {/* 🎵 Infos chanson */}
      <div className="text-center w-full">
        <p className="font-bold text-sm truncate">{currentSong?.titre || "Aucune chanson"}</p>
        <p className="text-xs text-gray-600 truncate">{currentSong?.artiste || "-"}</p>
      </div>

      {/* 🕹️ Barre de progression */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="range range-xs range-warning w-full"
      />
      <div className="w-full flex justify-between text-[11px] text-gray-700">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* ▶️ / ⏸️ Bouton de lecture */}
      <button className="btn btn-sm btn-primary mt-2" onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <audio ref={audioRef} />
    </div>
  );
}
