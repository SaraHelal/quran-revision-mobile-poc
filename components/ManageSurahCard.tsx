import { masteryStyles } from "@/constants/masteryStyles";
import type { MasteryStatus } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ManageSurahCardProps = {
  surahName: string;
  surahNumber: number;
  juzNumbers: readonly number[];
  status: MasteryStatus;
};
export default function ManageSurahCard({
  surahName,
  surahNumber,
  status,
  juzNumbers,
}: ManageSurahCardProps) {
  const statusStyle = masteryStyles[status];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.surahName}>{surahName}</Text>
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

      <Text style={styles.details}>
        Juz {juzNumbers.join(", ")} • Surah {surahNumber}
      </Text>
      <View style={styles.divider} />
      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={() => {}}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => {}}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#F0FDFA",
    padding: 16,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 14,
    gap: 10,
  },
  surahName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E2939",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    fontSize: 15,
    color: "#6B7280",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#D1FAE5",
    width: "100%",
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    alignItems: "center",
  },
  editText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
  deleteText: {
    color: "#9F1239",
    fontSize: 15,
    fontWeight: "600",
  },
});
