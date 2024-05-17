import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View>
      <View>
        <View>
          <View>
            <View>
              <View>
                <View>
                  <Text>
                    Intitulé
                    {"\n"}officiel
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={() => console.log("Accueil")}>
                  <Text>Nom du site / service</Text>
                </TouchableOpacity>
                <Text>baseline - précisions sur l‘organisation</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
