import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Button from "../../common/Button/Button";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PlaybackControls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: PlaybackControlsProps) => {
  return (
    <div className="controls-buttons">
      <Button
        variant="secondary"
        onClick={onPrevious}
        aria-label="Previous song"
      >
        <SkipBack className="controls-icon" />
      </Button>
      <Button
        variant="secondary"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="controls-icon" />
        ) : (
          <Play className="controls-icon" />
        )}
      </Button>
      <Button variant="secondary" onClick={onNext} aria-label="Next song">
        <SkipForward className="controls-icon" />
      </Button>
    </div>
  );
};
