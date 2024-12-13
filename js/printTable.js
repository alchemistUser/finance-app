// printTable.js

import * as FileSystem from 'expo-file-system'; // Import expo-file-system

// Define the file path
const filePath = FileSystem.documentDirectory + 'income.json'; // Save file in the app's document directory

// Load the JSON table structure
const loadTable = async () => {
  try {
    // Read the file content
    const data = await FileSystem.readAsStringAsync(filePath); 

    // Print all the data to the console
    console.log("Saved Data:", data);

    // Parse the data and return it
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading table:', error);
    return null;
  }
};

// Call loadTable and print the data when you want to view it
loadTable();  // You can call this function wherever you need to view the data
