// users.js

import * as FileSystem from 'expo-file-system';

// File URI to store user data
const userFileUri = FileSystem.documentDirectory + 'users.json';

// Function to initialize user data file if it doesn't exist
async function initializeUserFile() {
  try {
    const fileExists = await FileSystem.getInfoAsync(userFileUri);
    if (!fileExists.exists) {
      const initialData = { users: [] };
      await FileSystem.writeAsStringAsync(userFileUri, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.log('Error initializing user file:', error);
  }
}

// Function to read user data
export async function readUserFile() {
  try {
    const fileContents = await FileSystem.readAsStringAsync(userFileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading user file:', error);
    return { users: [] }; // Return empty structure if file read fails
  }
}

// Function to register a new user
export async function registerUser(newUser) {
  try {
    // Initialize file if it doesn't exist
    await initializeUserFile();

    // Read existing users
    const userData = await readUserFile();

    // Check if username already exists
    const usernameExists = userData.users.some(user => user.username === newUser.username);
    if (usernameExists) {
      throw new Error('Username already exists. Please choose another.');
    }

    // Add the new user to the list
    userData.users.push(newUser);

    // Save updated user data
    await FileSystem.writeAsStringAsync(userFileUri, JSON.stringify(userData, null, 2));
    console.log('User registered successfully:', newUser.username);
  } catch (error) {
    console.log('Error registering user:', error);
    throw error; // Re-throw error for UI handling
  }
}

// Function to validate login
export async function validateLogin(username, password) {
  try {
    // Read existing users
    const userData = await readUserFile();

    // Check if username and password match
    const user = userData.users.find(user => user.username === username && user.password === password);
    if (user) {
      return { success: true, profileName: user.profileName };
    } else {
      return { success: false, message: 'Invalid username or password.' };
    }
  } catch (error) {
    console.log('Error validating login:', error);
    return { success: false, message: 'Error processing login.' };
  }
}

// Function to set the current username globally
export function setCurrentUsername(username) {
  global.currentUsername = username; // Set global current user
}

// Function to get the current username globally
export function getCurrentUsername() {
  return global.currentUsername; // Get global current user
}
