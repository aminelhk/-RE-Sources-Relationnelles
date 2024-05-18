import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type AccordionType = {
  title: string;
  onPress: () => void;
  isExpended: boolean;
  children: React.ReactNode;
};

const Accordion = ({ title, onPress, isExpended, children }: AccordionType) => {
  return (
    <TouchableOpacity style={styles.accordionContainer} onPress={onPress}>
      <View
        style={[styles.viewTitle, isExpended && { backgroundColor: "#e3e3fd" }]}
      >
        <Text style={styles.title}>{title}</Text>
        <FontAwesome
          style={styles.icon}
          name={isExpended ? "chevron-up" : "chevron-down"}
        />
      </View>
      {isExpended && children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  viewTitle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    flex: 9,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000097",
    textAlign: "left",
    padding: 10,
  },
  icon: {
    flex: 1,
    fontSize: 18,
    color: "#000097",
    padding: 10,
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Accordion;
