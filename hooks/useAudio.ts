"use client";

import { useEffect, useRef, useState } from "react";

export function useAudioController() {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const scanSoundRef = useRef<HTMLAudioElement | null>(null);

  const [muted, setMuted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    bgMusicRef.current = new Audio(
      "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3"
    );
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    scanSoundRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
    );

    const unlockAudio = () => {
      if (!muted && bgMusicRef.current?.paused) {
        bgMusicRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("click", unlockAudio, { once: true });

    return () => {
      bgMusicRef.current?.pause();
      scanSoundRef.current?.pause();
      window.removeEventListener("click", unlockAudio);
    };
  }, [muted]);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      if (next) {
        bgMusicRef.current?.pause();
      } else {
        bgMusicRef.current?.play().catch(() => {});
      }
      return next;
    });
  };

  const playScanSound = () => {
    if (!muted) {
      scanSoundRef.current?.play().catch(() => {});
    }
  };

  return {
    muted,
    toggleMute,
    playScanSound,
  };
}
