import { useState, useCallback, useEffect } from "react";
import type {
  DiagnosisState,
  AnimalResult,
  NumerologyResult,
  CoreParams,
  JobMatchResult,
} from "@/types/diagnosis";
import {
  getAnimalResult,
  getNumerologyResult,
  calculateCoreParams,
  matchJob,
} from "@/lib/diagnosis";

const STORAGE_KEY = "diagnosis-state";

const initialState: DiagnosisState = {
  currentStep: 1,
  birthday: null,
  animalResult: null,
  numerologyResult: null,
  occupation: null,
  skillAnswers: {},
  coreParams: null,
  jobResult: null,
};

function loadState(): DiagnosisState {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return initialState;
}

export function useDiagnosis() {
  const [state, setState] = useState<DiagnosisState>(initialState);
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

  const submitBirthday = useCallback(
    (year: number, month: number, day: number) => {
      const animalResult = getAnimalResult(year, month, day);
      const numerologyResult = getNumerologyResult(year, month, day);

      setState((prev) => ({
        ...prev,
        birthday: { year, month, day },
        animalResult,
        numerologyResult,
      }));
    },
    []
  );

  const goToStep2 = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: 2 }));
  }, []);

  const setOccupation = useCallback((occupation: string) => {
    setState((prev) => ({ ...prev, occupation }));
  }, []);

  const setSkillAnswer = useCallback((questionId: string, value: number) => {
    setState((prev) => ({
      ...prev,
      skillAnswers: { ...prev.skillAnswers, [questionId]: value },
    }));
  }, []);

  const submitSkills = useCallback(() => {
    setState((prev) => {
      if (!prev.animalResult || !prev.numerologyResult) return prev;

      const coreParams = calculateCoreParams(
        prev.skillAnswers,
        prev.animalResult,
        prev.numerologyResult
      );

      const jobResult = matchJob(
        coreParams,
        prev.animalResult,
        prev.numerologyResult
      );

      return {
        ...prev,
        currentStep: 3,
        coreParams,
        jobResult,
      };
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
    submitBirthday,
    goToStep2,
    setOccupation,
    setSkillAnswer,
    submitSkills,
    reset,
  };
}
