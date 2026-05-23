"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_SKIN, isSkinId, nextSkin, SkinId } from "@/lib/skins";

type SkinCtx = {
  skin: SkinId;
  setSkin: (s: SkinId) => void;
  cycle: () => void;
};

const Ctx = createContext<SkinCtx>({
  skin: DEFAULT_SKIN,
  setSkin: () => {},
  cycle: () => {},
});

const KEY = "flc-skin";

export function SkinProvider({ children }: { children: React.ReactNode }) {
  const [skin, setSkinState] = useState<SkinId>(DEFAULT_SKIN);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (isSkinId(stored)) setSkinState(stored);
  }, []);

  const setSkin = useCallback((s: SkinId) => {
    setSkinState(s);
    document.documentElement.setAttribute("data-skin", s);
    try {
      localStorage.setItem(KEY, s);
    } catch {}
  }, []);

  const cycle = useCallback(() => {
    setSkin(nextSkin(skin));
  }, [skin, setSkin]);

  return (
    <Ctx.Provider value={{ skin, setSkin, cycle }}>{children}</Ctx.Provider>
  );
}

export function useSkin() {
  return useContext(Ctx);
}
