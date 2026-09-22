import AsyncStorage from "@react-native-async-storage/async-storage";

import type { MemorizationRecord } from "@/types";

const MEMORIZATION_RECORDS_KEY = "quran-revision:memorization-records";

export async function saveMemorizationRecords(
  records: MemorizationRecord[],
): Promise<void> {
  const serializedRecords = JSON.stringify(records);

  await AsyncStorage.setItem(MEMORIZATION_RECORDS_KEY, serializedRecords);
}

export async function loadMemorizationRecords(): Promise<
  MemorizationRecord[] | null
> {
  const storedRecords = await AsyncStorage.getItem(MEMORIZATION_RECORDS_KEY);

  if (storedRecords === null) {
    return null;
  }

  return JSON.parse(storedRecords) as MemorizationRecord[];
}
