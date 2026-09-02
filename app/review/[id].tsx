import NotFoundState from "@/components/NotFoundState";
import PrimaryButton from "@/components/PrimaryButton";
import SessionSurahInfo from "@/components/SessionSurahInfo";
import { masteryStyles } from "@/constants/masteryStyles";
import { useSurahs } from "@/context/SurahsContext";
import type { MasteryStatus } from "@/types";
import {
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const masteryOptions: MasteryStatus[] = ["Weak", "Good", "Excellent"];

export default function ReviewScreen() {
  const { id } = useLocalSearchParams();
  const surahId = Number(id);
  const navigation = useNavigation();
  const { surahs, setSurahs, setSuccessMsg } = useSurahs();
  const [isRevisionFinished, setIsRevisionFinished] = useState(false);
  const [isRevisionSaved, setIsRevisionSaved] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MasteryStatus | null>(
    null,
  );
  const hasUnsavedProgress = isRevisionFinished;
  const surah = surahs.find((surah) => surah.id === surahId);

  const handleResult = (result: MasteryStatus) => {
    setSelectedResult(result);
  };

  const handleSaveRevision = (updatedStatus: MasteryStatus) => {
    if (!surah) return;
    setSurahs((prevSurahs) =>
      prevSurahs.map((prevSurah) => {
        if (prevSurah.id === surahId) {
          return { ...prevSurah, status: updatedStatus };
        }
        return prevSurah;
      }),
    );
    setSuccessMsg(`${surah.surahName} revision saved successfully`);
    setIsRevisionSaved(true);
  };

  useEffect(() => {
    if (isRevisionSaved) {
      router.back();
    }
  }, [isRevisionSaved]);

  useEffect(() => {
    if (!hasUnsavedProgress || isRevisionSaved) return;
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert("Leave revision?", "Your progress won't be saved.", [
        {
          text: "Stay",
          style: "cancel",
        },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => {
            navigation.dispatch(event.data.action);
          },
        },
      ]);
    });

    return unsubscribe;
  }, [navigation, isRevisionSaved, hasUnsavedProgress]);
  if (!surah) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />

        <NotFoundState
          title="Surah not found"
          message="This Surah could not be found. Please return and try again."
        />
      </>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
        }}
      />

      <View style={styles.container}>
        <View style={styles.reviewCard}>
          <SessionSurahInfo
            surahName={surah.surahName}
            surahNumber={surah.surahNumber}
            status={surah.status}
          />

          <View style={styles.instructionBox}>
            <Text style={styles.instructionTitle}>
              Revise the Surah now from memory
            </Text>

            <Text style={styles.instructionText}>
              You can use the Quran or a recitation app to check any passages
              that need revision.
            </Text>
          </View>
          {isRevisionFinished && (
            <>
              <Text style={styles.question}>How did your revision go?</Text>
              <View style={styles.resultsContainer}>
                {masteryOptions.map((option) => {
                  const optionStyle = masteryStyles[option];
                  return (
                    <Pressable
                      style={[
                        styles.resultButton,
                        { backgroundColor: optionStyle.backgroundColor },
                        selectedResult === option &&
                          styles.selectedResultButton,
                      ]}
                      key={option}
                      onPress={() => handleResult(option)}
                    >
                      <Text
                        style={[
                          styles.resultButtonText,
                          { color: optionStyle.color },
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}
          {!isRevisionFinished && (
            <View style={styles.saveButtonContainer}>
              <PrimaryButton
                label="Finish Revision"
                onPress={() => setIsRevisionFinished(true)}
              />
            </View>
          )}

          {selectedResult && (
            <View style={styles.saveButtonContainer}>
              <PrimaryButton
                label="Save Revision"
                onPress={() => handleSaveRevision(selectedResult)}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  reviewCard: { padding: 16, borderRadius: 16, backgroundColor: "#fff" },
  instructionBox: {
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#E9FAF3",
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#006B55",
    textAlign: "center",
  },
  instructionText: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: "#006B55",
    textAlign: "center",
  },
  question: {
    marginTop: 28,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  resultsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  resultButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
  },
  resultButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  selectedResultButton: {
    borderWidth: 2,
    borderColor: "#009768",
  },
  saveButtonContainer: {
    marginTop: 28,
  },
});
