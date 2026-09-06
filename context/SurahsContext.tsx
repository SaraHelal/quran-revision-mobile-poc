import { mockMemorizationRecords } from "@/data/mockMemorizationRecords";
import { surahCatalog } from "@/data/surahCatalog";
import type {
  MasteryStatus,
  MemorizationRecord,
  MemorizedSurah
} from "@/types";
import { buildMemorizedSurahs } from "@/utils/buildMemorizedSurahs";
import { calculateNextReviewDate } from "@/utils/reviewSchedule";
import { createContext, useContext, useState } from "react";

type SurahsContextType = {
  surahs: MemorizedSurah[];
  successMsg: string | null;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>;
  saveRevision: (surahId: number, updatedStatus: MasteryStatus) => void;
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
  const [records, setRecords] = useState<MemorizationRecord[]>(
    mockMemorizationRecords,
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const memorizedSurahs = buildMemorizedSurahs(records, surahCatalog);
  const saveRevision = (surahId: number, updatedStatus: MasteryStatus) => {
    const reviewedAt = new Date();
    const nextReviewDate = calculateNextReviewDate(updatedStatus, reviewedAt);
    setRecords((prevSurahs) =>
      prevSurahs.map((prevSurah) => {
        if (prevSurah.id === surahId) {
          return {
            ...prevSurah,
            status: updatedStatus,
            nextReviewDate,
            lastReviewDate: reviewedAt.toISOString(),
          };
        }
        return prevSurah;
      }),
    );
    console.log(surahId, updatedStatus, reviewedAt, nextReviewDate);
  };
  return (
    <SurahsContext.Provider
      value={{
        surahs: memorizedSurahs,
        successMsg,
        setSuccessMsg,
        saveRevision,
      }}
    >
      {children}
    </SurahsContext.Provider>
  );
}
