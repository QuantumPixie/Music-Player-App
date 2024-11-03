import { useState, useRef, useEffect } from "react";
import { Volume2 } from "lucide-react";
import Slider from "../../common/Slider/Slider";
import "./VolumeControl.css";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

export const VolumeControl = ({
  volume,
  onVolumeChange,
}: VolumeControlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        controlRef.current &&
        !controlRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleVolumeChange = (value: number) => {
    onVolumeChange(value);
  };

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
