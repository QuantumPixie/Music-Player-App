import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song, PlayerState } from "@/types/music";
import { CONFIG } from "@/constants";

interface PlayerStore extends PlayerState {
  setCurrentSong: (song: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  playNextSong: () => void;
  playPreviousSong: () => void;
}

const getSongByIndex = async (currentId?: string) => {
  try {
    const response = await fetch("/songs.json");
    const songs: Song[] = await response.json();

    const currentIndex = currentId
      ? songs.findIndex((song) => song.id === currentId)
      : -1;

    return (offset: number) => {
      if (currentIndex === -1) return songs[0];
      return songs[(currentIndex + offset + songs.length) % songs.length];
    };
  } catch (error) {
    console.error("Error loading songs:", error);
    return null;
  }
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      currentSong: undefined,
      isPlaying: false,
      volume: CONFIG.DEFAULT_VOLUME,
      progress: 0,
      favorites: [],

      setCurrentSong: (song) => set({ currentSong: song }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
      setProgress: (progress) => set({ progress }),

      toggleFavorite: (songId) =>
        set((state) => ({
          favorites: state.favorites.includes(songId)
            ? state.favorites.filter((id) => id !== songId)
            : [...state.favorites, songId],
        })),

      isFavorite: (songId) => get().favorites.includes(songId),

      playNextSong: async () => {
        const state = get();
        if (!state.currentSong) return;

        const getNext = await getSongByIndex(state.currentSong.id);
        if (getNext) {
          set({
            currentSong: getNext(1),
            isPlaying: true,
          });
        }
      },

      playPreviousSong: async () => {
        const state = get();
        if (!state.currentSong) return;

        const getPrevious = await getSongByIndex(state.currentSong.id);
        if (getPrevious) {
          set({
            currentSong: getPrevious(-1),
            isPlaying: true,
          });
        }
      },
    }),
    {
      name: "player-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        volume: state.volume,
      }),
    }
  )
);
