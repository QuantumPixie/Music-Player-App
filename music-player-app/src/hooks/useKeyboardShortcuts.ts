import { useEffect, useCallback } from "react";

type ShortcutHandler = (event: KeyboardEvent) => void;

interface Shortcuts {
  [key: string]: ShortcutHandler;
}

const isInputElement = (target: EventTarget | null): boolean => {
  if (!target) return false;

  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
};

export const useKeyboardShortcuts = (shortcuts: Shortcuts) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isInputElement(event.target)) return;

      const shortcut = shortcuts[event.code];
      if (shortcut) {
        event.preventDefault();
        shortcut(event);
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
