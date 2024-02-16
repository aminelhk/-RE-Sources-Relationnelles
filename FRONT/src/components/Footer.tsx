import React from "react";

import { Footer } from "@codegouvfr/react-dsfr/Footer";

export default function FooterComponent(){
    return(
        <Footer
  accessibility="fully compliant"
  contentDescription="
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    "
  license={<>Unless stated otherwise all content of this website are under{' '}<a href="https://github.com/codegouvfr/react-dsfr/blob/main/LICENSE" target="_blank">licence MIT</a>{' '}</>}
/>)
}

