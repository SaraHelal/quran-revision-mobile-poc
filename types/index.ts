export type MasteryStatus = "Weak" | "Good" | "Excellent";

export type ReviewMode = "suggested" | "manual";

export type SurahMetadata = {
  readonly surahNumber: number;
  readonly surahName: string;
  readonly arabicName: string;
  readonly juzNumbers: readonly number[];
};

export type MemorizationRecord = {
  id: number;
  surahNumber: number;
  status: MasteryStatus;
  lastReviewDate: string | null;
  nextReviewDate: string | null;
};

export type MemorizedSurah = SurahMetadata & MemorizationRecord;
