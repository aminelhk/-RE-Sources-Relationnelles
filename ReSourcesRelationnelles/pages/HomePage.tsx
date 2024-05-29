import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "components/CardList";
import Accordion from "components/Accordion";
import ButtonFr from "components/Button";
import TextFr from "components/TextFr";


const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Footer/>
      <ButtonFr onPress={function (): void {
        alert("Hello World");
      } }/> 
      <TextFr text="test1" number={1}/>
      <TextFr text="test2" number={2}/>
      <TextFr text="test3" number={3}/>
      <TextFr text="test4"/>
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
