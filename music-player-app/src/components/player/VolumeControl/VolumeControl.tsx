import { Volume2 } from "lucide-react";
import Slider from "../../common/Slider/Slider";
import { usePlayerStore } from "@/store/usePlayerStore";
import "./VolumeControl.css";

export const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore();

  const handleVolumeChange = (value: number) => {
    setVolume(value / 100);
  };

  return (
    <div className="volume-control">
      <Volume2 className="controls-icon" />
      <Slider
        value={volume * 100}
        onChange={handleVolumeChange}
        max={100}
        step={1}
        orientation="horizontal"
        className="volume-slider"
        aria-label="Volume"
      />
    </div>
  );
};
