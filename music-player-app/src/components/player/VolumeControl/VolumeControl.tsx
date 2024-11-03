import { Volume2 } from "lucide-react";
import Slider from "../../common/Slider/Slider";
import { useVolumeControl } from "@/hooks/useVolumeControl";
import "./VolumeControl.css";

export const VolumeControl = () => {
  const { volume, isOpen, controlRef, setIsOpen, handleVolumeChange } =
    useVolumeControl();

  return (
    <div className="volume-control" ref={controlRef}>
      <div className="desktop-volume">
        <Volume2 className="controls-icon" />
        <Slider
          value={volume * 100}
          onChange={handleVolumeChange}
          max={100}
          step={1}
          orientation="horizontal"
          aria-label="Volume"
        />
      </div>

      <div className="mobile-volume">
        <button
          className="volume-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Volume control"
        >
          <Volume2 className="controls-icon" />
        </button>

        <div className={`volume-slider-popup ${isOpen ? "show" : ""}`}>
          <div className="volume-slider-wrapper">
            <Slider
              value={volume * 100}
              onChange={handleVolumeChange}
              max={100}
              step={1}
              orientation="vertical"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
