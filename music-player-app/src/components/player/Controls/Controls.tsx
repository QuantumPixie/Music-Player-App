import { useCallback } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useAudio } from "@/hooks/useAudio";
import { PlaybackControls } from "../PlaybackControls/PlaybackControls";
import { VolumeControl } from "../VolumeControl/VolumeControl";
import Slider from "../../common/Slider/Slider";
import { formatTime, getProgressFromMouseEvent } from "@/utils/time";
import { CONFIG } from "@/constants";
import "./Controls.css";

export const Controls = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    setIsPlaying,
    setProgress,
    playNextSong,
    playPreviousSong,
  } = usePlayerStore();

  const { audioRef, handleTimeUpdate, skipForward, skipBackward, seekTo } =
    useAudio({
      src: currentSong?.audioUrl,
      isPlaying,
      volume,
      onEnd: playNextSong,
      onError: () => setIsPlaying(false),
      onTimeUpdate: setProgress,
    });

  useKeyboardShortcuts({
    Space: () => currentSong && setIsPlaying(!isPlaying),
    ArrowLeft: (event) =>
      currentSong &&
      (event.shiftKey ? skipBackward(CONFIG.SKIP_SECONDS) : playPreviousSong()),
    ArrowRight: (event) =>
      currentSong &&
      (event.shiftKey ? skipForward(CONFIG.SKIP_SECONDS) : playNextSong()),
  });

  const handleProgressClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current) return;

      const { progress, time } = getProgressFromMouseEvent(
        event,
        audioRef.current.duration
      );

      seekTo(time);
      setProgress(progress);
    },
    [seekTo, setProgress, audioRef]
  );

  if (!currentSong) return null;

  return (
    <div className="controls" role="region" aria-label="Music player controls">
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNextSong}
      />
      <div className="progress-container" onClick={handleProgressClick}>
        <Slider
          value={isNaN(progress) ? 0 : progress}
          onChange={(value) => setProgress(value)}
          max={100}
          step={0.1}
          aria-label="Progress"
        />
        <div className="time-display">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <span>{formatTime(audioRef.current?.duration || 0)}</span>
        </div>
      </div>
      <div className="controls-container">
        <div className="song-info">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="controls-cover"
          />
          <div className="controls-info">
            <h3 className="controls-title text-truncate">
              {currentSong.title}
            </h3>
            <p className="controls-artist text-truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>
        <div className="controls-main">
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={playNextSong}
            onPrevious={playPreviousSong}
          />
        </div>
        <VolumeControl />
      </div>
    </div>
  );
};
