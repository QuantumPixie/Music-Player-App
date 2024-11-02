import { useMemo } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { SongList } from "../SongList/SongList";
import { Song } from "@/types/music";

interface FavoritesListProps {
  allSongs: Song[];
}

export const FavoritesList = ({ allSongs }: FavoritesListProps) => {
  const favorites = usePlayerStore((state) => state.favorites);

  const favoriteSongs = useMemo(
    () => allSongs.filter((song) => favorites.includes(song.id)),
    [allSongs, favorites]
  );

  if (favoriteSongs.length === 0) {
    return (
      <div className="empty-favorites">
        <p>No favorite songs yet.</p>
        <p className="empty-subtitle">
          Click the heart icon on any song to add it to your favorites.
        </p>
      </div>
    );
  }

  return <SongList songs={favoriteSongs} />;
};
