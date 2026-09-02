import { StyleSheet, Text, View } from "react-native";

type NotFoundStateProps = {
  title: string;
  message: string;
};

export default function NotFoundState({ title, message }: NotFoundStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9FAF3",
    color: "#008765",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  message: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
    textAlign: "center",
  },
});
