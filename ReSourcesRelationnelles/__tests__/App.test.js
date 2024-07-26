import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import App from '../App'

jest.mock('../pages/LoginPage', () => {
  return ({ navigation, isAuth, setIsAuth }) => (
    <div>
      <input placeholder='Entrez votre adresse mail' onChange={e => e.target.value} />
      <input placeholder='Entrez votre mot de passe' onChange={e => e.target.value} />
      <button onClick={() => setIsAuth(true)}>Confirmer</button>
    </div>
  )
})

jest.mock('../pages/HomePage', () => {
  return () => (
    <div>
      <h1>Accueil</h1>
    </div>
  )
})

describe('App', () => {
  it('should render login screen initially', () => {
    const { getByPlaceholderText, getByText } = render(<App />)

    expect(getByPlaceholderText('Entrez votre adresse mail')).toBeTruthy()
    expect(getByPlaceholderText('Entrez votre mot de passe')).toBeTruthy()
    expect(getByText('Confirmer')).toBeTruthy()
  })

  it('should navigate to home screen upon successful login', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />)

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse mail'), 'test@example.com')
    fireEvent.changeText(getByPlaceholderText('Entrez votre mot de passe'), 'password123')
    fireEvent.press(getByText('Confirmer'))

    await waitFor(() => {
      expect(queryByText('Accueil')).toBeTruthy()
    })
  })

  it('should display home screen if user is authenticated', async () => {
    const { getByText, queryByPlaceholderText } = render(<App />)

    fireEvent.press(getByText('Confirmer'))

    await waitFor(() => {
      expect(queryByPlaceholderText('Entrez votre adresse mail')).toBeNull()
      expect(getByText('Accueil')).toBeTruthy()
    })
  })
})
