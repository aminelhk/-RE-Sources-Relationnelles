import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import TextFr from '../components/TextFr'

const MentionsLegales: React.FC = () => {
  return (
    <ScrollView>
      <TextFr number={1} text='Mentions légales' />
      <TextFr number={2} text='Éditeur du site :' />
      <TextFr
        text="Ministère de la Santé et des Relations Sociales{'\n'}
        Adresse : [Adresse du Ministère]{'\n'}
        Téléphone : [Numéro de téléphone]{'\n'}
        Email : [Adresse email de contact]{'\n'}
        Directeur de la publication : [Nom du directeur]"
      />
      <TextFr number={2} text='Hébergement du site :' />
      <TextFr
        text="Nom de l'hébergeur : [Nom de l'hébergeur]
        Adresse : [Adresse de l'hébergeur]
        Téléphone : [Numéro de téléphone de l'hébergeur]
        Email : [Adresse email de contact de l'hébergeur]"></TextFr>
      <TextFr number={2} text='Propriété intellectuelle :' />
      <TextFr
        text="Tous les contenus présents sur ce site, incluant, de manière non limitative, les graphismes,
        images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme
        sont la propriété exclusive du Ministère de la Santé et des Relations Sociales à l'exception
        des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs."
      />
      <TextFr text="Droits d'auteur et propriété intellectuelle :" />
      <TextFr
        text="Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
        même partielle, de ces différents éléments est strictement interdite sans l'accord exprès
        par écrit du Ministère de la Santé et des Relations Sociales. Cette représentation ou
        reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les
        articles L.335-2 et suivants du Code de la propriété intellectuelle."
      />
      <TextFr text='Liens hypertextes :' />
      <TextFr
        text="Le site du Ministère de la Santé et des Relations Sociales peut offrir des liens vers
        d’autres sites internet ou d’autres ressources disponibles sur Internet. Le Ministère de la
        Santé et des Relations Sociales ne dispose d'aucun moyen pour contrôler les sites en
        connexion avec ses sites internet. Le Ministère de la Santé et des Relations Sociales ne
        répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. Il ne
        peut être tenu pour responsable de tout dommage, de quelque nature que ce soit, résultant du
        contenu de ces sites ou sources externes, et notamment des informations, produits ou
        services qu'ils proposent, ou de tout usage qui peut être fait de ces éléments."
      />
      <TextFr text='Responsabilité :' />
      <TextFr
        text="L’utilisateur du site reconnaît avoir pris connaissance des présentes conditions
        d’utilisation et s’engage à les respecter. L’utilisateur du site internet reconnaît disposer
        de la compétence et des moyens nécessaires pour accéder et utiliser ce site. L’utilisateur
        du site internet reconnaît avoir vérifié que la configuration informatique utilisée ne
        contient aucun virus et qu’elle est en parfait état de fonctionnement. Le Ministère de la
        Santé et des Relations Sociales met tout en œuvre pour offrir aux utilisateurs des
        informations et/ou outils disponibles et vérifiés mais ne saurait être tenu pour responsable
        des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus
        sur son site."
      />
      <TextFr text='Modification des mentions légales :' />
      <TextFr
        text="Le Ministère de la Santé et des Relations Sociales se réserve le droit de modifier ces
        mentions à tout moment. L'utilisateur s'engage donc à les consulter régulièrement."
      />
      <TextFr text='Loi applicable et juridiction compétente :' />
      <TextFr
        text='Les présentes mentions légales sont soumises au droit français. En cas de litige, et à
        défaut de résolution amiable, le litige sera porté devant les tribunaux français
        conformément aux règles de compétence en vigueur.'
      />
    </ScrollView>
  )
}

export default MentionsLegales
