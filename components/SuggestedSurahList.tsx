import type { MemorizedSurah } from "@/types";
import { getReviewTiming } from "@/utils/reviewSchedule";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
          reviewTiming={getReviewTiming(item.nextReviewDate)}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyResultContainer}>
          <Text style={styles.emptyResultIcon}>🎉</Text>
          <Text style={styles.emptyResultMainText}>No reviews due today</Text>
          <Text style={styles.emptyResultText}>
            Great job! You’ve completed all your due reviews.
          </Text>
        </View>
      }
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
  emptyResultContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 30,
  },
  emptyResultIcon: {
    fontSize: 30,
  },
  emptyResultMainText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  emptyResultText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: "#6A7282",
  },
});
