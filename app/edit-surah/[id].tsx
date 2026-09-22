import { useSurahs } from "@/context/SurahsContext";
import type { MasteryStatus } from "@/types";
import { formatDateOnly, parseDateOnly } from "@/utils/formatDateOnly";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import PrimaryButton from "@/components/PrimaryButton";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
const MASTERY_OPTIONS: MasteryStatus[] = ["Weak", "Good", "Excellent"];
export default function EditSurahScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { surahs, updateSurah, setSuccessMsg } = useSurahs();
  const router = useRouter();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const surahId = Number(id);

  const surahToEdit = surahs.find((surah) => surah.id === surahId);
  const [selectedStatus, setSelectedStatus] = useState<MasteryStatus>(
    surahToEdit?.status ?? "Good",
  );

  const [memorizedDate, setMemorizedDate] = useState(
    surahToEdit ? parseDateOnly(surahToEdit.memorizedAt) : new Date(),
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
    if (!surahToEdit) {
      return;
    }

    await updateSurah(surahToEdit.id, {
      status: selectedStatus,
      memorizedAt: formatDateOnly(memorizedDate),
    });

    setSuccessMsg(`${surahToEdit.surahName} was updated successfully.`);
    router.back();
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: "",
        }}
      />

      <SafeAreaView style={styles.screen} edges={["left", "right", "bottom"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Edit Surah</Text>

            <Text style={styles.description}>
              Update the memorised date or mastery level.
            </Text>

            {surahToEdit ? (
              <>
                <View style={styles.surahInfo}>
                  <Text style={styles.surahName}>{surahToEdit.surahName}</Text>

                  <Text style={styles.surahDetails}>
                    Juz {surahToEdit.juzNumbers.join(", ")} • Surah{" "}
                    {surahToEdit.surahNumber}
                  </Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Memorised date</Text>

                  <Pressable
                    style={styles.dateSelector}
                    onPress={() => setIsDatePickerVisible(true)}
                  >
                    <Text style={styles.dateText}>
                      {memorizedDate.toLocaleDateString("en-GB")}
                    </Text>

                    <Text style={styles.changeText}>Change</Text>
                  </Pressable>

                  {isDatePickerVisible && (
                    <DateTimePicker
                      value={memorizedDate}
                      mode="date"
                      maximumDate={new Date()}
                      onChange={handleDateChange}
                    />
                  )}
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Mastery level</Text>

                  <View style={styles.masteryOptions}>
                    {MASTERY_OPTIONS.map((status) => {
                      const isSelected = selectedStatus === status;

                      return (
                        <Pressable
                          key={status}
                          style={[
                            styles.masteryButton,
                            isSelected && styles.selectedMasteryButton,
                          ]}
                          onPress={() => setSelectedStatus(status)}
                        >
                          <Text
                            style={[
                              styles.masteryText,
                              isSelected && styles.selectedMasteryText,
                            ]}
                          >
                            {status}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <View style={styles.saveButtonContainer}>
                    <PrimaryButton
                      label="Save Changes"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.notFoundText}>Surah not found.</Text>
            )}
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: 20,
  },
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
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
    lineHeight: 22,
    textAlign: "center",
  },
  surahInfo: {
    width: "100%",
    backgroundColor: "#F0FDFA",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  surahName: {
    color: "#1E2939",
    fontSize: 18,
    fontWeight: "700",
  },
  surahDetails: {
    color: "#6B7280",
    fontSize: 15,
  },
  notFoundText: {
    color: "#DC2626",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 20,
  },
  fieldContainer: {
    width: "100%",
    gap: 8,
  },
  fieldLabel: {
    color: "#1E2939",
    fontSize: 16,
    fontWeight: "600",
  },
  dateSelector: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateText: {
    color: "#1E2939",
    fontSize: 16,
  },
  changeText: {
    color: "#008765",
    fontSize: 14,
    fontWeight: "600",
  },
  masteryOptions: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },
  masteryButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  selectedMasteryButton: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  masteryText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedMasteryText: {
    color: "#007A55",
  },
  saveButtonContainer: {
    width: "100%",
    marginTop: 8,
  },
});
