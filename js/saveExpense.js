// saveExpense.js
import { useBalance } from './BalanceContext';
import { currentUsername } from './logics'; // Import currentUsername
import * as FileSystem from 'expo-file-system';

// Path to the expense file
const expenseFileUri = FileSystem.documentDirectory + 'expense.json';

// Function to check if the file exists
async function fileExists(fileUri) {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.exists;
  } catch (error) {
    console.log('Error checking if file exists:', error);
    return false;
  }
}

// Function to read data from the JSON file
async function readJSONFile(fileUri) {
  try {
    const fileContents = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading the file:', error);
    return null; // Return null if the file doesn't exist or is empty
  }
}

// Function to write data to the JSON file
async function writeJSONFile(fileUri, data) {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2));
    console.log('File written successfully');
  } catch (error) {
    console.log('Error writing the file:', error);
  }
}

// Function to save a new expense record
export async function saveExpense(category, amount, description, selectedAccount) {
  const newRecord = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    date: new Date().toISOString(), // Current date in ISO format
    username: currentUsername, // Use the current username
    category,
    amount,
    description,
    selectedAccount: selectedAccount, // Add the selected account field here
  };

  // Check if the expense file exists, create it if not
  const fileExistsFlag = await fileExists(expenseFileUri);
  
  let jsonData;
  if (fileExistsFlag) {
    // If the file exists, read the existing data
    jsonData = await readJSONFile(expenseFileUri);
  } else {
    // If the file doesn't exist, create a new data structure
    jsonData = {
      tableName: 'Expense',
      columns: ['id', 'date', 'username', 'category', 'amount', 'description', 'selectedAccount'], // Add 'account' to the columns
      data: [],
    };
  }

  // Push the new record into the data array
  jsonData.data.push(newRecord);

  // Write the updated data to the file
  await writeJSONFile(expenseFileUri, jsonData);
  useBalance();
}
