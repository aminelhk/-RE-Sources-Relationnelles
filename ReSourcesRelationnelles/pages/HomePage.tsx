import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../components/Header'
import CardList from '../components/CardList'
import Resource from '../types/Resource'
import SearchBar from '../components/SearchBar'

const HomePage: React.FC = () => {
  // Nouvel état pour stocker la recherche de l'utilisateur
  const [search, setSearch] = useState('')
  // Nouvel état pour stocker les ressources recherchées
  const [searchedResources, setSearchedResources] = useState<Resource[]>([])
  // Nouvel état pour stocker la liste originale des ressources
  const [originalResources, setOriginalResources] = useState<Resource[]>([])

  // Utiliser un effet pour charger les ressources
  useEffect(() => {
    // Effectuer des appels API ou des actions asynchrones
    fetch('http://localhost:3000/api/resources')
      // Récupérer les données
      .then(response => response.json())
      .then((data: Resource[]) => {
        // Stocker les données dans l'état des ressources originales
        setOriginalResources(data)
        // Stocker les données dans l'état des ressources recherchées
        setSearchedResources(data)
      })
      .catch(error => {
        // Gérer l'erreur
        console.error(error.message)
      })
  }, [])

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    const res = originalResources.filter(r => r.title.includes(search))
    setSearchedResources(res)
  }

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
      <SearchBar recherche={search} setRecherche={setSearch} onPress={handleSearch} />
      <CardList resources={searchedResources} />
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
