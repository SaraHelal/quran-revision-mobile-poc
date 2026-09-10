import ManageSurahCard from "@/components/ManageSurahCard";
import PrimaryButton from "@/components/PrimaryButton";
import { useSurahs } from "@/context/SurahsContext";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageSurahsScreen() {
  const { surahs } = useSurahs();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,
          title: "",
        }}
      />

      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.content}>
          <Text style={styles.title}>My Surahs</Text>
          <Text style={styles.desc}>Manage your memorised Surahs.</Text>
          <View style={styles.main}>
            <View style={styles.addButtonContainer}>
              <PrimaryButton label="+ Add Surah" onPress={() => {}} />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.counterBox}>
                <Text style={styles.counterText}>
                  {surahs.length} {surahs.length === 1 ? "Surah" : "Surahs"}
                </Text>
              </View>
            </View>
            <FlatList
              data={surahs}
              style={styles.cards}
              contentContainerStyle={styles.cardsContent}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ManageSurahCard
                  surahName={item.surahName}
                  surahNumber={item.surahNumber}
                  juzNumbers={item.juzNumbers}
                  status={item.status}
                />
              )}
            ></FlatList>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  content: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },
  title: {
    color: "#1E2939",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
    color: "#4B5563",
    marginTop: 4,
  },
  main: {
    gap: 10,
    marginBottom: 10,
    width: "100%",
  },
  addButtonContainer: {
    width: "100%",
  },
  infoContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  counterBox: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    color: "#007A55",
    fontWeight: "600",
  },
  cards: {
    width: "100%",
  },
  cardsContent: {
    gap: 10,
  },
});
