import { masteryStyles } from "@/constants/masteryStyles";
import type { MasteryStatus, ReviewTiming } from "@/types";
import { StyleSheet, Text, View } from "react-native";

type SurahSummaryProps = {
  surahName: string;
  surahNumber: number;
  status: MasteryStatus;
  reviewTiming?: ReviewTiming;
};
const reviewTimingStyles: Record<
  ReviewTiming,
  {
    backgroundColor: string;
    color: string;
    label: string;
  }
> = {
  dueToday: {
    backgroundColor: "#E0F2FE",
    color: "#0369A1",
    label: "Due Today",
  },
  overdue: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
    label: "Overdue",
  },
};
export default function SurahSummary({
  surahName,
  surahNumber,
  status,
  reviewTiming,
}: SurahSummaryProps) {
  const statusStyle = masteryStyles[status];
  const timingStyle = reviewTiming ? reviewTimingStyles[reviewTiming] : null;
  return (
    <View style={styles.cardTop}>
      <View style={styles.cardInfo}>
        <Text style={styles.surahName}>{surahName}</Text>
        <Text style={styles.surahNumber}>Surah {surahNumber}</Text>
        {timingStyle && reviewTiming === "overdue" && (
          <Text style={{ color: timingStyle.color }}>⚠ Overdue</Text>
        )}
      </View>
      <View>
        <View
          style={[
            styles.badge,
            { backgroundColor: statusStyle.backgroundColor },
          ]}
        >
          <Text style={[styles.badgeText, { color: statusStyle.color }]}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    gap: 4,
  },
  surahName: {
    fontSize: 17,
    fontWeight: "600",
  },
  surahNumber: {
    fontSize: 12,
    fontWeight: "500",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  timingBadge: {
    alignSelf: "flex-end",
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  timingBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
