import SurahCard from "@/components/SurahCard";
import { mockSurahs } from "@/data/mockSurahs";
import { router, Stack } from "expo-router";
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
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcome}>👋 Welcome</Text>

          <Text style={styles.title}>Today's Revision</Text>

          <Text style={styles.subtitle}>
            Review what's due, or choose a Surah yourself.
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
    </>
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
  cards: {
    flex: 1,
    marginTop: 20,
  },
});
