"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundName = "tink" | "tock" | "shimmer";

type SoundCtx = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  play: (name: SoundName) => void;
};

const Ctx = createContext<SoundCtx>({
  enabled: false,
  setEnabled: () => {},
  play: () => {},
});

const KEY = "flc-sound";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored === "1") setEnabledState(true);
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {}
  }, []);

  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      const ac = ensureCtx();
      if (!ac) return;
      const now = ac.currentTime;

      const presets = {
        tink: { freq: 1480, decay: 0.18, gain: 0.06, type: "sine" as const },
        tock: { freq: 420, decay: 0.09, gain: 0.05, type: "triangle" as const },
        shimmer: { freq: 880, decay: 0.45, gain: 0.04, type: "sine" as const },
      };
      const p = presets[name];

      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, now);
      if (name === "shimmer") {
        osc.frequency.exponentialRampToValueAtTime(p.freq * 1.5, now + p.decay);
      }
      gain.gain.setValueAtTime(p.gain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);
      osc.connect(gain).connect(ac.destination);
      osc.start(now);
      osc.stop(now + p.decay + 0.02);
    },
    [enabled]
  );

  return (
    <Ctx.Provider value={{ enabled, setEnabled, play }}>{children}</Ctx.Provider>
  );
}

export function useSound() {
  return useContext(Ctx);
}
