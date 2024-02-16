import { Header } from "@codegouvfr/react-dsfr/Header";
import { Badge } from "@codegouvfr/react-dsfr/Badge";

// Version mobile avec burger menu pour ouvrir le header
// import { useIsHeaderMenuModalOpen } from "@codegouvfr/react-dsfr/Header/useIsHeaderMenuModalOpen";
// const isOpen = useIsHeaderMenuModalOpen();


<Header
  brandTop={<>INTITULE<br />OFFICIEL</>}
  homeLinkProps={{
    href: '/',
    title: 'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)'
  }}
  id="fr-header-simple-header-with-service-title-and-tagline"
  serviceTitle={<>Nom du site / service{' '}<Badge as="span" noIcon severity="success">Beta</Badge></>}
/>