import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

type ItemType = {
  img: string;
  name: string;
  price: number;
  hp: number;
  acceleration: number;
  miles: number;
  location: string;
  date: Date;
};
const Card = ({ item }: { item: ItemType }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        // handle onPress
      }}
    >
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles.cardImg}
            source={{ uri: item.img }}
          />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>
              ${item.price.toLocaleString("en-US")}
            </Text>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.cardStatsItem}>
              <FeatherIcon color="#48496c" name="zap" size={14} />
              <Text style={styles.cardStatsItemText}>{item.hp} hp</Text>
            </View>

            <View style={styles.cardStatsItem}>
              <FeatherIcon color="#48496c" name="navigation" size={14} />
              <Text style={styles.cardStatsItemText}>
                {item.miles.toLocaleString("en-US")} miles
              </Text>
            </View>

            <View style={styles.cardStatsItem}>
              <FeatherIcon color="#48496c" name="clock" size={14} />
              <Text style={styles.cardStatsItemText}>
                {item.acceleration} sec
              </Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>{item.location}</Text>
            <Text style={styles.cardFooterText}>
              {item.date.toLocaleDateString("en-US", {
                day: "numeric",
                year: "numeric",
                month: "short",
              })}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  cardImg: {
    width: "100%",
    height: 180,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#2d2d2d",
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardStatsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#48496c",
    marginLeft: 4,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderColor: "#e9e9e9",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#909090",
  },
});

export default Card;