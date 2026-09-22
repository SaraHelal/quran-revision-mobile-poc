import type { MasteryStatus, MemorizedSurah } from "@/types";
import { normalizeSearchText } from "@/utils/normalizeSearchText";
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

  const searchFilteredSurahs = surahs.filter((surah) => {
    const normalizedSurahName = normalizeSearchText(surah.surahName);
    const normalizedQuery = normalizeSearchText(searchQuery);

    return normalizedSurahName.includes(normalizedQuery);
  });

  const finalFilteredSurahs =
    selectedJuz === null
      ? searchFilteredSurahs
      : searchFilteredSurahs.filter((surah) =>
          surah.juzNumbers.includes(selectedJuz),
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
        data={sortedSurahs}
        keyExtractor={(item) => String(item.id)}
        style={styles.cards}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
              Review any memorised Surah, even if it isn’t due yet.
            </Text>

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Surahs…"
              style={styles.searchInput}
            />

            <Text style={styles.juzLabel}>Choose a Juz</Text>

            <Pressable
              style={styles.juzSelector}
              onPress={() => setIsJuzModalVisible(true)}
            >
              <Text style={styles.juzSelectorText}>
                {selectedJuz === null ? "All Juz" : `Juz ${selectedJuz}`}
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
          <Text style={styles.emptyText}>No matching Surahs found.</Text>
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

            {selectedJuz === null && <Text style={styles.selectedIcon}>✓</Text>}
          </Pressable>

          {juzNumbers.map((juzNumber) => {
            const isSelected = juzNumber === selectedJuz;

            return (
              <Pressable
                key={juzNumber}
                style={[
                  styles.modalOption,
                  isSelected && styles.selectedModalOption,
                ]}
                onPress={() => handleSelectedJuz(juzNumber)}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    isSelected && styles.selectedModalOptionText,
                  ]}
                >
                  Juz {juzNumber}
                </Text>

                {isSelected && <Text style={styles.selectedIcon}>✓</Text>}
              </Pressable>
            );
          })}
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

          {manualSort === "latestAdded" && (
            <Text style={styles.selectedIcon}>✓</Text>
          )}
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

          {manualSort === "weakestFirst" && (
            <Text style={styles.selectedIcon}>✓</Text>
          )}
        </Pressable>
      </AppModal>
    </>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 10,
    fontSize: 30,
    borderColor: "#D7D5D5",
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
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D7D5D5",
    padding: 10,
    marginTop: 10,
    fontSize: 15,
  },

  juzLabel: {
    alignSelf: "flex-start",
  },

  juzSelector: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7D5D5",
    padding: 10,
    borderRadius: 10,
  },

  juzSelectorText: {
    fontSize: 15,
  },

  resultsToolbar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultsCountText: {
    color: "#374151",
    fontSize: 14,
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

  emptyText: {
    textAlign: "center",
    color: "#6A7282",
    marginVertical: 20,
    fontSize: 16,
  },

  modalTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  optionsList: {
    maxHeight: 400,
  },

  modalOption: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderRadius: 10,
  },

  modalOptionText: {
    fontSize: 16,
    color: "#111827",
  },

  selectedModalOption: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },

  selectedModalOptionText: {
    color: "#007A55",
    fontWeight: "700",
  },

  selectedIcon: {
    color: "#009768",
    fontSize: 18,
    fontWeight: "700",
  },
});
