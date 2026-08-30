export type MasteryStatus = "Weak" | "Good" | "Excellent";

export type Surah = {
  id: number;
  surahName: string;
  surahNumber: number;
  status: MasteryStatus;
};
