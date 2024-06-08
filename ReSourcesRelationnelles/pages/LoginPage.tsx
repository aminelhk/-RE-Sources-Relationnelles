import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import styles from '../assets/style/loginForm' // Importing the styles from the external file
import RegisterPage from './RegisterPage'

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [createAccount, setCreateAccount] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [pseudo, setPseudo] = useState<string>('')
  const [vitalCardNumber, setVitalCardNumber] = useState<string>('')
  const [registerError, setRegisterError] = useState<string | null>(null)

  const handleLogin = async () => {
    console.log('Login button pressed')
    console.log('Email:', email)
    console.log('Password:', password)

    if (!validateEmail(email) || !validatePassword(password)) {
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      })

      console.log('Response:', response)

      if (response.status === 200) {
        Alert.alert('Success', 'Vous êtes maintenant connecté')
        navigation.navigate('Home')
      }
    } catch (error) {
      console.log('Error:', error)
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setLoginError('Erreur de connexion, veuillez réessayer')
        } else {
          Alert.alert('Error', 'Une erreur est survenue')
        }
      } else {
        Alert.alert('Error', 'Une erreur est survenue')
      }
    }
  }

  const handleRegister = async () => {
    console.log('Register button pressed')
    console.log('Email:', email)
    console.log('Password:', password)

    if (!validateEmail(email) || !validatePassword(password)) {
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/createUser', {
        email,
        firstName,
        lastName,
        phone,
        password,
        pseudo,
        isActive: false,
        isPrivate: false,
        vitalCardNumber,
        roleId: 5, // Default roleId to 5
      })

      console.log('Response:', response)

      if (response.status === 201) {
        Alert.alert('Success', 'Compte créé avec succès')
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log('Error:', error)
      setRegisterError('Une erreur est survenue lors de la création du compte.')
    }
  }

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('Veuillez entrer une adresse mail.')
      return false
    }
    if (!email.includes('@')) {
      setEmailError('L\'adresse mail doit contenir un "@"')
      return false
    }
    setEmailError(null)
    return true
  }

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Veuillez entrer un mot de passe.')
      return false
    }
    if (password.length < 6) {
      setPasswordError('Adresse mail ou mot de passe non valide.')
      return false
    }
    setPasswordError(null)
    return true
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {!createAccount ? (
          <View>
            <Text style={styles.label}>Adresse mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              placeholder='Entrez votre adresse mail'
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder='Entrez votre mot de passe'
            />
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder='Entrez votre prénom'
            />

            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder='Entrez votre nom'
            />

            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType='phone-pad'
              placeholder='Entrez votre numéro de téléphone'
            />

            <Text style={styles.label}>Pseudo</Text>
            <TextInput
              style={styles.input}
              value={pseudo}
              onChangeText={setPseudo}
              placeholder='Entrez votre pseudo'
            />

            <Text style={styles.label}>Numéro de carte vitale</Text>
            <TextInput
              style={styles.input}
              value={vitalCardNumber}
              onChangeText={setVitalCardNumber}
              placeholder='Entrez votre numéro de carte vitale'
            />

            <Text style={styles.label}>Adresse mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              placeholder='Entrez votre adresse mail'
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder='Entrez votre mot de passe'
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={!createAccount ? handleLogin : handleRegister}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>

        {loginError && <Text style={styles.errorText}>{loginError}</Text>}
        {registerError && <Text style={styles.errorText}>{registerError}</Text>}

        <TouchableOpacity style={styles.button} onPress={() => setCreateAccount(!createAccount)}>
          <Text style={styles.buttonText}>
            {!createAccount ? "S'inscrire" : 'Créer votre compte'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen
