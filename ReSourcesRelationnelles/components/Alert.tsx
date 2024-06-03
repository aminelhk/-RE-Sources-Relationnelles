import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AlertProps {
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  return (
    <View
      style={[styles.alert, type === "success" ? styles.success : styles.error]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✔</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeIcon}>✖</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
  success: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
  error: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    color: "#155724",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 12,
  },
  closeIcon: {
    fontSize: 16,
    color: "#000",
  },
});

export default Alert;
