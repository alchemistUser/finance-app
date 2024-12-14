// Register.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { registerUser } from '../js/users'; // Import registerUser function

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [profileName, setProfileName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validate inputs
    if (!username || !profileName || !dateOfBirth || !sex || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Create user object
    const newUser = {
      username,
      profileName,
      dateOfBirth,
      sex,
      password,
    };

    try {
      await registerUser(newUser); // Save user to JSON
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred during registration.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Profile Name"
        value={profileName}
        onChangeText={setProfileName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex (Male/Female)"
        value={sex}
        onChangeText={setSex}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Register;
