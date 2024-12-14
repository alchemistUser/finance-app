// Login.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { validateLogin, setCurrentUsername } from '../js/users'; // Correct function import

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
  
    // Validate credentials against stored users
    const { success, profileName, message } = await validateLogin(username, password);
  
    if (success) {
      setCurrentUsername(username); // Set current user globally
      Alert.alert('Success', `Welcome back, ${profileName}!`);
      // Pass username or profileName to Profile.js
      navigation.navigate('Profile', { username, profileName }); 
    } else {
      Alert.alert('Error', message); // Display login error message
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  link: {
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
