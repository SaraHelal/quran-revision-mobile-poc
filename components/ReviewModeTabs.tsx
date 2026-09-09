import type { ReviewMode } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ReviewModeTabsProps = {
  reviewMode: ReviewMode;
  onReviewModeChange: (reviewMode: ReviewMode) => void;
};

export default function ReviewModeTabs({
  reviewMode,
  onReviewModeChange,
}: ReviewModeTabsProps) {
  return (
    <View style={styles.tabs}>
      <Pressable
        style={[styles.tab, reviewMode === "suggested" && styles.activeTab]}
        onPress={() => onReviewModeChange("suggested")}
      >
        <Text
          style={[
            styles.tabTitle,
            reviewMode === "suggested" && styles.activeTabTitle,
          ]}
          numberOfLines={1}
        >
          ✨ Suggested
        </Text>
      </Pressable>
      <Pressable
        style={[styles.tab, reviewMode === "manual" && styles.activeTab]}
        onPress={() => onReviewModeChange("manual")}
      >
        <Text
          style={[
            styles.tabTitle,
            reviewMode === "manual" && styles.activeTabTitle,
          ]}
          numberOfLines={1}
        >
          📖 Choose a Surah
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    gap: 10,
  },
  tab: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    paddingVertical: 20,
  },
  tabTitle: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: "#009966",
  },
  activeTabTitle: {
    color: "#FFF",
  },
});
