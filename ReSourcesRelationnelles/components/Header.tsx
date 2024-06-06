import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface HomeLinkProps {
  href: string;
  title: string;
}

interface QuickAccessItem {
  iconId: string;
  linkProps?: {
    href: string;
  };
  buttonProps?: {
    onClick: () => void;
  };
  text: string;
}

interface HeaderProps {
  brandTop: React.ReactNode;
  homeLinkProps: HomeLinkProps;
  id: string;
  quickAccessItems: QuickAccessItem[];
  serviceTagline: string;
  serviceTitle: string;
}

const Header: React.FC<HeaderProps> = ({
  brandTop,
  homeLinkProps,
  id,
  quickAccessItems,
  serviceTagline,
  serviceTitle,
}) => {
  return (
    <View style={styles.header} accessibilityLabel={id}>
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
                : item.buttonProps?.onClick
            }
            style={styles.quickAccessItem}
          >
            <Icon name={item.iconId} size={20} />
            <Text>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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

export default Header;
