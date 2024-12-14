// saveRecurringIncome.js

import { currentUsername } from './logics';  // Assuming you have a way to get the current username
import * as FileSystem from 'expo-file-system';
import { useBalance } from './BalanceContext';

// Path to the recurring income file
const recurringIncomeFileUri = FileSystem.documentDirectory + 'recurringIncome.json';

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

// Function to calculate the next occurrence based on the recurrence type (Daily, Weekly, Monthly)
function calculateNextOccurrence(recurrence) {
  const today = new Date();
  switch (recurrence) {
    case 'Daily':
      today.setDate(today.getDate() + 1);
      break;
    case 'Weekly':
      today.setDate(today.getDate() + 7);
      break;
    case 'Monthly':
      today.setMonth(today.getMonth() + 1);
      break;
    default:
      break;
  }
  return today.toISOString();
}

// Function to save recurring income
export async function saveRecurringIncome(category, amount, description, selectedAccount, recurrence, updateBalance) {
  const newRecord = {
    id: Date.now(),
    date: new Date().toISOString(),
    username: currentUsername,
    category,
    amount,
    description,
    selectedAccount,
    recurrence, // Recurrence type: 'Daily', 'Weekly', 'Monthly'
    nextOccurrence: calculateNextOccurrence(recurrence), // Set the next occurrence date
  };

  const jsonData = await readJSONFile(recurringIncomeFileUri);

  if (jsonData) {
    jsonData.data.push(newRecord);
    await writeJSONFile(recurringIncomeFileUri, jsonData);
  } else {
    const newData = {
      tableName: 'RecurringIncome',
      columns: ['id', 'date', 'username', 'category', 'amount', 'description', 'selectedAccount', 'recurrence', 'nextOccurrence'],
      data: [newRecord],
    };
    await writeJSONFile(recurringIncomeFileUri, newData);
  }

  // Update the balance after saving the recurring income
  updateBalance();
}
