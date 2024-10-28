import { useEffect, useState } from "react";
import { songs } from "../../data/songs";
import { SongList } from "../SongList/SongList";
import { Controls } from "../Controls/Controls";
import { toast } from "sonner";
import { Search } from "lucide-react";
import "./AudioPlayer.css";

const MusicPlayer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);

  useEffect(() => {
    const fetchSongs = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      toast.success("Songs loaded successfully!");
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const filtered = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchQuery]);

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">TuneCloud</h1>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="search-input"
          />
        </div>
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <SongList songs={filteredSongs} />
        )}
      </div>
      <Controls />
    </div>
  );
};

export default MusicPlayer;
