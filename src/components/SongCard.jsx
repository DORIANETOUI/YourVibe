export default function SongCard ({song, onSelect}) {

    return(
        <div className="card bg-base-100 image-full max-w-xs w-full shadow-sm shadow-yellow-500 hover:shadow-lg hover:scale-105 transition-transform" onClick={() => onSelect(song)}>
            <figure>
                <img
                    src={song.cover}
                    alt={song.titre}
                    className="object-cover h-48 w-full rounded-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-warning">{song.titre}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-warning text-yellow-400 hover:text-black">{song.artiste}</button>
                </div>
            </div>
        </div>

    )
}
