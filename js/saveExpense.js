// saveExpense.js

import { currentUsername } from './logics';  // Assuming you have a way to get the current username
import * as FileSystem from 'expo-file-system';
import { useBalance } from './BalanceContext';

// Path to the expense file
const expenseFileUri = FileSystem.documentDirectory + 'expense.json';


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

export async function saveExpense(category, amount, description, selectedAccount, updateBalance) {
  const newRecord = {
    id: Date.now(),
    date: new Date().toISOString(),
    username: currentUsername,
    category,
    amount,
    description,
    selectedAccount,
  };

  const jsonData = await readJSONFile(expenseFileUri);

  if (jsonData) {
    jsonData.data.push(newRecord);
    await writeJSONFile(expenseFileUri, jsonData);
  } else {
    const newData = {
      tableName: 'Expense',
      columns: ['id', 'date', 'username', 'category', 'amount', 'description', 'selectedAccount'],
      data: [newRecord],
    };
    await writeJSONFile(expenseFileUri, newData);
  }

  // Update the balance after the new expense is saved
  updateBalance();
}

