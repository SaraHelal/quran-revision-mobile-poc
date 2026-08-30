import { masteryStyles } from "@/constants/masteryStyles";
import type { MasteryStatus } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SurahSummary from "./SurahSummary";

type SurahCardProps = {
  surahName: string;
  surahNumber: number;
  status: MasteryStatus;
  onPress: () => void;
};
export default function SurahCard({
  surahName,
  surahNumber,
  status,
  onPress,
}: SurahCardProps) {
  const statusStyle = masteryStyles[status];
  return (
    <View style={styles.card}>
      <SurahSummary
        surahName={surahName}
        surahNumber={surahNumber}
        status={status}
      />
      <Pressable style={styles.reviewButton} onPress={onPress}>
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
