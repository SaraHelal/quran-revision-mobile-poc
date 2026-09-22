import PrimaryButton from "@/components/PrimaryButton";
import { useSurahs } from "@/context/SurahsContext";
import { surahCatalog } from "@/data/surahCatalog";
import type { MasteryStatus, SurahMetadata } from "@/types";
import { formatDateOnly } from "@/utils/formatDateOnly";
import { normalizeSearchText } from "@/utils/normalizeSearchText";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AddSurahScreen() {
  const { surahs: memorisedSurahs, addSurah, setSuccessMsg } = useSurahs();
  const [isSurahModalVisible, setIsSurahModalVisible] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<SurahMetadata | null>(
    null,
  );
  const [selectedStatus, setSelectedStatus] = useState<MasteryStatus>("Good");
  const [searchQuery, setSearchQuery] = useState("");
  const [memorizedDate, setMemorizedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const normalizedQuery = normalizeSearchText(searchQuery);
  const availableSurahs = surahCatalog.filter(
    (catalogSurah) =>
      !memorisedSurahs.some(
        (memorisedSurah) =>
          memorisedSurah.surahNumber === catalogSurah.surahNumber,
      ),
  );
  const filteredSurahs = availableSurahs.filter((surah) =>
    normalizeSearchText(surah.surahName).includes(normalizedQuery),
  );
  const handleDateChange = (
    _event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setIsDatePickerVisible(false);

    if (selectedDate) {
      setMemorizedDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!selectedSurah) {
      return;
    }

    try {
      await addSurah({
        surahNumber: selectedSurah.surahNumber,
        status: selectedStatus,
        memorizedAt: formatDateOnly(memorizedDate),
      });

      setSuccessMsg(`${selectedSurah.surahName} was added successfully.`);
      router.back();
    } catch (error) {
      console.error("Failed to add Surah:", error);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
        }}
      />
      <SafeAreaView edges={["left", "right", "bottom"]} style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Add Surah</Text>

            <Text style={styles.description}>
              Choose a Surah and add it to your memorised list.
            </Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Surah</Text>
              <Pressable
                style={styles.selector}
                onPress={() => setIsSurahModalVisible(true)}
              >
                <Text>{selectedSurah?.surahName ?? "Choose a Surah"}</Text>
                <Text>⌄</Text>
              </Pressable>
              <View style={styles.metadataRow}>
                <View style={styles.metadataBox}>
                  <Text style={styles.metadataLabel}>Surah Number</Text>
                  <Text style={styles.metadataValue}>
                    {selectedSurah?.surahNumber ?? "_"}
                  </Text>
                </View>
                <View style={styles.metadataBox}>
                  <Text style={styles.metadataLabel}>Juz Number</Text>
                  <Text style={styles.metadataValue}>
                    {selectedSurah?.juzNumbers.join(", ") ?? "_"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Memorised date</Text>
              <Pressable
                style={styles.selector}
                onPress={() => setIsDatePickerVisible(true)}
              >
                <Text style={styles.dateText}>
                  {memorizedDate.toLocaleDateString("en-GB")}
                </Text>
                <Text>📅</Text>
              </Pressable>
              {isDatePickerVisible && (
                <DateTimePicker
                  value={memorizedDate}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Mastery level</Text>
              <View style={styles.masteryOptions}>
                <Pressable
                  style={[
                    styles.masteryOption,
                    selectedStatus === "Weak" && styles.selectedMasteryOption,
                  ]}
                  onPress={() => setSelectedStatus("Weak")}
                >
                  <Text
                    style={[
                      styles.masteryOptionText,
                      selectedStatus === "Weak" &&
                        styles.selectedMasteryOptionText,
                    ]}
                  >
                    Weak
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.masteryOption,
                    selectedStatus === "Good" && styles.selectedMasteryOption,
                  ]}
                  onPress={() => setSelectedStatus("Good")}
                >
                  <Text
                    style={[
                      styles.masteryOptionText,
                      selectedStatus === "Good" &&
                        styles.selectedMasteryOptionText,
                    ]}
                  >
                    Good
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.masteryOption,
                    selectedStatus === "Excellent" &&
                      styles.selectedMasteryOption,
                  ]}
                  onPress={() => setSelectedStatus("Excellent")}
                >
                  <Text
                    style={[
                      styles.masteryOptionText,
                      selectedStatus === "Excellent" &&
                        styles.selectedMasteryOptionText,
                    ]}
                  >
                    Excellent
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.saveButtonContainer}>
              <PrimaryButton
                label="Save Surah"
                onPress={handleSubmit}
                disabled={!selectedSurah}
              />
            </View>
          </View>
        </ScrollView>
        <Modal
          visible={isSurahModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsSurahModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choose a Surah</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setIsSurahModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search Surahs..."
                style={styles.searchInput}
              />
              <FlatList
                data={filteredSurahs}
                keyExtractor={(item) => item.surahNumber.toString()}
                renderItem={({ item }) => {
                  const isSelected =
                    selectedSurah?.surahNumber === item.surahNumber;

                  return (
                    <Pressable
                      style={[
                        styles.surahItem,
                        isSelected && styles.selectedSurahItem,
                      ]}
                      onPress={() => {
                        setSelectedSurah(item);
                        setIsSurahModalVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.surahItemText,
                          isSelected && styles.selectedSurahItemText,
                        ]}
                      >
                        {item.surahName}
                      </Text>

                      {isSelected && <Text style={styles.selectedIcon}>✓</Text>}
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 15,
  },
  title: {
    color: "#1E2939",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: "#4B5563",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  fieldContainer: {
    width: "100%",
    gap: 8,
  },
  fieldLabel: {
    color: "#1E2939",
    fontSize: 15,
    fontWeight: "600",
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  selectorText: {
    color: "#6B7280",
    fontSize: 15,
  },
  metadataRow: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  metadataBox: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  metadataLabel: {
    color: "#6B7280",
    fontSize: 13,
  },
  metadataValue: {
    color: "#1E2939",
    fontSize: 16,
    fontWeight: "600",
  },
  dateText: {
    color: "#1E2939",
    fontSize: 15,
  },
  masteryOptions: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },
  masteryOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
  },
  masteryOptionText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },
  saveButtonContainer: {
    width: "100%",
    marginTop: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    color: "#1E2939",
    fontSize: 20,
    fontWeight: "700",
  },

  surahItemText: {
    color: "#1E2939",
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#374151",
    fontSize: 20,
    fontWeight: "600",
  },
  selectedMasteryOption: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  selectedMasteryOptionText: {
    color: "#007A55",
  },
  searchInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10,
  },
  surahItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  selectedSurahItem: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },

  selectedSurahItemText: {
    color: "#007A55",
    fontWeight: "700",
  },

  selectedIcon: {
    color: "#009768",
    fontSize: 18,
    fontWeight: "700",
  },
});
