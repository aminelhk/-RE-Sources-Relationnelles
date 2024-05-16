import React from "react";
import { Header } from "@codegouvfr/react-dsfr/Header";

const HeaderGouv: React.FC = () => {
  return (
    <Header
      brandTop={
        <>
          INTITULE
          <br />
          OFFICIEL
        </>
      }
      homeLinkProps={{
        href: "/",
        title:
          "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
      }}
      id="fr-header-header-with-quick-access-items"
      quickAccessItems={[
        {
          iconId: "fr-icon-add-circle-line",
          linkProps: {
            href: "#",
          },
          text: "Créer un espace",
        },
        {
          iconId: "fr-icon-mail-fill",
          linkProps: {
            href: "mailto:contact@code.gouv.fr",
          },
          text: "Contact us",
        },
        {
          buttonProps: {
            onClick: function noRefCheck() {},
          },
          iconId: "ri-account-box-line",
          text: "Se connecter",
        },
      ]}
      serviceTagline="baseline - précisions sur l'organisation"
      serviceTitle="Nom du site / service"
    />
  );
};

export default HeaderGouv;
