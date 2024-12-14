// Connector.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Connector = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the Login page
  };

  const handleRegister = () => {
    navigation.navigate('Register'); // Navigate to the Register page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome! Please log in or register.</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Connector;
