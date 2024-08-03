import React from 'react'
import { render, fireEvent, waitFor, act, cleanup } from '@testing-library/react-native'
import HomePage from '../pages/HomePage'
import { AuthContext } from '../context/AuthContext'
import useAxios from '../axiosConfig'
import { NavigationContainer } from '@react-navigation/native'

// Mock axios module
jest.mock('../axiosConfig', () =>
  jest.fn().mockReturnValue({
    get: jest.fn(),
  }),
)

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
  dispatch: jest.fn(),
  canGoBack: jest.fn(),
  getId: jest.fn(),
  getState: jest.fn(),
  getParent: jest.fn(),
  setOptions: jest.fn(),
}

describe('HomePage', () => {
  beforeEach(() => {
    ;(useAxios as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({
        data: [{ title: 'ajout de mon nouveau yacht' }, { title: 'mon nouveau yacht' }],
      }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup() // Nettoyage des tests
  })

  it('should render home page correctly when authenticated', async () => {
    await act(async () => {
      const { getByText, debug } = render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <NavigationContainer>
            <HomePage navigation={mockNavigation as any} />
          </NavigationContainer>
        </AuthContext.Provider>,
      )

      await waitFor(
        () => {
          debug() // Imprime le DOM pour débogage
          expect(getByText('ajout de mon nouveau yacht')).toBeTruthy()
          expect(getByText('mon nouveau yacht')).toBeTruthy()
        },
        { timeout: 10000 },
      )
    }, 10000)
  })

  it('should handle search correctly', async () => {
    await act(async () => {
      const { getByPlaceholderText, getByTestId, getByText, queryByText, debug } = render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <NavigationContainer>
            <HomePage navigation={mockNavigation as any} />
          </NavigationContainer>
        </AuthContext.Provider>,
      )

      fireEvent.changeText(getByPlaceholderText('Rechercher'), 'ajout de mon nouveau yacht')
      fireEvent.press(getByTestId('search-button'))

      await waitFor(
        () => {
          debug() // Imprime le DOM pour débogage
          expect(getByText('ajout de mon nouveau yacht')).toBeTruthy()
          expect(queryByText('mon nouveau yacht')).toThrow() // Should not find 'mon nouveau yacht'
        },
        { timeout: 10000 },
      )
    }, 10000)
  })
})
