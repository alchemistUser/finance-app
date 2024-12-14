// Profile.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  getCurrentUser,
  updateUser,
  clearCurrentUser, // Correctly renamed logout function
} from '../js/users';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [profileName, setProfileName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');

  useEffect(() => {
    const loadProfileData = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUsername(currentUser.username);
        setProfileName(currentUser.profileName);
        setDateOfBirth(currentUser.dateOfBirth);
        setSex(currentUser.sex);
      } else {
        Alert.alert('Error', 'Failed to load profile data.');
        navigation.navigate('Login');
      }
    };

    loadProfileData();
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = {
        username,
        profileName,
        dateOfBirth,
        sex,
      };
      await updateUser(updatedUser); // Save the updated user info
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await clearCurrentUser(); // Ensure this matches the function name in users.js
      Alert.alert('Logged Out', 'You have been logged out.');
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to log out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        editable={false} // Username cannot be changed
      />

      <Text style={styles.label}>Profile Name:</Text>
      <TextInput
        style={styles.input}
        value={profileName}
        onChangeText={setProfileName}
      />

      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Sex:</Text>
      <TextInput
        style={styles.input}
        value={sex}
        onChangeText={setSex}
        placeholder="Male/Female"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
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
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Profile;
