import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../pages/LoginPage'
import { AuthContext } from '../context/AuthContext'
import { cleanup } from '@testing-library/react-native'

const mockAxios = new MockAdapter(axios)

afterEach(() => {
  cleanup()
})

describe('LoginScreen', () => {
  const setIsAuth = jest.fn()
  const setToken = jest.fn()
  const mockContextValue = {
    isAuth: false,
    token: '', // Initialisez le token comme une chaîne vide pour correspondre au type attendu
    setIsAuth,
    setToken,
  }

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    isFocused: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }

  afterEach(() => {
    mockAxios.reset()
    jest.clearAllMocks()
  })

  it('should render login screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={mockContextValue}>
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation as any} />
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    expect(getByPlaceholderText('Entrez votre adresse mail')).toBeTruthy()
    expect(getByPlaceholderText('Entrez votre mot de passe')).toBeTruthy()
    expect(getByText('Confirmer')).toBeTruthy()
    expect(getByText("S'inscrire")).toBeTruthy()
  })

  it('should handle login with valid credentials', async () => {
    mockAxios.onPost('http://localhost:3000/api/users/login').reply(200, { token: 'fakeToken' })

    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={mockContextValue}>
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation as any} />
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'password123')
    fireEvent.press(getByText('Confirmer'))

    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith('fakeToken')
      expect(setIsAuth).toHaveBeenCalledWith(true)
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home')
    })
  })

  it('should show error message for invalid credentials', async () => {
    mockAxios.onPost('http://localhost:3000/api/users/login').reply(401)

    const { getByPlaceholderText, getByText, findByText } = render(
      <AuthContext.Provider value={mockContextValue}>
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation as any} />
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'password123')
    fireEvent.press(getByText('Confirmer'))

    const errorMessage = await findByText('Erreur de connexion, veuillez réessayer')
    expect(errorMessage).toBeTruthy()
  })

  it('should handle registration with valid input', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={mockContextValue}>
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation as any} />
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    fireEvent.press(getByText("S'inscrire"))

    fireEvent.changeText(getByPlaceholderText('Entrez votre prénom'), 'John')
    fireEvent.changeText(getByPlaceholderText('Entrez votre nom'), 'Doe')
    fireEvent.changeText(getByPlaceholderText('Entrez votre numéro de téléphone'), '0123456789')
    fireEvent.changeText(getByPlaceholderText('Entrez votre pseudo'), 'johndoe')
    fireEvent.changeText(
      getByPlaceholderText('Entrez votre numéro de carte vitale'),
      '1 23 45 67 890 123 45',
    )
    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'amine@live.fr')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'amine1234')
    fireEvent.press(getByText('Confirmer'))

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1)
      expect(mockAxios.history.post[0].url).toBe('http://localhost:3000/api/users/createUser')
    })
  })

  it('should show error message on registration failure', async () => {
    mockAxios.onPost('http://localhost:3000/api/users/createUser').reply(400)

    const { getByPlaceholderText, getByText, findByText } = render(
      <AuthContext.Provider value={mockContextValue}>
        <NavigationContainer>
          <LoginScreen navigation={mockNavigation as any} />
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    fireEvent.press(getByText("S'inscrire"))

    fireEvent.changeText(getByPlaceholderText('Entrez votre prénom'), 'John')
    fireEvent.changeText(getByPlaceholderText('Entrez votre nom'), 'Doe')
    fireEvent.changeText(getByPlaceholderText('Entrez votre numéro de téléphone'), '0123456789')
    fireEvent.changeText(getByPlaceholderText('Entrez votre pseudo'), 'johndoe')
    fireEvent.changeText(
      getByPlaceholderText('Entrez votre numéro de carte vitale'),
      '1 23 45 67 890 123 45',
    )
    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'password123')
    fireEvent.press(getByText('Confirmer'))

    const errorMessage = await findByText('Une erreur est survenue lors de la création du compte.')
    expect(errorMessage).toBeTruthy()
  })
})
