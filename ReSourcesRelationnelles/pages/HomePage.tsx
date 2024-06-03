import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "components/CardList";
import Accordion from "components/Accordion";
import ButtonFr from "components/Button";
import TextFr from "components/TextFr";
import CardList from "components/CardList";


const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header brandTop={undefined} homeLinkProps={{title : "i", href:"#"}} id={""} quickAccessItems={[]} serviceTagline={""} serviceTitle={""}/>
      <CardList/>
      <Footer/>
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
