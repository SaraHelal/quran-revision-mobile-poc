import SurahCard from "@/components/SurahCard";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Revision</Text>
        <Text style={styles.subtitle}>3 surahs due for revision</Text>
      </View>
      <SurahCard surahName="Al-Mulk" surahNumber={67} status="Weak" />
      <SurahCard surahName="Al-Qalam" surahNumber={68} status="Good" />
      <SurahCard surahName="Al-Qalam" surahNumber={68} status="Excellent" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
  },
});
