import SurahCard from "@/components/SurahCard";
import { mockSurahs } from "@/data/mockSurahs";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handleRevision = (id: number) => {
    router.push({
      pathname: "/review/[id]",
      params: { id },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Revision</Text>
        <Text style={styles.subtitle}>
          {mockSurahs.length === 1
            ? `${mockSurahs.length} surah `
            : `${mockSurahs.length} surahs `}
          due for revision
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.cards}
        data={mockSurahs}
        renderItem={({ item }) => (
          <SurahCard
            surahName={item.surahName}
            surahNumber={item.surahNumber}
            status={item.status}
            onPress={() => handleRevision(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
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
  cards: {
    flex: 1,
    marginTop: 20,
  },
});
