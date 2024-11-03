import { CSSProperties } from "react";
import "./Slider.css";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  step: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
  style?: CSSProperties;
  "aria-label"?: string;
}

const Slider = ({
  value,
  onChange,
  max,
  step,
  className = "",
  orientation = "horizontal",
  style,
  "aria-label": ariaLabel,
  ...rest
}: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const safeValue = !isNaN(value) ? value : 0;

  return (
    <div
      className={`slider-container ${orientation} ${className}`}
      style={style}
    >
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={safeValue}
        onChange={handleChange}
        className={`slider ${orientation}`}
        aria-label={ariaLabel}
        {...rest}
      />
    </div>
  );
};

export default Slider;
