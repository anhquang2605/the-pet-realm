import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) {
        callback();
      }
    }

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [ref, callback]);
}