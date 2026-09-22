import { SurahsProvider, useSurahs } from "@/context/SurahsContext";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
function AppNavigator() {
  const { isLoading, storageError, clearStorageError } = useSurahs();
  useEffect(() => {
    if (!storageError) return;

    Alert.alert("Storage Error", storageError, [
      {
        text: "OK",
        onPress: clearStorageError,
      },
    ]);
  }, [storageError, clearStorageError]);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009768" />
        <Text style={styles.loadingText}>Loading your Surahs...</Text>
      </View>
    );
  }

  return <Stack />;
}

export default function RootLayout() {
  return (
    <SurahsProvider>
      <AppNavigator />
    </SurahsProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F2",
    gap: 12,
  },
  loadingText: {
    color: "#4B5563",
    fontSize: 15,
  },
});
