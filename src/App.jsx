import { useEffect, useState, useRef } from "react";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import UserModal from "./components/UserModal";
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./App.css";

export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [showModal, setShowModal] = useState(!localStorage.getItem("userName"));
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("himra");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Charger les chansons depuis l'API iTunes
  useEffect(() => {
    if (!query) return;

    const fetchSongs = async () => {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=18`
      );
      const data = await response.json();

      const formattedSongs = data.results.map((item) => ({
        id: item.trackId,
        titre: item.trackName,
        artiste: item.artistName,
        cover: item.artworkUrl100,
        audio: item.previewUrl,
      }));

      setSongs(formattedSongs);
    };

    fetchSongs();
  }, [query]);

  // Quand l'utilisateur choisit une chanson
  function handleSelectSong(song) {
    setCurrentSong(song);
    setIsPlaying(true);
  }

  // Quand l'utilisateur enregistre son nom
  const handleSaveUser = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
    setShowModal(false);
  };

  return (
    <div className="p-4">
      {showModal && <UserModal onSave={handleSaveUser} />}

      <header className="relative mb-6 p-4 bg-base-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">
          {userName ? (
            <>
              <span className="text-yellow-400">{userName}</span>'s Vibe
            </>
          ) : (
            "Your Vibe"
          )}
        </h1>

        <input
          type="text"
          className="input input-bordered input-md input-primary rounded-lg w-full my-3 p-3 bg-white text-black"
          placeholder="Rechercher une chanson ou un artiste..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <ThemeSwitcher className="absolute top-4 right-4" />
      </header>

      <SongList songs={songs} query={query} onSelect={handleSelectSong} />

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
    </div>
  );
}
