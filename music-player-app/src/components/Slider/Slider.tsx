import "./Slider.css";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  step: number;
}

const Slider = ({ value, onValueChange, max, step }: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue)) {
      onValueChange([newValue]);
    }
  };

  // always have a valid number value
  const safeValue = !isNaN(value[0]) ? value[0] : 0;

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={safeValue}
        onChange={handleChange}
        className="slider"
      />
    </div>
  );
};

export default Slider;
