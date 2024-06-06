import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Header from '../components/Header'
import CardList from '../components/CardList'
import Resource from '../types/Resource'

const HomePage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([])
  useEffect(() => {
    // Effectuer des appels API ou des actions asynchrones ici
    fetch('http://localhost:3000/api/resources')
      .then(response => response.json())
      .then(data => {
        // Faire quelque chose avec les données
        setResources(data)
        console.log(data)
      })
      .catch(error => {
        // Gérer l'erreur
        console.error(error.message)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Header
        brandTop={<>(Re)Sources relationnelles</>}
        homeLinkProps={{
          href: '/',
          title: 'Accueil - (Re)Sources Relationnelles ministère de la santé et de la prévention',
        }}
        id='fr-header-header-with-quick-access-items'
        quickAccessItems={[
          {
            iconId: 'add-circle-outline',
            linkProps: {
              href: '#',
            },
            text: 'Gestion des ressources',
          },
          {
            iconId: 'mail-outline',
            linkProps: {
              href: 'mailto:contact@code.gouv.fr',
            },
            text: 'Contact',
          },
          {
            buttonProps: {
              onClick: () => {},
            },
            iconId: 'account-box-outline',
            text: 'Se connecter',
          },
        ]}
        serviceTagline="baseline - précisions sur l'organisation"
        serviceTitle='Nom du site / service'
      />
      {/* Autres composants ou contenu de la page */}
      <CardList resources={resources} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default HomePage
