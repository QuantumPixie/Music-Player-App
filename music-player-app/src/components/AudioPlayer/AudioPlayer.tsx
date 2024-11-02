import { useEffect, useState } from "react";
import { SongList } from "../SongList/SongList";
import { FavoritesList } from "../FavoritesList/FavoritesList";
import { Controls } from "../Controls/Controls";
import { HelpModal } from "../HelpModal/HelpModal";
import { Tabs } from "../Tabs/Tabs";
import { useSearch } from "@/hooks/useSearch";
import { Song } from "@/types/music";
import { toast } from "sonner";
import { Search, HelpCircle, Library, Heart } from "lucide-react";
import { MESSAGES } from "@/constants";
import Button from "../Button/Button";
import "./AudioPlayer.css";

const TABS = [
  { id: "all", label: "All Songs", icon: <Library className="h-4 w-4" /> },
  { id: "favorites", label: "Favorites", icon: <Heart className="h-4 w-4" /> },
];

const AudioPlayer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const { searchQuery, setSearchQuery, filteredSongs } = useSearch(songs);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/songs.json");
        if (!response.ok) {
          throw new Error(MESSAGES.ERRORS.SONGS_LOAD);
        }
        const data = await response.json();
        setSongs(data);
        setIsLoading(false);
        toast.success(MESSAGES.SUCCESS.SONGS_LOADED);
      } catch (error) {
        console.error("Error loading songs:", error);
        toast.error(MESSAGES.ERRORS.SONGS_LOAD);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <h1 className="title">TuneCloud</h1>
          <Button
            variant="secondary"
            onClick={() => setIsHelpOpen(true)}
            className="help-button"
            aria-label="Show help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>

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

        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : activeTab === "all" ? (
          <SongList songs={filteredSongs} />
        ) : (
          <FavoritesList allSongs={filteredSongs} />
        )}
      </div>
      <Controls />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default AudioPlayer;
