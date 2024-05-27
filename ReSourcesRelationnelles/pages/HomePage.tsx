import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "components/CardList";
import Accordion from "components/Accordion";
import ButtonFr from "components/Button";


const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Footer/>
      <ButtonFr onPress={function (): void {
        alert("Hello World");
      } }/> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomePage;
