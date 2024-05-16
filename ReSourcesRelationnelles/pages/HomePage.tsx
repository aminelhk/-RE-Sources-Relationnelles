import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";

const HomePage: React.FC = () => {
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
