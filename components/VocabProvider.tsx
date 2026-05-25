"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  VocabItem,
  Grade,
  loadVocab,
  saveVocab,
  addWord as addWordPure,
  removeWord as removeWordPure,
  grade as gradePure,
  hasWord,
  dueCount,
  VOCAB_EVENT,
} from "@/lib/vocab";

type VocabCtx = {
  ready: boolean;
  items: VocabItem[];
  dueCount: number;
  has: (word: string) => boolean;
  add: (input: {
    word: string;
    translation: string;
    level: string;
    note?: string;
    source?: string;
  }) => boolean;
  remove: (id: string) => void;
  gradeItem: (id: string, g: Grade) => void;
  clearAll: () => void;
  replaceAll: (next: VocabItem[]) => void;
};

const Ctx = createContext<VocabCtx>({
  ready: false,
  items: [],
  dueCount: 0,
  has: () => false,
  add: () => false,
  remove: () => {},
  gradeItem: () => {},
  clearAll: () => {},
  replaceAll: () => {},
});

export function VocabProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<VocabItem[]>([]);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setItems(loadVocab());
    setReady(true);

    function onChange() {
      setItems(loadVocab());
    }
    function onStorage(e: StorageEvent) {
      if (e.key && e.key !== "flc-vocab") return;
      setItems(loadVocab());
    }
    window.addEventListener(VOCAB_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    const tick = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      window.removeEventListener(VOCAB_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
      window.clearInterval(tick);
    };
  }, []);

  const commit = useCallback((next: VocabItem[]) => {
    setItems(next);
    saveVocab(next);
  }, []);

  const add: VocabCtx["add"] = useCallback(
    (input) => {
      let added = false;
      setItems((prev) => {
        if (hasWord(prev, input.word)) return prev;
        const next = addWordPure(prev, input);
        saveVocab(next);
        added = true;
        return next;
      });
      return added;
    },
    []
  );

  const remove = useCallback(
    (id: string) => commit(removeWordPure(items, id)),
    [commit, items]
  );

  const gradeItem = useCallback(
    (id: string, g: Grade) => {
      const next = items.map((i) => (i.id === id ? gradePure(i, g) : i));
      commit(next);
    },
    [commit, items]
  );

  const clearAll = useCallback(() => commit([]), [commit]);
  const replaceAll = useCallback((next: VocabItem[]) => commit(next), [commit]);

  const value = useMemo<VocabCtx>(
    () => ({
      ready,
      items,
      dueCount: dueCount(items, now),
      has: (w: string) => hasWord(items, w),
      add,
      remove,
      gradeItem,
      clearAll,
      replaceAll,
    }),
    [ready, items, now, add, remove, gradeItem, clearAll, replaceAll]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useVocab() {
  return useContext(Ctx);
}
