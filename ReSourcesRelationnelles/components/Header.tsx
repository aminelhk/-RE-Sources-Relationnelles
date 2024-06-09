import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useWindowDimensions } from 'react-native'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { width } = useWindowDimensions()
  const isMobile = width < 768
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get('token')
      if (token) {
        setIsAuthenticated(true)
        console.log('Utilisateur authentifié')
      } else {
        setIsAuthenticated(false)
        console.log('Utilisateur non authentifié')
      }
    }

    fetchToken()
  }, [])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout')
      Cookies.remove('token')
      setIsAuthenticated(false)
      navigation.navigate('Login')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBodyRow}>
          <View style={styles.headerBrand}>
            <Image
              source={require('../assets/Logo_de_la_République_française.png')}
              style={styles.frLogoImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.frHeaderServiceTitle}>(Re)Sources Relationnelles</Text>
              <Text style={styles.frHeaderServiceTagline}>
                Ministère de la santé et de la prévention
              </Text>
            </View>
          </View>
          {isMobile ? (
            <TouchableOpacity onPress={toggleMenu} style={styles.burgerMenuButton}>
              <Text style={styles.burgerMenuIcon}>☰</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerMenu}>
              <View style={styles.menuContainer}>
                <View style={styles.navigation}>
                  <View style={styles.navList}>
                    <TouchableOpacity style={styles.navItem}>
                      <Text style={styles.navLink}>Accès direct 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                      <Text style={styles.navLink}>Accès direct 2</Text>
                    </TouchableOpacity>
                    {isAuthenticated ? (
                      <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                        <Text style={styles.navLink}>Déconnexion</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.navLink}>Connexion</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
      {isMobile && menuVisible && (
        <View style={styles.mobileMenu}>
          <TouchableOpacity style={styles.navItem} onPress={toggleMenu}>
            <Text style={styles.navLink}>Accès direct 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={toggleMenu}>
            <Text style={styles.navLink}>Accès direct 2</Text>
          </TouchableOpacity>
          {isAuthenticated ? (
            <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
              <Text style={styles.navLink}>Déconnexion</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.navLink}>Connexion</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  headerBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frLogoImage: {
    width: 126,
    height: 'auto',
    aspectRatio: 4 / 2, // Ratio ajusté pour l'image
    resizeMode: 'contain',
  },
  frHeaderServiceTitle: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
  },
  frHeaderServiceTagline: {
    fontSize: 14,
    lineHeight: 24,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  headerMenu: {
    marginLeft: 'auto',
    elevation: 1,
  },
  menuContainer: {
    padding: 16,
  },
  navigation: {
    marginVertical: 16,
  },
  navList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  navItem: {
    marginLeft: 16,
  },
  navLink: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007BFF',
    borderRadius: 4,
    textAlign: 'center',
  },
  burgerMenuButton: {
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  burgerMenuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  mobileMenu: {
    position: 'absolute',
    top: 70,
    right: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
})

export default Header
