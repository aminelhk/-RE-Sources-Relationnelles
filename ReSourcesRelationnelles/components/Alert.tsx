import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AlertProps {
  context: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ context, title, message, onClose }) => {
  const getContextStyles = () => {
    switch (context) {
      case "success":
        return { container: styles.success, icon: "✔", iconColor: "#155724" };
      case "error":
        return { container: styles.error, icon: "✖", iconColor: "#721c24" };
      case "warning":
        return { container: styles.warning, icon: "⚠", iconColor: "#856404" };
      case "info":
        return { container: styles.info, icon: "ℹ", iconColor: "#0c5460" };
      default:
        return { container: {}, icon: "", iconColor: "" };
    }
  };

  const { container, icon, iconColor } = getContextStyles();

  return (
    <View style={[styles.alert, container]}>
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>
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
  warning: {
    backgroundColor: "#fff3cd",
    borderColor: "#ffeeba",
  },
  info: {
    backgroundColor: "#d1ecf1",
    borderColor: "#bee5eb",
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
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
