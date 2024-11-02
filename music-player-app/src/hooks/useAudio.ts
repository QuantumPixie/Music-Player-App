import { useRef, useEffect, useCallback } from "react";
import { getProgressFromTime } from "@/utils/time";
import { usePlayerControls } from "./usePlayerControls";

interface UseAudioProps {
  src?: string;
  isPlaying: boolean;
  volume: number;
  onEnd: () => void;
  onError: () => void;
  onTimeUpdate: (progress: number) => void;
}

export const useAudio = ({
  src,
  isPlaying,
  volume,
  onError,
  onTimeUpdate,
}: UseAudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const controls = usePlayerControls(audioRef);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      controls.play().catch(() => onError());
    } else {
      controls.pause();
    }
  }, [isPlaying, src, onError, controls]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;

    const progress = getProgressFromTime(
      audioRef.current.currentTime,
      audioRef.current.duration
    );
    onTimeUpdate(progress);
  }, [onTimeUpdate]);

  return {
    audioRef,
    ...controls,
    handleTimeUpdate,
  };
};
