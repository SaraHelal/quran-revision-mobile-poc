import SurahCard from "@/components/SurahCard";
import { useSurahs } from "@/context/SurahsContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { surahs, successMsg, setSuccessMsg } = useSurahs();

  const handleRevision = (id: number) => {
    router.push({
      pathname: "/review/[id]",
      params: { id },
    });
  };

  useEffect(() => {
    if (!successMsg) return;

    const timer = setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [successMsg, setSuccessMsg]);

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

          <Text style={styles.title}>{"Today's Revision"}</Text>

          <Text style={styles.subtitle}>
            {"Review what's due, or choose a Surah yourself."}
          </Text>
        </View>
        {successMsg && (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>{successMsg}</Text>
          </View>
        )}
        <FlatList
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.cards}
          data={surahs}
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
  successMessage: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
  },

  successMessageText: {
    color: "#047857",
    fontWeight: "600",
    textAlign: "center",
  },
});
