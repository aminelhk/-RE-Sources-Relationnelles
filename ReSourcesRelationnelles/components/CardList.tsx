import React from "react";
import { StyleSheet, SafeAreaView, FlatList, Platform } from "react-native";
import Card from "./Card";

const items = [
  {
    img: "https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80",
    name: "Audi R8",
    price: 158600,
    hp: 562,
    acceleration: 3.2,
    miles: 24000,
    location: "Seattle, WA",
    date: new Date("2022-10-20"),
  },
  {
    img: "https://images.unsplash.com/photo-1590656364826-5f13b8e32cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
    name: "Nissan GTR",
    price: 225500,
    hp: 598,
    acceleration: 3.7,
    miles: 13000,
    location: "Richmond, VA",
    date: new Date("2022-11-22"),
  },
  {
    img: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    name: "Porsche 911",
    price: 160100,
    hp: 640,
    acceleration: 3.5,
    miles: 6000,
    location: "San Diego, CA",
    date: new Date("2022-11-23"),
  },
  {
    img: "https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80",
    name: "Audi R8",
    price: 158600,
    hp: 562,
    acceleration: 3.2,
    miles: 24000,
    location: "Seattle, WA",
    date: new Date("2022-10-20"),
  },
  {
    img: "https://images.unsplash.com/photo-1590656364826-5f13b8e32cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
    name: "Nissan GTR",
    price: 225500,
    hp: 598,
    acceleration: 3.7,
    miles: 13000,
    location: "Richmond, VA",
    date: new Date("2022-11-22"),
  },
  {
    img: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    name: "Porsche 911",
    price: 160100,
    hp: 640,
    acceleration: 3.5,
    miles: 6000,
    location: "San Diego, CA",
    date: new Date("2022-11-23"),
  },
  {
    img: "https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80",
    name: "Audi R8",
    price: 158600,
    hp: 562,
    acceleration: 3.2,
    miles: 24000,
    location: "Seattle, WA",
    date: new Date("2022-10-20"),
  },
  {
    img: "https://images.unsplash.com/photo-1590656364826-5f13b8e32cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
    name: "Nissan GTR",
    price: 225500,
    hp: 598,
    acceleration: 3.7,
    miles: 13000,
    location: "Richmond, VA",
    date: new Date("2022-11-22"),
  },
  {
    img: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    name: "Porsche 911",
    price: 160100,
    hp: 640,
    acceleration: 3.5,
    miles: 6000,
    location: "San Diego, CA",
    date: new Date("2022-11-23"),
  },
];

const CardList = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={items}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={Platform.OS === "web" ? 4 : 1} // Number of columns
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  flatListContent: {
    flex: 1,
    paddingTop: 16,
  },
});

export default CardList;
