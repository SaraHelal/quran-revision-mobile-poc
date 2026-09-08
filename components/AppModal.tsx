import type { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};
export default function AppModal({
  visible,
  onClose,
  children,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={(event) => event.stopPropagation()}
        >
          <Pressable style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseIcon}>✕</Text>
          </Pressable>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  modalCloseIcon: {
    fontSize: 20,
    color: "#6A7282",
  },
});
