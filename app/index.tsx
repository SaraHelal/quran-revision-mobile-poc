import ManualSurahList from "@/components/ManualSurahList";
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
          <Text style={styles.welcome}>👋 Welcome</Text>

          <Text style={styles.title}>{"Today's Revision"}</Text>

          <Text style={styles.subtitle}>
            {"Review what's due, or choose a Surah yourself."}
          </Text>
        </View>
        {successMsg && (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>{successMsg}</Text>
          </View>
        )}
        <View style={styles.main}>
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
            <ManualSurahList surahs={surahs} onStartReview={handleRevision} />
          )}
        </View>
        <Pressable onPress={() => router.push({ pathname: "/manage-surahs" })}>
          <Text>Manage Surahs</Text>
        </Pressable>
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
});
