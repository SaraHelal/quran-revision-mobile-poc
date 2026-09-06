import type {
    MemorizationRecord,
    MemorizedSurah,
    SurahMetadata,
} from "@/types";

export const buildMemorizedSurahs = (
  records: readonly MemorizationRecord[],
  catalog: readonly SurahMetadata[],
): MemorizedSurah[] => {
  const memorizedSurahs = records.map((record) => {
    const surahNumber = record.surahNumber;
    const extendedSurahData: SurahMetadata | undefined = catalog.find(
      (item) => item.surahNumber === surahNumber,
    );
    if (!extendedSurahData) {
      throw new Error(
        `No surah metadata found for surah number ${surahNumber}`,
      );
    }
    return { ...record, ...extendedSurahData };
  });
  return memorizedSurahs;
};
