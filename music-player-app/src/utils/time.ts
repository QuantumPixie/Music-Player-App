export const formatTime = (time: number): string => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getProgressFromTime = (
  currentTime: number,
  duration: number
): number => {
  const progress = (currentTime / duration) * 100;
  return isNaN(progress) ? 0 : progress;
};

export const getTimeFromProgress = (
  progress: number,
  duration: number
): number => {
  return (progress / 100) * duration;
};

export const getProgressFromMouseEvent = (
  event: React.MouseEvent<HTMLDivElement>,
  duration: number
): { progress: number; time: number } => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const progress = (x / bounds.width) * 100;
  const time = getTimeFromProgress(progress, duration);
  return { progress, time };
};
