import { SurahsProvider } from "@/context/SurahsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SurahsProvider>
      <Stack />
    </SurahsProvider>
  );
}
