import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';  // Use AppLoading if on SDK <= 48
import Home from './pages/Home';
import About from './pages/About';
import CustomDrawer from './components/CustomDrawer';

// Load the Inter font
const fetchFonts = () => {
  return Font.loadAsync({
    'inter': require('./assets/fonts/Inter_18pt-Regular.ttf'),  // Path to your Inter font file
  });
};

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts before rendering the app
  useEffect(() => {
    fetchFonts().then(() => setFontLoaded(true));
  }, []);

  // Show AppLoading until fonts are loaded
  if (!fontLoaded) {
    return <AppLoading />;
  }

  // Create a custom theme with the Inter font
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff', // Default background color
    },
    fonts: {
      regular: 'inter',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          // Customizing the header
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color="white"  // Change menu icon color
              onPress={() => navigation.openDrawer()} // Open the drawer when pressed
              style={styles.headerLeftIcon}  // Use the style from styles variable
            />
          ),
          headerStyle: styles.drawerHeaderStyle, // Use header style from styles variable
          headerTintColor: styles.headerTintColor.color, // Use header text color from styles variable
          headerTitleStyle: {
            ...styles.headerTitleStyle,
            fontFamily: 'inter', // Apply the Inter font to header title
          },
        })}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  headerLeftIcon: {
    marginLeft: 10,
  },
  drawerHeaderStyle: {
    backgroundColor: '#413931',  // Header background color
  },
  headerTintColor: {
    color: '#fff',  // Header text color
  },
  headerTitleStyle: {
    fontWeight: 'bold',  // Header title style
  },
};
