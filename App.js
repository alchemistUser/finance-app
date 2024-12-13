import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './pages/Home';
import About from './pages/About';
import Transactions from './pages/Transactions';

const Stack = createStackNavigator();

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation, route }) => ({
          headerLeft: () => {
            if (route.name === 'Home') {
              // On Home screen, don't show a clickable back button
              return (
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="transparent" // Make the back button completely transparent
                  style={{ marginLeft: 10 }}
                />
              );
            } else {
              return (
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="white"  // Show the back button normally for other screens
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 10 }}
                />
              );
            }
          },
          headerStyle: { backgroundColor: '#413931' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Cash',
            headerTitleAlign: 'left',
            headerTitleStyle: { fontSize: 35, marginLeft: 10 },
          }}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{
            headerTitle: 'Transactions',
            headerTitleStyle: { fontSize: 25 },
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerTitle: 'About',
            headerTitleAlign: 'left',
            headerTitleStyle: { fontSize: 35, marginLeft: 10 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
