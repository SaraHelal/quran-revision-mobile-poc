import { mockSurahs } from "@/data/mockSurahs";
import type { Surah } from "@/types";
import { createContext, useContext, useState } from "react";
type SurahsContextType = {
  surahs: Surah[];
  setSurahs: React.Dispatch<React.SetStateAction<Surah[]>>;
  successMsg: string | null;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [surahs, setSurahs] = useState<Surah[]>(mockSurahs);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  return (
    <SurahsContext.Provider
      value={{ surahs, setSurahs, successMsg, setSuccessMsg }}
    >
      {children}
    </SurahsContext.Provider>
  );
}
