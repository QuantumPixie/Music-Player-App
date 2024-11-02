import { useState, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import { Song } from "@/types/music";
import { CONFIG } from "@/constants";

export const useSearch = (songs: Song[]) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);

  const debouncedSetQuery = debounce(
    (query: string) => setDebouncedSearchQuery(query),
    CONFIG.DEBOUNCE_DELAY
  );

  useEffect(() => {
    debouncedSetQuery(searchQuery);
  }, [searchQuery, debouncedSetQuery]);

  useEffect(() => {
    const filtered = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [debouncedSearchQuery, songs]);

  return {
    searchQuery,
    setSearchQuery,
    filteredSongs,
  };
};
