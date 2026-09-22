import ManualSurahList from "@/components/ManualSurahList";
import PrimaryButton from "@/components/PrimaryButton";
import ReviewModeTabs from "@/components/ReviewModeTabs";
import SuggestedSurahList from "@/components/SuggestedSurahList";
import { useSurahs } from "@/context/SurahsContext";
import type { ReviewMode, ReviewTiming } from "@/types";
import { getReviewTiming, isReviewDue } from "@/utils/reviewSchedule";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const REVIEW_TIMING_PRIORITY: Record<ReviewTiming, number> = {
  overdue: 0,
  dueToday: 1,
};
export default function Index() {
  const [reviewMode, setReviewMode] = useState<ReviewMode>("suggested");
  const { surahs, successMsg, setSuccessMsg } = useSurahs();
  const dueSurahs = surahs.filter((surah) => {
    return isReviewDue(surah.nextReviewDate);
  });
  const sortedDueSurahs = [...dueSurahs].sort(
    (a, b) =>
      REVIEW_TIMING_PRIORITY[getReviewTiming(a.nextReviewDate)] -
      REVIEW_TIMING_PRIORITY[getReviewTiming(b.nextReviewDate)],
  );
  const handleRevision = (id: number) => {
    router.push({
      pathname: "/review/[id]",
      params: { id },
    });
  };

  useEffect(() => {
    if (!successMsg) return;

    const timer = setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [successMsg, setSuccessMsg]);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.welcome}>👋 Welcome</Text>

            <Pressable
              style={styles.manageButton}
              onPress={() => router.push("/manage-surahs")}
            >
              <Text style={styles.manageButtonIcon}>📚</Text>
              <Text style={styles.manageButtonText}>My Surahs</Text>
            </Pressable>
          </View>

          <Text style={styles.title}>{"Today's Revision"}</Text>

          <Text style={styles.subtitle}>
            {surahs.length === 0
              ? "Add your memorised Surahs to begin your revision plan."
              : "Review what's due, or choose a Surah yourself."}
          </Text>
        </View>
        {successMsg && (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>{successMsg}</Text>
          </View>
        )}

        <View style={[styles.main, surahs.length === 0 && styles.emptyMain]}>
          {surahs.length === 0 ? (
            <View style={styles.firstUseContainer}>
              <Text style={styles.firstUseIcon}>📖</Text>

              <Text style={styles.firstUseTitle}>No Surahs added yet</Text>

              <Text style={styles.firstUseText}>
                Add the Surahs you have memorised to start building your
                revision plan.
              </Text>

              <View style={styles.firstUseButton}>
                <PrimaryButton
                  label="Add Your First Surah"
                  onPress={() => router.push("/add-surah")}
                />
              </View>
            </View>
          ) : (
            <>
              <ReviewModeTabs
                reviewMode={reviewMode}
                onReviewModeChange={setReviewMode}
              />

              {reviewMode === "suggested" ? (
                <SuggestedSurahList
                  surahs={sortedDueSurahs}
                  onStartReview={handleRevision}
                />
              ) : (
                <ManualSurahList
                  surahs={surahs}
                  onStartReview={handleRevision}
                />
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F4F7F2",
  },
  header: {
    backgroundColor: "#009768",
    borderRadius: 28,
    padding: 24,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  manageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  manageButtonIcon: {
    fontSize: 14,
  },
  manageButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  welcome: {
    color: "#D1FAE5",
    fontSize: 15,
    fontWeight: "500",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 8,
  },

  subtitle: {
    color: "#ECFDF5",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  successMessage: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
  },

  successMessageText: {
    color: "#047857",
    fontWeight: "600",
    textAlign: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#FFF",
    marginVertical: 15,
    padding: 10,
    borderRadius: 12,
  },
  firstUseContainer: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 8,
  },

  firstUseIcon: {
    fontSize: 36,
  },

  firstUseTitle: {
    color: "#1E2939",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  firstUseText: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },

  firstUseButton: {
    width: "100%",
    marginTop: 10,
  },
  emptyMain: {
    flex: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
