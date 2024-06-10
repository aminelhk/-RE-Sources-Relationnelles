import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

const DonneesPerso: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Données personnelles</Text>
      <Text style={styles.sectionTitle}>Responsable du traitement :</Text>
      <Text style={styles.text}>
        Ministère de la Santé et des Relations Sociales{'\n'}
        Adresse : [Adresse du Ministère]{'\n'}
        Téléphone : [Numéro de téléphone]{'\n'}
        Email : [Adresse email de contact]
      </Text>
      <Text style={styles.sectionTitle}>Nature des données collectées :</Text>
      <Text style={styles.text}>
        Dans le cadre de l'utilisation des services du site, le Ministère de la Santé et des
        Relations Sociales est susceptible de collecter les catégories de données suivantes
        concernant ses utilisateurs :{'\n'}- Données d'identification (nom, prénom, adresse email,
        numéro de téléphone, etc.)
        {'\n'}- Données de connexion (adresses IP, journaux d'événements, etc.)
        {'\n'}- Données relatives à la navigation (cookies, historiques de navigation, etc.)
      </Text>
      <Text style={styles.sectionTitle}>Finalités du traitement des données :</Text>
      <Text style={styles.text}>
        Les données personnelles collectées sont utilisées pour les finalités suivantes :{'\n'}-
        Gestion des inscriptions et authentifications sur le site
        {'\n'}- Envoi d'informations et communications par le Ministère
        {'\n'}- Amélioration des services proposés
        {'\n'}- Analyse de la fréquentation et de l'usage du site
      </Text>
      <Text style={styles.sectionTitle}>Destinataires des données :</Text>
      <Text style={styles.text}>
        Les données personnelles collectées sont destinées exclusivement au Ministère de la Santé et
        des Relations Sociales et ne seront en aucun cas transmises à des tiers sans le consentement
        préalable de l'utilisateur, sauf si la loi l'exige.
      </Text>
      <Text style={styles.sectionTitle}>Conservation des données :</Text>
      <Text style={styles.text}>
        Les données personnelles sont conservées uniquement pour la durée nécessaire aux finalités
        pour lesquelles elles sont collectées et traitées. Au-delà de cette durée, elles seront
        supprimées ou anonymisées.
      </Text>
      <Text style={styles.sectionTitle}>Droits des utilisateurs :</Text>
      <Text style={styles.text}>
        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
        Informatique et Libertés, les utilisateurs disposent des droits suivants sur leurs données :
        {'\n'}- Droit d'accès : droit d'obtenir des informations sur les données personnelles
        détenues par le Ministère
        {'\n'}- Droit de rectification : droit de demander la correction des données personnelles
        inexactes ou incomplètes
        {'\n'}- Droit à l'effacement : droit de demander la suppression des données personnelles
        dans certaines conditions
        {'\n'}- Droit à la limitation du traitement : droit de demander que le traitement des
        données soit limité dans certaines conditions
        {'\n'}- Droit à la portabilité : droit de recevoir les données personnelles fournies dans un
        format structuré, couramment utilisé et lisible par machine
        {'\n'}- Droit d'opposition : droit de s'opposer au traitement des données personnelles dans
        certaines conditions
      </Text>
      <Text style={styles.text}>
        Pour exercer ces droits, les utilisateurs peuvent contacter le Délégué à la Protection des
        Données (DPO) du Ministère de la Santé et des Relations Sociales à l'adresse suivante :
        [Adresse email du DPO]
      </Text>
      <Text style={styles.sectionTitle}>Sécurité des données :</Text>
      <Text style={styles.text}>
        Le Ministère de la Santé et des Relations Sociales met en œuvre des mesures techniques et
        organisationnelles appropriées pour protéger les données personnelles contre la destruction,
        la perte, l'altération, la divulgation ou l'accès non autorisé.
      </Text>
      <Text style={styles.sectionTitle}>Cookies :</Text>
      <Text style={styles.text}>
        Le site utilise des cookies pour améliorer l'expérience utilisateur, analyser le trafic et
        personnaliser les contenus. Les utilisateurs peuvent configurer leur navigateur pour refuser
        les cookies, mais cela peut altérer leur expérience de navigation sur le site.
      </Text>
      <Text style={styles.sectionTitle}>Modification de la politique de confidentialité :</Text>
      <Text style={styles.text}>
        Le Ministère de la Santé et des Relations Sociales se réserve le droit de modifier la
        présente politique de confidentialité à tout moment. Les utilisateurs sont invités à
        consulter cette page régulièrement pour prendre connaissance des éventuelles modifications.
      </Text>
      <Text style={styles.sectionTitle}>Contact :</Text>
      <Text style={styles.text}>
        Pour toute question relative à cette politique de confidentialité, les utilisateurs peuvent
        contacter le Ministère de la Santé et des Relations Sociales à l'adresse suivante : [Adresse
        email de contact]
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
  },
})

export default DonneesPerso
