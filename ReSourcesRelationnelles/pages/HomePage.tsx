import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import Card from "components/CardList";
import Accordion from "components/Accordion";

const HomePage: React.FC = () => {
  const [isExpended, setIsExpended] = useState(false);
  return (
    <View style={styles.container}>
      <Header
        brandTop={<>(Re)Sources relationnelles</>}
        homeLinkProps={{
          href: "/",
          title:
            "Accueil - (Re)Sources Relationnelles ministère de la santé et de la prévention",
        }}
        id="fr-header-header-with-quick-access-items"
        quickAccessItems={[
          {
            iconId: "add-circle-outline",
            linkProps: {
              href: "#",
            },
            text: "Gestion des ressources",
          },
          {
            iconId: "mail-outline",
            linkProps: {
              href: "mailto:contact@code.gouv.fr",
            },
            text: "Contact",
          },
          {
            buttonProps: {
              onClick: () => {},
            },
            iconId: "account-box-outline",
            text: "Se connecter",
          },
        ]}
        serviceTagline="baseline - précisions sur l'organisation"
        serviceTitle="Nom du site / service"
      />
      {/* Autres composants ou contenu de la page */}
      <Accordion
        title={"Name of the Accordion"}
        onPress={() => {
          setIsExpended(!isExpended);
        }}
        isExpended={isExpended}
      >
        <View>
          <Text>Je suis la</Text>
        </View>
      </Accordion>
      <Card />
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