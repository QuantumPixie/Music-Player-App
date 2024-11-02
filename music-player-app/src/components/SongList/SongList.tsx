import { useCallback } from "react";
import { Song } from "@/types/music";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Heart, Play, Pause } from "lucide-react";
import Button from "../Button/Button";
import { toast } from "sonner";
import { MESSAGES } from "@/constants";
import "./SongList.css";

interface SongListProps {
  songs: Song[];
}

export const SongList = ({ songs }: SongListProps) => {
  const {
    currentSong,
    isPlaying,
    isFavorite,
    setCurrentSong,
    setIsPlaying,
    toggleFavorite,
  } = usePlayerStore();

  const handlePlayPause = useCallback(
    (song: Song) => {
      if (currentSong?.id === song.id) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentSong(song);
        setIsPlaying(true);
      }
    },
    [currentSong, isPlaying, setCurrentSong, setIsPlaying]
  );

  const handleFavoriteClick = useCallback(
    (song: Song) => {
      const wasInFavorites = isFavorite(song.id);
      toggleFavorite(song.id);
      toast.success(
        wasInFavorites
          ? MESSAGES.SUCCESS.REMOVED_FROM_FAVORITES(song.title)
          : MESSAGES.SUCCESS.ADDED_TO_FAVORITES(song.title)
      );
    },
    [toggleFavorite, isFavorite]
  );

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div key={song.id} className="song-item">
          <img src={song.coverUrl} alt={song.title} className="song-cover" />
          <div className="song-info">
            <h3 className="song-title text-truncate">{song.title}</h3>
            <p className="song-artist text-truncate">{song.artist}</p>
          </div>
          <div className="button-group">
            <Button
              variant="secondary"
              onClick={() => handleFavoriteClick(song)}
              className={`favorite-button ${
                isFavorite(song.id) ? "active" : ""
              }`}
              aria-label={
                isFavorite(song.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`heart-icon ${
                  isFavorite(song.id) ? "favorite" : ""
                }`}
                fill={isFavorite(song.id) ? "#ff4081" : "none"}
                color={isFavorite(song.id) ? "#ff4081" : "currentColor"}
              />
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePlayPause(song)}
              aria-label={
                currentSong?.id === song.id && isPlaying ? "Pause" : "Play"
              }
            >
              {currentSong?.id === song.id && isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
