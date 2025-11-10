// 🎵 SongCard.jsx
export default function SongCard({ song, onSelect }) {
  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden w-full h-full"
      onClick={() => onSelect(song)}
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-52 md:h-56">
        <img
          src={song.cover}
          alt={song.titre}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Corps */}
      <div className="p-4 flex flex-col items-center text-center">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 leading-tight line-clamp-2">
          {song.titre}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">{song.artiste}</p>
      </div>
    </div>
  );
}
