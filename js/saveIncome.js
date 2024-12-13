// saveIncome.js

import { currentUsername } from './logics';  // Assuming you have a way to get the current username
import * as FileSystem from 'expo-file-system';
import { rerenderBalanceHome } from './logics';

// Path to the income file
const incomeFileUri = FileSystem.documentDirectory + 'income.json';

// Function to read data from any JSON file
async function readJSONFile(fileUri) {
  try {
    const fileContents = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading the file:', error);
    return null; // Return null if the file doesn't exist or is empty
  }
}

// Function to write data to any JSON file
async function writeJSONFile(fileUri, data) {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2));
    console.log('File written successfully');
  } catch (error) {
    console.log('Error writing the file:', error);
  }
}

// Function to save a new income record
export async function saveIncome(category, amount, description, selectedAccount) {
  const newRecord = {
    id: Date.now(),  // Generate a unique ID based on current timestamp
    date: new Date().toISOString(),  // Current date in ISO format
    username: currentUsername,  // Assuming `currentUsername` gives the current logged-in user
    category,
    amount,
    description,
    selectedAccount: selectedAccount,  // Add the selected account field here
  };

  // Read the existing data from the file
  const jsonData = await readJSONFile(incomeFileUri);

  if (jsonData) {
    // If the file exists, push the new record into the data array
    jsonData.data.push(newRecord);
    await writeJSONFile(incomeFileUri, jsonData);
  } else {
    // If the file doesn't exist or is empty, create a new data structure
    const newData = {
      tableName: 'Income',
      columns: ['id', 'date', 'username', 'category', 'amount', 'description', 'selectedAccount'],  // Add 'account' to the columns
      data: [newRecord],
    };
    await writeJSONFile(incomeFileUri, newData);
  }


  rerenderBalanceHome();

  console.log(FileSystem.documentDirectory);
}
