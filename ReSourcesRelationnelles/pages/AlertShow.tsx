import React, { useState } from "react";
import { View, Button } from "react-native";
import Alert from "../components/Alert";

const App: React.FC = () => {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
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
  );
};

export default App;
