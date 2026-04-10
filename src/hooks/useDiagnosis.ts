import { useState, useCallback, useEffect } from "react";
import type {
  DiagnosisState,
  Track,
  Job,
  SkillCategory,
} from "@/types/diagnosis";
import {
  getAnimalResult,
  getNumerologyResult,
  calculateCoreParams,
  matchJob,
} from "@/lib/diagnosis";

interface UseDiagnosisOptions {
  track: Track;
  jobs: Job[];
  categories: SkillCategory[];
}

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

function storageKey(track: Track): string {
  return `diagnosis-state-${track}`;
}

function loadState(track: Track): DiagnosisState {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = sessionStorage.getItem(storageKey(track));
    if (saved) return JSON.parse(saved);
  } catch {}
  return initialState;
}

export function useDiagnosis({ track, jobs, categories }: UseDiagnosisOptions) {
  const [state, setState] = useState<DiagnosisState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState(track));
    setHydrated(true);
  }, [track]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(storageKey(track), JSON.stringify(state));
    } catch {}
  }, [state, hydrated, track]);

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
    [],
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
        prev.numerologyResult,
        categories,
      );

      const jobResult = matchJob(
        coreParams,
        prev.animalResult,
        prev.numerologyResult,
        jobs,
      );

      return {
        ...prev,
        currentStep: 3,
        coreParams,
        jobResult,
      };
    });
  }, [jobs, categories]);

  const reset = useCallback(() => {
    setState(initialState);
    try {
      sessionStorage.removeItem(storageKey(track));
    } catch {}
  }, [track]);

  // Prefill from entry diagnosis data (birthday + animal + numerology)
  const prefillFromEntry = useCallback(
    (data: {
      birthday: { year: number; month: number; day: number };
      animalResult: DiagnosisState["animalResult"];
      numerologyResult: DiagnosisState["numerologyResult"];
    }) => {
      setState((prev) => ({
        ...prev,
        birthday: data.birthday,
        animalResult: data.animalResult,
        numerologyResult: data.numerologyResult,
        currentStep: 2,
      }));
    },
    [],
  );

  return {
    state,
    submitBirthday,
    goToStep2,
    setOccupation,
    setSkillAnswer,
    submitSkills,
    reset,
    prefillFromEntry,
  };
}
