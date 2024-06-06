import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface TableProps {
  headers: string[];
  data: string[][];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {headers.map((header, index) => (
        <Text key={index} style={styles.headerText}>
          {header}
        </Text>
      ))}
    </View>
  );

  const renderRow = ({ item }: { item: string[] }) => (
    <View style={styles.rowContainer}>
      {item.map((cell, index) => (
        <Text key={index} style={styles.cellText}>
          {cell}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.tableContainer}>
      {renderHeader()}
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 20,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f3f5",
    padding: 10,
  },
  cellText: {
    flex: 1,
    textAlign: "center",
  },
});

export default Table;