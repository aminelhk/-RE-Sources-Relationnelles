import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import SignUpPage from "./pages/SignUpPage";

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SignUpPage />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default App;
