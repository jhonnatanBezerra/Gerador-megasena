import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Gerasenha } from '../pages/gerasenha';
import { Home } from '../pages/home';
import { Megasena } from '../pages/megasena';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Megasena" component={Megasena} />
        <Stack.Screen name="Gerasenhas" component={Gerasenha} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

