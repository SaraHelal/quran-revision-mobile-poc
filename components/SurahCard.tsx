import type { MasteryStatus } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SurahCardProps = {
  surahName: string;
  surahNumber: number;
  status: MasteryStatus;
};
const masteryStyles: Record<
  MasteryStatus,
  { backgroundColor: string; color: string }
> = {
  Weak: {
    backgroundColor: "#ffe2e2",
    color: "#B91C1C",
  },
  Good: {
    backgroundColor: "#fef3c6",
    color: "#b45309",
  },
  Excellent: {
    backgroundColor: "#d0fae5",
    color: "#047857",
  },
};
export default function SurahCard({
  surahName,
  surahNumber,
  status,
}: SurahCardProps) {
  const statusStyle = masteryStyles[status];
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardInfo}>
          <Text style={styles.surahName}>{surahName}</Text>
          <Text style={styles.surahNumber}>Surah {surahNumber}</Text>
        </View>
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
      <Pressable style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>Start Revision</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ACD2C6",
  },
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
    color: "inherit",
  },
  reviewButton: {
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#009768",
    alignItems: "center",
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
