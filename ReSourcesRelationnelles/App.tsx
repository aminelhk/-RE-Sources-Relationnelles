import React, { useState } from "react";
import { View, Button } from "react-native";
import Alert from "./components/Alert";

const App: React.FC = () => {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <View style={{ padding: 20 }}>
      {alertVisible && (
        <Alert
          context="success"
          title="Message successfully sent"
          message="Everything went well"
          onClose={() => setAlertVisible(false)}
        />
      )}
      <Button
        title="Show Success Alert"
        onPress={() => setAlertVisible(true)}
      />

      <Alert
        context="error"
        title="Error"
        message="Something went wrong"
        onClose={() => console.log("Error alert closed")}
      />

      <Alert
        context="warning"
        title="Warning"
        message="There is a warning"
        onClose={() => console.log("Warning alert closed")}
      />

      <Alert
        context="info"
        title="Info"
        message="This is an informational message"
        onClose={() => console.log("Info alert closed")}
      />
    </View>
  );
};

export default App;

// import "react-native-gesture-handler";
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import Header from "./components/Header";
// import Home from "./pages/HomePage";

// const Stack = createStackNavigator();

// const breadcrumbItems = [
//   { label: "Home", link: "Home" },
//   { label: "ListeRessource", link: "ListeRessource" },
//   { label: "Profil", link: "Profil" },
//   { label: "AjoutRessource", link: "AjoutRessource" },
// ];

// const App: React.FC = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Header />
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={Home} />
//           {/* <Stack.Screen name="ListeRessource" component={ListeRessource} />
//           <Stack.Screen name="Profil" component={Profil} />
//           <Stack.Screen name="AjoutRessource" component={AjoutRessource} /> */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;
