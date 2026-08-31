import { Pressable, StyleSheet, Text, View } from "react-native";

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  showArrow?: boolean;
};
export default function SecondaryButton({
  label,
  onPress,
  disabled = false,
  showArrow = false,
}: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{label}</Text>
        {showArrow && (
          <View style={styles.arrow}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowHead} />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6EE7B7",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },

  text: {
    color: "#007F5F",
    fontSize: 15,
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  arrow: {
    width: 22,
    height: 14,
    justifyContent: "center",
  },

  arrowLine: {
    width: 20,
    height: 2,
    backgroundColor: "#007F5F",
  },

  arrowHead: {
    position: "absolute",
    right: 0,
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#007F5F",
    transform: [{ rotate: "45deg" }],
  },
});
