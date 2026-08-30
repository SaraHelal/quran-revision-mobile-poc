import { masteryStyles } from "@/constants/masteryStyles";
import type { MasteryStatus } from "@/types";
import { StyleSheet, Text, View } from "react-native";

type SessionSurahInfoProps = {
  surahName: string;
  surahNumber: number;
  status: MasteryStatus;
};

export default function SessionSurahInfo({
  surahName,
  surahNumber,
  status,
}: SessionSurahInfoProps) {
  const statusStyle = masteryStyles[status];
  return (
    <View style={styles.container}>
      {" "}
      <Text style={styles.label}>Revision Session</Text>
      <Text style={styles.surahName}>{surahName}</Text>
      <Text style={styles.surahNumber}>Surah {surahNumber}</Text>
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
  container: {
    alignItems: "center",
  },
  label: {
    color: "#008765",
    fontSize: 15,
    fontWeight: "600",
  },
  surahName: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 4,
  },
  surahNumber: {
    fontSize: 17,
    color: "#4B5563",
    marginTop: 4,
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
