import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

type SearchBarType = {
  recherche: string;
  setRecherche: (recherche: string) => void;
  onPress: () => void;
};

const SearchBar = ({ recherche, setRecherche, onPress }: SearchBarType) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={[
          styles.frLabel,
          isFocused &&
            Platform.OS === "web" && {
              outlineStyle: "solid",
              outlineColor: "#000091",
              outlineWidth: 2,
            },
        ]}
        value={recherche}
        onChangeText={(value: string) => {
          setRecherche(value);
        }}
        placeholder="Rechercher"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity style={styles.frBtn} onPress={onPress}>
        <FontAwesome style={styles.icon} name={"search"} />
        {Platform.OS === "web" && <Text style={styles.title}>Rechercher</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 50,
    margin: 16,
  },
  frLabel: {
    flex: 9,
    color: "#161616",
    backgroundColor: "#eeeeee",
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000091",
    borderTopLeftRadius: 8,
  },
  frBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: "#000091",
    color: "#f5f5fe",
    borderTopRightRadius: 8,
  },
  title: {
    flex: 3,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    padding: 10,
  },
  icon: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default SearchBar;
