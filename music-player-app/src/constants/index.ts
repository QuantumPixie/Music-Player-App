export const MESSAGES = {
  ERRORS: {
    AUDIO_LOAD: "Failed to load audio",
    AUDIO_PLAY: "Failed to play audio",
    GENERIC: "Something went wrong",
    SONGS_LOAD: "Failed to load songs",
  },
  SUCCESS: {
    SONGS_LOADED: "Songs loaded successfully",
    ADDED_TO_FAVORITES: (title: string) => `Added ${title} to favorites`,
    REMOVED_FROM_FAVORITES: (title: string) =>
      `Removed ${title} from favorites`,
  },
  INFO: {
    SKIP_FORWARD: (seconds: number) => `Skipped ${seconds} seconds forward`,
    SKIP_BACKWARD: (seconds: number) => `Skipped ${seconds} seconds backward`,
  },
};

export const CONFIG = {
  SKIP_SECONDS: 10,
  DEBOUNCE_DELAY: 300,
  DEFAULT_VOLUME: 1,
  VOLUME_STEP: 0.1,
  MIN_SCREEN_WIDTH: 320,
};
