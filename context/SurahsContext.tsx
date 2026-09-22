import { mockMemorizationRecords } from "@/data/mockMemorizationRecords";
import { surahCatalog } from "@/data/surahCatalog";
import {
  loadMemorizationRecords,
  saveMemorizationRecords,
} from "@/services/memorizationStorage";
import type {
  MasteryStatus,
  MemorizationRecord,
  MemorizedSurah,
} from "@/types";
import { buildMemorizedSurahs } from "@/utils/buildMemorizedSurahs";
import { calculateNextReviewDate } from "@/utils/reviewSchedule";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
type AddSurahInput = {
  surahNumber: number;
  status: MasteryStatus;
  memorizedAt: string;
};
type UpdateSurahInput = {
  status: MasteryStatus;
  memorizedAt: string;
};
type SurahsContextType = {
  surahs: MemorizedSurah[];
  successMsg: string | null;
  isLoading: boolean;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>;
  saveRevision: (
    surahId: number,
    updatedStatus: MasteryStatus,
  ) => Promise<void>;
  addSurah: (input: AddSurahInput) => Promise<void>;
  deleteSurah: (surahId: number) => Promise<void>;
  updateSurah: (surahId: number, updates: UpdateSurahInput) => Promise<void>;
  storageError: string | null;
  clearStorageError: () => void;
};

export const SurahsContext = createContext<SurahsContextType | undefined>(
  undefined,
);

export function useSurahs() {
  const context = useContext(SurahsContext);

  if (!context) {
    throw new Error("useSurahs must be used within a SurahsProvider");
  }

  return context;
}

export function SurahsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<MemorizationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const clearStorageError = useCallback(() => {
    setStorageError(null);
  }, []);
  useEffect(() => {
    async function hydrateRecords() {
      try {
        const storedRecords = await loadMemorizationRecords();

        if (storedRecords === null) {
          setRecords(mockMemorizationRecords);
          await saveMemorizationRecords(mockMemorizationRecords);
        } else {
          setRecords(storedRecords);
        }
      } catch (error) {
        console.error("Failed to load memorization records:", error);

        setStorageError(
          "We couldn't load your saved Surahs. Please restart the app.",
        );

        setRecords(mockMemorizationRecords);
      } finally {
        setIsLoading(false);
      }
    }

    void hydrateRecords();
  }, []);

  const memorizedSurahs = buildMemorizedSurahs(records, surahCatalog);
  const persistRecords = async (
    updatedRecords: MemorizationRecord[],
  ): Promise<void> => {
    try {
      await saveMemorizationRecords(updatedRecords);
      setRecords(updatedRecords);
      setStorageError(null);
    } catch (error) {
      setStorageError("We couldn't save your changes. Please try again.");

      throw error;
    }
  };
  const saveRevision = async (
    surahId: number,
    updatedStatus: MasteryStatus,
  ): Promise<void> => {
    const reviewedAt = new Date();
    const nextReviewDate = calculateNextReviewDate(updatedStatus, reviewedAt);

    const updatedRecords = records.map((record) =>
      record.id === surahId
        ? {
            ...record,
            status: updatedStatus,
            nextReviewDate,
            lastReviewDate: reviewedAt.toISOString(),
          }
        : record,
    );

    await persistRecords(updatedRecords);
  };

  const addSurah = async ({
    surahNumber,
    status,
    memorizedAt,
  }: AddSurahInput): Promise<void> => {
    const alreadyExists = records.some(
      (record) => record.surahNumber === surahNumber,
    );

    if (alreadyExists) {
      return;
    }

    const nextId = Math.max(0, ...records.map((record) => record.id)) + 1;

    const newRecord: MemorizationRecord = {
      id: nextId,
      surahNumber,
      status,
      memorizedAt,
      lastReviewDate: null,
      nextReviewDate: null,
      createdAt: new Date().toISOString(),
    };

    const updatedRecords = [...records, newRecord];

    await saveMemorizationRecords(updatedRecords);
    setRecords(updatedRecords);
  };
  const deleteSurah = async (surahId: number): Promise<void> => {
    const updatedRecords = records.filter((record) => record.id !== surahId);

    await saveMemorizationRecords(updatedRecords);
    setRecords(updatedRecords);
  };

  const updateSurah = async (
    surahId: number,
    updates: UpdateSurahInput,
  ): Promise<void> => {
    const updatedRecords = records.map((record) =>
      record.id === surahId
        ? {
            ...record,
            ...updates,
          }
        : record,
    );

    await saveMemorizationRecords(updatedRecords);
    setRecords(updatedRecords);
  };

  return (
    <SurahsContext.Provider
      value={{
        surahs: memorizedSurahs,
        successMsg,
        storageError,
        isLoading,
        setSuccessMsg,
        clearStorageError,
        saveRevision,
        addSurah,
        deleteSurah,
        updateSurah,
      }}
    >
      {children}
    </SurahsContext.Provider>
  );
}
