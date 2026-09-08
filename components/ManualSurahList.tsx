import type { MasteryStatus, MemorizedSurah } from "@/types";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppModal from "./AppModal";
import SurahCard from "./SurahCard";

type ManualSurahListProps = {
  surahs: MemorizedSurah[];
  onStartReview: (surahId: number) => void;
};

type ManualSortOption = "latestAdded" | "weakestFirst";

const MASTERY_SORT_ORDER: Record<MasteryStatus, number> = {
  Weak: 0,
  Good: 1,
  Excellent: 2,
};
export default function ManualSurahList({
  surahs,
  onStartReview,
}: ManualSurahListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isJuzModalVisible, setIsJuzModalVisible] = useState(false);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [manualSort, setManualSort] = useState<ManualSortOption>("latestAdded");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const juzNumbers = Array.from(
    new Set(surahs.flatMap((surah) => surah.juzNumbers)),
  ).sort((a, b) => a - b);

  const handleSelectedJuz = (juz: number | null) => {
    setSelectedJuz(juz);
    setIsJuzModalVisible(false);
  };
  const handleSortOptionSelect = (option: ManualSortOption) => {
    setManualSort(option);
    setIsSortModalVisible(false);
  };

  const normalizeSearchText = (text: string): string => {
    return text.toLowerCase().replaceAll("-", "").replaceAll(" ", "");
  };
  const searchFilteredSurahs = surahs.filter((surah) => {
    const normalizedSurahName = normalizeSearchText(surah.surahName);
    const normalizedQuery = normalizeSearchText(searchQuery);

    return normalizedSurahName.includes(normalizedQuery);
  });
  const finalFilteredSurahs =
    selectedJuz === null
      ? searchFilteredSurahs
      : searchFilteredSurahs.filter((item) =>
          item.juzNumbers.includes(selectedJuz),
        );
  const sortedSurahs = [...finalFilteredSurahs];
  if (manualSort === "latestAdded") {
    sortedSurahs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else {
    sortedSurahs.sort(
      (a, b) => MASTERY_SORT_ORDER[a.status] - MASTERY_SORT_ORDER[b.status],
    );
  }

  return (
    <>
      <FlatList
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.cards}
        data={sortedSurahs}
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
            <Text style={styles.juzLabel}>Choose a Juz</Text>
            <Pressable
              style={styles.juzSelector}
              onPress={() => setIsJuzModalVisible(true)}
            >
              <Text style={styles.juzSelectorText}>
                {selectedJuz ? `Juz ${selectedJuz}` : "All Juz"}
              </Text>
              <Text>▼</Text>
            </Pressable>
            <View style={styles.resultsToolbar}>
              <Text style={styles.resultsCountText}>
                {finalFilteredSurahs.length} matching
                {finalFilteredSurahs.length === 1 ? " Surah" : " Surahs"}
              </Text>
              <Pressable
                style={styles.sortButton}
                onPress={() => setIsSortModalVisible(true)}
              >
                <Text>
                  {manualSort === "latestAdded"
                    ? "Latest Added"
                    : "Weakest First"}
                </Text>
                <Text>▼</Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching surahs found.</Text>
        }
      />
      <AppModal
        visible={isJuzModalVisible}
        onClose={() => setIsJuzModalVisible(false)}
      >
        <Text style={styles.modalTitle}>Choose a Juz</Text>
        <ScrollView style={styles.optionsList}>
          <Pressable
            style={[
              styles.modalOption,
              selectedJuz === null && styles.selectedModalOption,
            ]}
            onPress={() => handleSelectedJuz(null)}
          >
            <Text
              style={[
                styles.modalOptionText,
                selectedJuz === null && styles.selectedModalOptionText,
              ]}
            >
              All Juz
            </Text>
          </Pressable>
          {juzNumbers.map((juzNumber) => (
            <Pressable
              key={juzNumber}
              style={[
                styles.modalOption,
                juzNumber === selectedJuz && styles.selectedModalOption,
              ]}
              onPress={() => handleSelectedJuz(juzNumber)}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  juzNumber === selectedJuz && styles.selectedModalOptionText,
                ]}
              >
                Juz {juzNumber}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </AppModal>

      <AppModal
        visible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
      >
        <Text style={styles.modalTitle}>Sort Surahs</Text>
        <Pressable
          style={[
            styles.modalOption,
            manualSort === "latestAdded" && styles.selectedModalOption,
          ]}
          onPress={() => handleSortOptionSelect("latestAdded")}
        >
          <Text
            style={[
              styles.modalOptionText,
              manualSort === "latestAdded" && styles.selectedModalOptionText,
            ]}
          >
            Latest Added
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.modalOption,
            manualSort === "weakestFirst" && styles.selectedModalOption,
          ]}
          onPress={() => handleSortOptionSelect("weakestFirst")}
        >
          <Text
            style={[
              styles.modalOptionText,
              manualSort === "weakestFirst" && styles.selectedModalOptionText,
            ]}
          >
            Weakest First
          </Text>
        </Pressable>
      </AppModal>
    </>
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
  juzLabel: {
    alignSelf: "flex-start",
  },
  juzSelector: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#d7d5d5",
    padding: 10,
    borderRadius: 10,
  },
  juzSelectorText: {
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  modalOption: {
    width: "100%",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#111827",
  },
  selectedModalOption: {
    backgroundColor: "#009966",
  },
  selectedModalOptionText: {
    color: "#FFF",
  },
  optionsList: {
    maxHeight: 400,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  modalCloseIcon: {
    fontSize: 20,
    color: "#6A7282",
  },
  resultsToolbar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#6EE7B7",
    borderRadius: 10,
  },
  resultsCountText: {},
});
