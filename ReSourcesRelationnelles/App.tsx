import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './pages/LoginPage'
import HomeScreen from './pages/HomePage'
import DonneesPerso from './pages/DonneesPerso'
import MentionsLegales from './pages/MentionsLegales'

const Stack = createStackNavigator()

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Login'>
          {props => <LoginScreen {...props} isAuth={isAuth} setIsAuth={setIsAuth} />}
        </Stack.Screen>
        <Stack.Screen name='Mentions Légales' component={MentionsLegales} />
        <Stack.Screen name='Données Personnelles' component={DonneesPerso} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
