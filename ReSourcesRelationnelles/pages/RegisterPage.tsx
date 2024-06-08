import React, { useState } from 'react'
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import styles from '../assets/style/registerForm' // Reuse the same styles as login

interface RegisterScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [pseudo, setPseudo] = useState<string>('')
  const [vitalCardNumber, setVitalCardNumber] = useState<string>('')
  const [registerError, setRegisterError] = useState<string | null>(null)

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
      setRegisterError('Veuillez entrer une adresse mail.')
      return false
    }
    if (!email.includes('@')) {
      setRegisterError('L\'adresse mail doit contenir un "@"')
      return false
    }
    setRegisterError(null)
    return true
  }

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setRegisterError('Veuillez entrer un mot de passe.')
      return false
    }
    if (password.length < 6) {
      setRegisterError('Le mot de passe doit contenir au moins 6 caractères.')
      return false
    }
    setRegisterError(null)
    return true
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
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

        {registerError && <Text style={styles.errorText}>{registerError}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Créer le compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen
