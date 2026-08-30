import { masteryStyles } from "@/constants/masteryStyles";
import type { MasteryStatus } from "@/types";
import { StyleSheet, Text, View } from "react-native";

type SurahSummaryProps = {
  surahName: string;
  surahNumber: number;
  status: MasteryStatus;
};
export default function SurahSummary({
  surahName,
  surahNumber,
  status,
}: SurahSummaryProps) {
  const statusStyle = masteryStyles[status];

  return (
    <View style={styles.cardTop}>
      <View style={styles.cardInfo}>
        <Text style={styles.surahName}>{surahName}</Text>
        <Text style={styles.surahNumber}>Surah {surahNumber}</Text>
      </View>
      <View
        style={[styles.badge, { backgroundColor: statusStyle.backgroundColor }]}
      >
        <Text style={[styles.badgeText, { color: statusStyle.color }]}>
          {status}
        </Text>
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
});
