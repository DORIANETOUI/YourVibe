import MusicPlayer from "./MusicPlayer";
import SongCard from "./SongCard";


export default function SongList ({songs, query, onSelect}) {
const filteredSongs = songs.filter (
    song => 
        song.artiste.toLowerCase().includes(query.toLowerCase()) ||
        song.titre.toLowerCase().includes(query.toLowerCase())

);

    return(
        <div className="grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {filteredSongs.map( song => (
                    <SongCard key={song.id} 
                    song={song}
                    onSelect={onSelect}
                    />
            ))}
        </div>
    )
}
