import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SongList from './components/SongList'
import MusicPlayer from './components/MusicPlayer'
import UserModal from './components/UserModal'
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function App() {

    const [userName, setUserName] = useState("");

    const [songs, setSongs]= useState ([])

    const [query, setQuery]= useState ("himra")

    const [currentSong, setCurrentSong]= useState (null)

    const [isPlaying, setIsPlaying] = useState(false);
  
    const audioRef = useRef(null);

    function App() {
  useEffect(() => {
    // appliquer le thème par défaut ou depuis localStorage
    document.body.setAttribute('data-theme', 'light'); // ou 'dark'
  }, []);
}

    useEffect(() => {
        const savedName = localStorage.getItem("userName");
        if (savedName) {
            setUserName(savedName);
        }
        }, []);


   useEffect(() => {
        if (!query) return;

        const fetchSongs = async () => {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=18`
        );
        const data = await response.json();

        // On simplifie les données pour ton app
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
        
    function handleSelectSong (song){
        setCurrentSong (song)
        setIsPlaying(true); 

    }

    const handleSaveName = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

    return (
        <div className='p-8'>
            <header className="relative mb-6 p-4 bg-base-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">
                    {userName ? 
                        <>
                            <span className="text-yellow-400">{userName}</span>'s Vibe
                        </>
                    : "Your Vibe"}
                </h1>   

                <input 
                    type="text" 
                    className="input input-bordered input-md input-primary rounded-lg w-full my-3 p-3 focus:ring focus:ring-blue-200 bg-white text-black"
                    placeholder='Rechercher une chanson ou un artiste...' 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />

                <ThemeSwitcher  />
            </header>


            <SongList 
                songs={songs} 
                query={query} 
                onSelect={handleSelectSong}
            />

            <MusicPlayer 
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
            />

        </div>
    )

}














