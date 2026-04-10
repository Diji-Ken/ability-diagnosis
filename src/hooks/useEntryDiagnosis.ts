import { useState, useEffect, useCallback } from "react";
import type { AnimalResult, NumerologyResult } from "@/types/diagnosis";
import { getAnimalResult, getNumerologyResult } from "@/lib/diagnosis";
import {
  computeQuickPersonality,
  type QuickPersonalityResult,
} from "@/lib/diagnosis/quick-personality";

export type EntryStep = 1 | 2 | 3;

export interface EntryDiagnosisState {
  step: EntryStep;
  birthday: { year: number; month: number; day: number } | null;
  animalResult: AnimalResult | null;
  numerologyResult: NumerologyResult | null;
  quickAnswers: Record<string, number>;
  quickResult: QuickPersonalityResult | null;
}

const STORAGE_KEY = "entry-diagnosis-state";

const initialState: EntryDiagnosisState = {
  step: 1,
  birthday: null,
  animalResult: null,
  numerologyResult: null,
  quickAnswers: {},
  quickResult: null,
};

function loadState(): EntryDiagnosisState {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return initialState;
}

export function useEntryDiagnosis() {
  const [state, setState] = useState<EntryDiagnosisState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const submitBirthday = useCallback((year: number, month: number, day: number) => {
    const animalResult = getAnimalResult(year, month, day);
    const numerologyResult = getNumerologyResult(year, month, day);
    setState((prev) => ({
      ...prev,
      step: 2,
      birthday: { year, month, day },
      animalResult,
      numerologyResult,
    }));
  }, []);

  const goToQuickPersonality = useCallback(() => {
    setState((prev) => ({ ...prev, step: 3 }));
  }, []);

  const setQuickAnswer = useCallback((questionId: string, optionIndex: number) => {
    setState((prev) => ({
      ...prev,
      quickAnswers: { ...prev.quickAnswers, [questionId]: optionIndex },
    }));
  }, []);

  const computeResult = useCallback(() => {
    setState((prev) => {
      const result = computeQuickPersonality(prev.quickAnswers);
      return { ...prev, quickResult: result };
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    state,
    hydrated,
    submitBirthday,
    goToQuickPersonality,
    setQuickAnswer,
    computeResult,
    reset,
  };
}
