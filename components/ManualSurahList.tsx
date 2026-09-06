import type { MemorizedSurah } from "@/types";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import SurahCard from "./SurahCard";

type ManualSurahListProps = {
  surahs: MemorizedSurah[];
  onStartReview: (surahId: number) => void;
};
export default function ManualSurahList({
  surahs,
  onStartReview,
}: ManualSurahListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizeSearchText = (text: string): string => {
    return text.toLowerCase().replaceAll("-", "").replaceAll(" ", "");
  };
  const filteredSurahs = surahs.filter((surah) => {
    const normalizedSurahName = normalizeSearchText(surah.surahName);
    const normalizedQuery = normalizeSearchText(searchQuery);

    return normalizedSurahName.includes(normalizedQuery);
  });

  return (
    <FlatList
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.cards}
      data={filteredSurahs}
      renderItem={({ item }) => (
        <SurahCard
          surahName={item.surahName}
          surahNumber={item.surahNumber}
          status={item.status}
          onPress={() => onStartReview(item.id)}
        />
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.icon}>📖</Text>
          <Text style={styles.title}>Choose a Surah</Text>
          <Text style={styles.description}>
            Review any memorized surah, even if it isn’t due yet.
          </Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search surahs…"
            style={styles.searchInput}
          />
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No matching surahs found.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  container: {
    flex: 1,
  },
  cards: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    backgroundColor: "#F7FEFB",
    alignItems: "center",
    gap: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    borderColor: "#A4F4CF",
    marginBottom: 10,
  },
  icon: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 10,
    fontSize: 30,
    borderColor: "#d7d5d5",
    borderWidth: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    color: "#6A7282",
    fontSize: 16,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d7d5d5",
    padding: 10,
    marginTop: 10,
    fontSize: 15,
  },
  emptyText: {
    textAlign: "center",
    color: "#6A7282",
    marginVertical: 20,
    fontSize: 16,
  },
});
