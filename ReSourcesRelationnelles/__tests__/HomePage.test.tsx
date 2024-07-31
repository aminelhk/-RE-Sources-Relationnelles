import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import HomePage from '../pages/HomePage'
import { AuthContext } from '../context/AuthContext'
import useAxios from '../axiosConfig'
import { Platform } from 'react-native'
import ErrorBoundary from '../components/ErrorBoundary' // Assurez-vous que le chemin est correct

jest.mock('../axiosConfig', () =>
  jest.fn().mockReturnValue({
    get: jest.fn(),
  }),
)

beforeEach(() => {
  Platform.OS = 'web' // Simuler la plateforme web

  const mockResponse = {
    ok: true,
    status: 200,
    json: jest
      .fn()
      .mockResolvedValue([{ title: 'ajout de mon nouveau yacht' }, { title: 'mon nouveau yacht' }]),
  } as unknown as Response

  jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse)
})

afterEach(() => {
  jest.clearAllMocks()
})

const mockAuthContextValue = {
  isAuth: true,
  token: 'fakeToken',
  setIsAuth: jest.fn(),
  setToken: jest.fn(),
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

describe('HomePage', () => {
  beforeEach(() => {
    ;(useAxios as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: [{ title: 'ajout de mon nouveau yacht' }, { title: 'mon nouveau yacht' }],
      }),
    })
  })

  it('should render home page correctly when authenticated', async () => {
    const { getByText, debug } = render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <NavigationContainer>
          <ErrorBoundary>
            <HomePage navigation={mockNavigation as any} />
          </ErrorBoundary>
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    await waitFor(() => {
      debug() // Ajoute cette ligne pour imprimer le DOM
      expect(getByText('ajout de mon nouveau yacht')).toBeTruthy()
      expect(getByText('mon nouveau yacht')).toBeTruthy()
    })
  })

  it('should handle search correctly', async () => {
    const { getByPlaceholderText, getByText, debug } = render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <NavigationContainer>
          <ErrorBoundary>
            <HomePage navigation={mockNavigation as any} />
          </ErrorBoundary>
        </NavigationContainer>
      </AuthContext.Provider>,
    )

    fireEvent.changeText(getByPlaceholderText('Rechercher'), 'ajout de mon nouveau yacht')
    fireEvent.press(getByText('Rechercher'))

    await waitFor(() => {
      debug() // Ajoute cette ligne pour imprimer le DOM
      expect(getByText('ajout de mon nouveau yacht')).toBeTruthy()
      expect(() => getByText('Resource 2')).toThrow() // Should not find 'Resource 2'
    })
  })
})
