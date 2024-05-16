import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Vous pouvez choisir l'icône de votre choix

const Navbar = ({
  brandTop,
  homeLinkProps,
  id,
  quickAccessItems,
  serviceTagline,
  serviceTitle,
}) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => Linking.openURL(homeLinkProps.href)}
          accessible={true}
          accessibilityLabel={homeLinkProps.title}
        >
          <Text style={styles.brandTop}>{brandTop}</Text>
        </TouchableOpacity>
        <Text style={styles.serviceTitle}>{serviceTitle}</Text>
        <Text style={styles.serviceTagline}>{serviceTagline}</Text>
        <View style={styles.quickAccessItems}>
          {quickAccessItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={
                item.linkProps
                  ? () => Linking.openURL(item.linkProps.href)
                  : item.buttonProps.onClick
              }
              style={styles.quickAccessItem}
            >
              <Icon name={item.iconId} size={20} />
              <Text>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  brandTop: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  serviceTitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  serviceTagline: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  quickAccessItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  quickAccessItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Navbar;
