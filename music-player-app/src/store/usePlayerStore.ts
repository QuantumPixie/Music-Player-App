import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song, PlayerState } from "../types/music";
import { songs } from "../data/songs";

interface PlayerStore extends PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  favorites: string[];

  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  playNextSong: () => void;
  playPreviousSong: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      currentSong: null,
      isPlaying: false,
      volume: 1,
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

      playNextSong: () =>
        set((state) => {
          if (!state.currentSong) return state;
          const currentIndex = songs.findIndex(
            (s) => s.id === state.currentSong?.id
          );
          const nextSong = songs[(currentIndex + 1) % songs.length];
          return { currentSong: nextSong, isPlaying: true };
        }),

      playPreviousSong: () =>
        set((state) => {
          if (!state.currentSong) return state;
          const currentIndex = songs.findIndex(
            (s) => s.id === state.currentSong?.id
          );
          const previousSong =
            songs[(currentIndex - 1 + songs.length) % songs.length];
          return { currentSong: previousSong, isPlaying: true };
        }),
    }),
    {
      name: "player-storage",
    }
  )
);
