// logics.js

import * as FileSystem from 'expo-file-system';

// Variables
let currentUsername = 'defaultUser';
export { currentUsername };
const incomeFileUri = FileSystem.documentDirectory + 'income.json';
const expenseFileUri = FileSystem.documentDirectory + 'expense.json';
const recurringIncomeFileUri = FileSystem.documentDirectory + 'recurringIncome.json';

// Function to change the username
export function setCurrentUsername(newUsername) {
  currentUsername = newUsername;
}

// Function to read data from the income JSON file
async function readIncomeFile() {
  try {
    const fileContents = await FileSystem.readAsStringAsync(incomeFileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading the file:', error);
    return null;
  }
}

// Function to read data from the expense JSON file
async function readExpenseFile() {
  try {
    const fileContents = await FileSystem.readAsStringAsync(expenseFileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading the expense file:', error);
    return null;
  }
}

// Function to read data from the recurring income JSON file
async function readRecurringIncomeFile() {
  try {
    const fileContents = await FileSystem.readAsStringAsync(recurringIncomeFileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading recurring income file:', error);
    return null;
  }
}

// Helper function to format numbers with commas
function formatNumberWithCommas(number) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
}

// Function to sum all the expenses
async function getTotalExpenses() {
  const jsonData = await readExpenseFile();
  if (jsonData && jsonData.data) {
    return jsonData.data.reduce((sum, record) => sum + record.amount, 0);
  }
  return 0; // Return 0 if no data or file
}

// Function to calculate the total recurring income
async function getTotalRecurringIncome() {
  const jsonData = await readRecurringIncomeFile();
  if (jsonData && jsonData.data) {
    return jsonData.data.reduce((sum, record) => sum + record.amount, 0);
  }
  return 0; // Return 0 if no data or file
}

// Function to sum all the income entries and return the balance as a string
export const getBalance = async () => {
  const jsonData = await readIncomeFile();
  const totalExpenses = await getTotalExpenses();
  const totalRecurringIncome = await getTotalRecurringIncome();
  
  if (jsonData && jsonData.data) {
    const totalIncome = jsonData.data.reduce((sum, record) => sum + record.amount, 0);
    const netBalance = totalIncome + totalRecurringIncome - totalExpenses;

    // Format the final balance with commas and two decimal places
    return `${formatNumberWithCommas(netBalance.toFixed(2))}`;
  }
  return '0.00'; // Return 0 balance if no data or file
};

// Logic to rerender balance on the home page (triggered when needed)
export const rerenderBalanceHome = async () => {
  // Get the current balance
  const currentBalance = await getBalance();

  // Call any method or update state in Home.js to render the balance
  // For example, updating the balance state:
  // updateBalance(currentBalance);

  console.log('Current Balance:', currentBalance); // Temporary log, replace with actual update method
};

// Example of adding a transaction (income or expense), calling rerenderBalanceHome after saving
export const addTransaction = async (transaction) => {
  try {
    const fileUri = transaction.source === 'income' 
      ? incomeFileUri 
      : expenseFileUri;

    // Read the existing data
    const fileData = await readJSONFile(fileUri);
    
    // Add the new transaction
    fileData.data.push(transaction);

    // Write the updated data to the file
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(fileData, null, 2));

    // After saving, rerender the balance
    rerenderBalanceHome();
  } catch (error) {
    console.log('Error adding transaction:', error);
  }
};

// Helper function to read a generic JSON file (used in addTransaction)
async function readJSONFile(fileUri) {
  try {
    const fileContents = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log('Error reading the file:', error);
    return null;
  }
}

