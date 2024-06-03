import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import HomePage from "./pages/HomePage";
import Alert from "./components/Alert";
import { View, Button } from "react-native";

const App: React.FC = () => {
  const [alertVisible, setAlertVisible] = useState(true);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <HomePage />
        <View style={{ padding: 20 }}>
          {alertVisible && (
            <Alert
              type="success"
              title="Message successfully sent"
              message="Everything went well"
              onClose={() => setAlertVisible(false)}
            />
          )}
          <Button title="Show Alert" onPress={() => setAlertVisible(true)} />
        </View>
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
