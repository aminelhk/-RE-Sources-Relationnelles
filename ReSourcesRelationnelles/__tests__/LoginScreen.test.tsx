import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { NavigationContainer } from '@react-navigation/native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import LoginScreen from '../pages/LoginPage'

const mockAxios = new MockAdapter(axios)

// Créez un type partiel pour NavigationProp
type MockedNavigationProp = Partial<NavigationProp<ParamListBase>>

describe('LoginScreen', () => {
  // Créez un objet navigation simulé
  const navigation: MockedNavigationProp = {
    navigate: jest.fn(),
  }
  const setIsAuth = jest.fn()

  afterEach(() => {
    mockAxios.reset()
    jest.clearAllMocks()
  })

  it('should render login screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen
          navigation={navigation as NavigationProp<ParamListBase>}
          isAuth={false}
          setIsAuth={setIsAuth}
        />
      </NavigationContainer>,
    )

    expect(getByPlaceholderText('Entrez votre adresse mail')).toBeTruthy()
    expect(getByPlaceholderText('Entrez votre mot de passe')).toBeTruthy()
    expect(getByText('Confirmer')).toBeTruthy()
    expect(getByText("S'inscrire")).toBeTruthy()
  })

  it('should show error for invalid email', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen
          navigation={navigation as NavigationProp<ParamListBase>}
          isAuth={false}
          setIsAuth={setIsAuth}
        />
      </NavigationContainer>,
    )

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'invalidEmail')
    fireEvent.press(getByText('Confirmer'))

    expect(getByText('L\'adresse mail doit contenir un "@"')).toBeTruthy()
  })

  it('should show error for invalid password', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen
          navigation={navigation as NavigationProp<ParamListBase>}
          isAuth={false}
          setIsAuth={setIsAuth}
        />
      </NavigationContainer>,
    )

    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'short')
    fireEvent.press(getByText('Confirmer'))

    expect(getByText('Adresse mail ou mot de passe non valide.')).toBeTruthy()
  })

  it('should login successfully', async () => {
    mockAxios.onPost('http://localhost:3000/api/users/login').reply(200, {
      token: 'fakeToken',
    })

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen
          navigation={navigation as NavigationProp<ParamListBase>}
          isAuth={false}
          setIsAuth={setIsAuth}
        />
      </NavigationContainer>,
    )

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'password123')
    fireEvent.press(getByText('Confirmer'))

    await waitFor(() => {
      expect(setIsAuth).toHaveBeenCalledWith(true)
      expect(navigation.navigate).toHaveBeenCalledWith('Home', { isAuth: false })
    })
  })

  it('should show login error for invalid credentials', async () => {
    mockAxios.onPost('http://localhost:3000/api/users/login').reply(401)

    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <LoginScreen
          navigation={navigation as NavigationProp<ParamListBase>}
          isAuth={false}
          setIsAuth={setIsAuth}
        />
      </NavigationContainer>,
    )

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'wrongpassword')
    fireEvent.press(getByText('Confirmer'))

    const errorText = await findByText('Erreur de connexion, veuillez réessayer')
    expect(errorText).toBeTruthy()
  })
})
