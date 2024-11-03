import { useState, useCallback, useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

export const useVolumeControl = () => {
  const { volume, setVolume } = usePlayerStore();
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = useCallback(
    (value: number) => {
      setVolume(value / 100);
    },
    [setVolume]
  );

  // clicking outside of volume control
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

  return {
    volume,
    isOpen,
    controlRef,
    setIsOpen,
    handleVolumeChange,
  };
};
