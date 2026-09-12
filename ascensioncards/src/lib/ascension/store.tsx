import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AscensionState, Focus, HabitCard } from "./types";
import { deckForFocus } from "./seed";
import { loadState, saveState } from "./storage";
import { completeCard, todayKey, type CompletionResult } from "./progress";

const INITIAL: AscensionState = {
  onboarded: false,
  focus: null,
  xp: 0,
  freezes: 2,
  reducedMotion: false,
  cards: [],
};

interface StoreValue {
  state: AscensionState;
  ready: boolean;
  chooseFocus: (focus: Focus) => void;
  finishOnboarding: () => void;
  complete: (cardId: string) => CompletionResult | null;
  addCard: (card: Omit<HabitCard, "streak" | "longestStreak" | "totalCompletions" | "lastCompleted" | "history" | "effects" | "archived">) => void;
  updateCard: (id: string, patch: Partial<HabitCard>) => void;
  archiveCard: (id: string) => void;
  setReducedMotion: (value: boolean) => void;
  reset: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function AscensionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AscensionState>(INITIAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadState().then((saved) => {
      if (!active) return;
      if (saved) setState({ ...INITIAL, ...saved });
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (ready) void saveState(state);
  }, [state, ready]);

  const chooseFocus = useCallback((focus: Focus) => {
    setState((prev) => ({ ...prev, focus, cards: prev.cards.length ? prev.cards : deckForFocus(focus) }));
  }, []);

  const finishOnboarding = useCallback(() => {
    setState((prev) => ({ ...prev, onboarded: true }));
  }, []);

  const complete = useCallback((cardId: string): CompletionResult | null => {
    let result: CompletionResult | null = null;
    setState((prev) => {
      const card = prev.cards.find((c) => c.id === cardId);
      if (!card) return prev;
      const outcome = completeCard(card, { today: todayKey(), freezesAvailable: prev.freezes });
      if (!outcome) return prev;
      result = outcome;
      return {
        ...prev,
        xp: prev.xp + outcome.xpGained,
        freezes: Math.max(0, prev.freezes - (outcome.freezeUsed ? 1 : 0)),
        cards: prev.cards.map((c) => (c.id === cardId ? outcome.card : c)),
      };
    });
    return result;
  }, []);

  const addCard: StoreValue["addCard"] = useCallback((seed) => {
    setState((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          ...seed,
          streak: 0,
          longestStreak: 0,
          totalCompletions: 0,
          lastCompleted: null,
          history: [],
          effects: [],
          archived: false,
        },
      ],
    }));
  }, []);

  const updateCard = useCallback((id: string, patch: Partial<HabitCard>) => {
    setState((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const archiveCard = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, archived: true } : c)),
    }));
  }, []);

  const setReducedMotion = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, reducedMotion: value }));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  const value = useMemo<StoreValue>(
    () => ({
      state,
      ready,
      chooseFocus,
      finishOnboarding,
      complete,
      addCard,
      updateCard,
      archiveCard,
      setReducedMotion,
      reset,
    }),
    [state, ready, chooseFocus, finishOnboarding, complete, addCard, updateCard, archiveCard, setReducedMotion, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAscension(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAscension must be used inside AscensionProvider");
  return ctx;
}

export function useMotionAllowed(): boolean {
  const { state } = useAscension();
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return !state.reducedMotion && !systemReduced;
}
