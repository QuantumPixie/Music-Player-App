import { RefObject, useCallback } from "react";
import { toast } from "sonner";
import { MESSAGES } from "@/constants";

export const usePlayerControls = (audioRef: RefObject<HTMLAudioElement>) => {
  const play = useCallback(async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      toast.error(MESSAGES.ERRORS.AUDIO_PLAY);
      return false;
    }
    return true;
  }, [audioRef]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioRef]);

  const seekTo = useCallback(
    (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
    [audioRef]
  );

  const skipForward = useCallback(
    (seconds: number = 10) => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + seconds,
        audioRef.current.duration
      );
      toast.info(MESSAGES.INFO.SKIP_FORWARD(seconds));
    },
    [audioRef]
  );

  const skipBackward = useCallback(
    (seconds: number = 10) => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - seconds,
        0
      );
      toast.info(MESSAGES.INFO.SKIP_BACKWARD(seconds));
    },
    [audioRef]
  );

  return {
    play,
    pause,
    seekTo,
    skipForward,
    skipBackward,
  };
};
