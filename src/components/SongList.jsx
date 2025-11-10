// 🎶 SongList.jsx
import SongCard from "./SongCard";

export default function SongList({ songs, query, onSelect }) {
  const filteredSongs = songs.filter(
    (song) =>
      song.artiste.toLowerCase().includes(query.toLowerCase()) ||
      song.titre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 justify-items-center px-2">
      {filteredSongs.map((song) => (
        <div key={song.id} className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-xs">
          <SongCard song={song} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
