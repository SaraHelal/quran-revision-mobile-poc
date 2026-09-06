import type { MemorizedSurah } from "@/types";
import { FlatList, StyleSheet, View } from "react-native";
import SurahCard from "./SurahCard";

type SuggestedSurahListProps = {
  surahs: MemorizedSurah[];
  onStartReview: (surahId: number) => void;
};
export default function SuggestedSurahList({
  surahs,
  onStartReview,
}: SuggestedSurahListProps) {
  return (
    <FlatList
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.cards}
      data={surahs}
      renderItem={({ item }) => (
        <SurahCard
          surahName={item.surahName}
          surahNumber={item.surahNumber}
          status={item.status}
          onPress={() => onStartReview(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  cards: {
    flex: 1,
    marginTop: 20,
  },
});
