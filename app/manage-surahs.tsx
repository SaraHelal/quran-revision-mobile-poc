import ManageSurahCard from "@/components/ManageSurahCard";
import PrimaryButton from "@/components/PrimaryButton";
import { useSurahs } from "@/context/SurahsContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageSurahsScreen() {
  const { surahs, successMsg, setSuccessMsg, deleteSurah } = useSurahs();
  const router = useRouter();

  const sortedSurahs = [...surahs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  useEffect(() => {
    if (!successMsg) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [successMsg, setSuccessMsg]);
  const handleDeleteSurah = (surahId: number, surahName: string) => {
    Alert.alert(
      "Delete Surah",
      `Are you sure you want to delete ${surahName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteSurah(surahId);
            setSuccessMsg(`${surahName} was deleted successfully.`);
          },
        },
      ],
    );
  };
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
            {successMsg && (
              <View style={styles.successMessage}>
                <Text style={styles.successMessageText}>{successMsg}</Text>
              </View>
            )}
            <View style={styles.addButtonContainer}>
              <PrimaryButton
                label="+ Add Surah"
                onPress={() => router.push("/add-surah")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.counterBox}>
                <Text style={styles.counterText}>
                  {surahs.length} {surahs.length === 1 ? "Surah" : "Surahs"}
                </Text>
              </View>
            </View>
            <FlatList
              data={sortedSurahs}
              style={styles.cards}
              contentContainerStyle={styles.cardsContent}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ManageSurahCard
                  surahName={item.surahName}
                  surahNumber={item.surahNumber}
                  juzNumbers={item.juzNumbers}
                  status={item.status}
                  onDelete={() => handleDeleteSurah(item.id, item.surahName)}
                  onEdit={() =>
                    router.push({
                      pathname: "/edit-surah/[id]",
                      params: {
                        id: item.id.toString(),
                      },
                    })
                  }
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>No memorised Surahs yet</Text>
                  <Text style={styles.emptyText}>
                    Add your first Surah to start organising your revision.
                  </Text>
                </View>
              }
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
    flex: 1,
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
    flex: 1,
    width: "100%",
  },
  cardsContent: {
    gap: 10,
    paddingBottom: 20,
  },
  successMessage: {
    width: "100%",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 10,
    padding: 12,
  },
  successMessageText: {
    color: "#007A55",
    textAlign: "center",
    fontWeight: "600",
  },
  emptyContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 24,
    gap: 8,
  },
  emptyTitle: {
    color: "#1E2939",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
