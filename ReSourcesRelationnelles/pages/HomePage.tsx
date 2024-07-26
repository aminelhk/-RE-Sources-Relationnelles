import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Platform, ScrollView } from 'react-native'

import Header from '../components/Header'
import Footer from '../components/Footer'
import CardList from '../components/CardList'
import Resource from '../types/Resource'
import SearchBar from '../components/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../context/AuthContext' // Importez votre contexte d'authentification
import useAxios from '../axiosConfig' // Utilisez votre configuration axios

const HomePage: React.FC = () => {
  const { isAuth } = useContext(AuthContext)
  const axios = useAxios()
  // Nouvel état pour stocker la recherche de l'utilisateur
  const [search, setSearch] = useState('')
  // Nouvel état pour stocker les ressources recherchées
  const [searchedResources, setSearchedResources] = useState<Resource[]>([])
  // Nouvel état pour stocker la liste originale des ressources
  const [originalResources, setOriginalResources] = useState<Resource[]>([])
  // Nouvel état pour stocker la visibilité de la modal
  const [isModalVisible, setIsModalVisible] = useState(false)

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

  useEffect(() => {
    if (isAuth) {
      axios
        .get('/resources')
        .then(response => {
          setOriginalResources(response.data)
          setSearchedResources(response.data)
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }, [isAuth])

  // Fonction pour gérer la recherche
  const handleSearch = () => {
    const res = originalResources.filter(r => r.title.includes(search))
    setSearchedResources(res)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Header
            route={{
              params: {
                isAuth: false,
                setIsAuth: false,
              },
            }}
            navigation={{
              navigate: function (screen: string): void {
                throw new Error('Function not implemented.')
              },
            }}
          />
        </View>
        {/* Autres composants ou contenu de la page */}
        <SearchBar recherche={search} setRecherche={setSearch} onPress={handleSearch} />
        <CardList
          resources={searchedResources}
          setResources={setSearchedResources}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
})

export default HomePage
