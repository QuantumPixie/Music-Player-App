export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

export interface PlayerState {
  currentSong?: Song;
  isPlaying: boolean;
  volume: number;
  progress: number;
  favorites: string[];
}
