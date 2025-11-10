export default function SongCard({ song, onSelect }) {
  return (
    <div 
      className="card bg-base-100 w-full max-w-xs shadow-sm hover:shadow-lg hover:scale-105 transition-transform cursor-pointer shadow-yellow-100 shadow-sm hover:shadow-yellow-300 transition-shadow"
      onClick={() => onSelect(song)}
    >
      {/* Cover */}
      <figure>
        <img 
          src={song.cover} 
          alt={song.titre} 
          className="object-cover h-40 w-full rounded-t-lg" 
        />
      </figure>

      {/* Body */}
      <div className="card-body p-3">
        <h2 className="card-title text-sm truncate">{song.titre}</h2>
        <p className="text-xs text-gray-500 truncate">{song.artiste}</p>
        <div className="card-actions justify-end mt-2">
        </div>
      </div>
    </div>
  );
}
