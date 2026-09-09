export type MasteryStatus = "Weak" | "Good" | "Excellent";

export type ReviewMode = "suggested" | "manual";

export type ReviewTiming = "overdue" | "dueToday";

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
  createdAt: string;
};

export type MemorizedSurah = SurahMetadata & MemorizationRecord;
