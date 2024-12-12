// App.js

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Home from './pages/Home';
import About from './pages/About';
import CustomDrawer from './components/CustomDrawer';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color="white"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
          headerStyle: { backgroundColor: '#413931' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: 'Cash', // Set the title
            headerTitleAlign: 'left', // Center the title
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.openDrawer()} // Use navigation here
                style={{ marginLeft: 10 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#413931', // Background color for the header
            },
            headerTintColor: '#fff', // Title and icon color
            headerTitleStyle: {
              marginLeft: 10,
              fontSize: 35,
              fontWeight: 'bold'
            }
          })}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={({ navigation }) => ({
            headerTitle: 'About', // Set the title
            headerTitleAlign: 'left', // Center the title
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.openDrawer()} // Use navigation here
                style={{ marginLeft: 10 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#413931', // Background color for the header
            },
            headerTintColor: '#fff', // Title and icon color
            headerTitleStyle: {
              marginLeft: 10,
              fontSize: 35,
              fontWeight: 'bold'
            }
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
