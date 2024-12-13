// logics.js

import * as FileSystem from 'expo-file-system';

//variables
let currentUsername = 'defaultUser';
export { currentUsername };
const incomeFileUri = FileSystem.documentDirectory + 'income.json';
const expenseFileUri = FileSystem.documentDirectory + 'expense.json';

// Function to read data from the income JSON file
async function readIncomeFile() {
    try {
      const fileContents = await FileSystem.readAsStringAsync(incomeFileUri);
      return JSON.parse(fileContents);
    } catch (error) {
      console.log('Error reading the file:', error);
      return null;  // Return null if the file doesn't exist or is empty
    }
  }

  function formatNumberWithCommas(number){
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
}

// Function to read data from the expense JSON file
async function readExpenseFile() {
    try {
      const fileContents = await FileSystem.readAsStringAsync(expenseFileUri);
      return JSON.parse(fileContents);
    } catch (error) {
      console.log('Error reading the expense file:', error);
      return null; // Return null if the file doesn't exist or is empty
    }
  }

  // Function to sum all the expenses
async function getTotalExpenses() {
    const jsonData = await readExpenseFile();
  
    if (jsonData && jsonData.data) {
      // Sum up all the amounts in the expense data
      return jsonData.data.reduce((sum, record) => sum + record.amount, 0);
    } else {
      return 0; // If no data or file, return 0 expenses
    }
  }


export const rerenderBalanceHome = async () => {
  // After saving income, update the balance
  const currentBalance = await getBalance();  // Add logic to calculate current balance
  // Update state in Home.js HELP PLS PUT IT HERE
};

  

// Function to sum all the income entries and return the balance as a string
export const getBalance = async () => {
    const jsonData = await readIncomeFile();
    const totalExpenses = await getTotalExpenses();
  
    if (jsonData && jsonData.data) {
      // Sum up all the amounts in the income data
      const totalBalance = jsonData.data.reduce((sum, record) => sum + record.amount, 0);
      const netBalance = totalBalance - totalExpenses;
  
      // Format the final balance with commas and two decimal places
      return `${formatNumberWithCommas(netBalance.toFixed(2))}`;
    } else {
      return '0.00'; // If no data or file, return 0 balance
    }
  };
  

