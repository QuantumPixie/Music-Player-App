import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../store/usePlayerStore";
import Button from "../Button/Button";
import Slider from "../Slider/Slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import "./Controls.css";

export const Controls = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    setIsPlaying,
    setVolume,
    setProgress,
    playNextSong,
    playPreviousSong,
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!currentSong) return;

      switch (event.code) {
        case "Space":
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (event.shiftKey && audioRef.current) {
            // Skip 10 seconds backward
            audioRef.current.currentTime = Math.max(
              audioRef.current.currentTime - 10,
              0
            );
          } else {
            playPreviousSong();
          }
          break;
        case "ArrowRight":
          event.preventDefault();
          if (event.shiftKey && audioRef.current) {
            // Skip 10 seconds forward
            audioRef.current.currentTime = Math.min(
              audioRef.current.currentTime + 10,
              audioRef.current.duration
            );
          } else {
            playNextSong();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSong, isPlaying, setIsPlaying, playNextSong, playPreviousSong]);

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    const time = (percentage / 100) * audioRef.current.duration;

    audioRef.current.currentTime = time;
    setProgress(percentage);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      if (!isNaN(currentProgress)) {
        setProgress(currentProgress);
      }
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentSong) return null;

  return (
    <div className="controls">
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNextSong}
        onError={(error) => {
          console.error("Audio error:", error);
          setIsPlaying(false);
        }}
      />
      <div className="controls-container">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="controls-cover"
        />
        <div className="controls-info">
          <h3 className="controls-title">{currentSong.title}</h3>
          <p className="controls-artist">{currentSong.artist}</p>
        </div>
        <div className="controls-buttons">
          <Button variant="secondary" onClick={playPreviousSong}>
            <SkipBack className="controls-icon" />
          </Button>
          <Button variant="secondary" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause className="controls-icon" />
            ) : (
              <Play className="controls-icon" />
            )}
          </Button>
          <Button variant="secondary" onClick={playNextSong}>
            <SkipForward className="controls-icon" />
          </Button>
        </div>
        <div className="volume-control">
          <Volume2 className="controls-icon" />
          <Slider
            value={[volume * 100]}
            onValueChange={(value: number[]) => setVolume(value[0] / 100)}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="progress-container" onClick={handleProgressClick}>
        <Slider
          value={[isNaN(progress) ? 0 : progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={0.1}
        />
        <div className="time-display">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <span>{formatTime(audioRef.current?.duration || 0)}</span>
        </div>
      </div>
    </div>
  );
};
