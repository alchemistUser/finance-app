// Gcash.js

import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import TransactionRecordTile from '../components/TransactionRecordTile'; // Import the component
import { useIsFocused } from '@react-navigation/native';
import { useBalance } from '../js/BalanceContext';

const Gcash = () => {
  const { updateBalance } = useBalance(); // Access updateBalance function

  const [transactions, setTransactions] = useState([]);
  const [gcashBalance, setGcashBalance] = useState(0); // State for the Gcash balance
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readTransactions();
    }
  }, [isFocused]);

  // Function to read data from JSON files
  const readTransactions = async () => {
    try {
      const incomeFileUri = FileSystem.documentDirectory + 'income.json';
      const expenseFileUri = FileSystem.documentDirectory + 'expense.json';
      const recurringIncomeFileUri = FileSystem.documentDirectory + 'recurringIncome.json';

      // Read income, expense, and recurring income data
      const incomeData = await readJSONFile(incomeFileUri);
      const expenseData = await readJSONFile(expenseFileUri);
      const recurringIncomeData = await readJSONFile(recurringIncomeFileUri);

      const incomeTransactions = incomeData ? incomeData.data.map(transaction => ({
        ...transaction,
        source: 'income',
      })) : [];

      const expenseTransactions = expenseData ? expenseData.data.map(transaction => ({
        ...transaction,
        source: 'expense',
      })) : [];

      const recurringIncomeTransactions = recurringIncomeData ? recurringIncomeData.data.map(transaction => ({
        ...transaction,
        source: 'recurringIncome',
      })) : [];

      // Combine all transactions
      const combinedTransactions = [
        ...incomeTransactions,
        ...expenseTransactions,
        ...recurringIncomeTransactions,
      ];

      // Filter transactions for selectedAccount === 'Gcash'
      const filteredTransactions = combinedTransactions.filter(transaction => transaction.selectedAccount === 'GCash');

      // Sort transactions by date
      const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Update the transactions state
      setTransactions(sortedTransactions);

      // Calculate the balance based on income and expense transactions for the 'Gcash' account
      const calculatedBalance = sortedTransactions.reduce((total, transaction) => {
        if (transaction.source === 'income') {
          return total + parseFloat(transaction.amount);
        } else if (transaction.source === 'expense') {
          return total - parseFloat(transaction.amount);
        }
        return total; // Skip recurring income for balance calculation
      }, 0);

      // Update the Gcash balance state
      setGcashBalance(calculatedBalance);

    } catch (error) {
      console.log('Error reading transaction files:', error);
    }
  };

  // Helper function to read JSON files
  const readJSONFile = async (fileUri) => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      return JSON.parse(fileContents);
    } catch (error) {
      console.log('Error reading the file:', error);
      return null;
    }
  };

  // Function to delete a transaction
  const handleDelete = async (transactionId, source) => {
    try {
      let fileUri = '';

      // Choose the appropriate file based on the transaction source
      if (source === 'income') {
        fileUri = FileSystem.documentDirectory + 'income.json';
      } else if (source === 'expense') {
        fileUri = FileSystem.documentDirectory + 'expense.json';
      } else if (source === 'recurringIncome') {
        fileUri = FileSystem.documentDirectory + 'recurringIncome.json';
      }

      // Read the current data from the correct file
      const fileData = await readJSONFile(fileUri);
      const updatedData = fileData.data.filter(transaction => transaction.id !== transactionId);

      // Write the updated data back to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({ ...fileData, data: updatedData }, null, 2));

      // Remove the transaction from the state and update the UI
      setTransactions(prevTransactions => {
        const updatedTransactions = prevTransactions.filter(transaction => transaction.id !== transactionId);

        // Recalculate balance after deletion
        const recalculatedBalance = updatedTransactions.reduce((total, transaction) => {
          if (transaction.source === 'income') {
            return total + parseFloat(transaction.amount);
          } else if (transaction.source === 'expense') {
            return total - parseFloat(transaction.amount);
          }
          return total;
        }, 0);

        // Update the Gcash balance state
        setGcashBalance(recalculatedBalance);

        // Notify Home.js to update the balance as well
        updateBalance();

        return updatedTransactions;
      });

    } catch (error) {
      console.log('Error deleting transaction:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Gcash Balance</Text>
        <Text style={styles.balanceValue}>${gcashBalance.toFixed(2)}</Text>
      </View>
      {transactions.length === 0 ? (
        <Text style={styles.emptyMessage}>No transactions found for Gcash account.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TransactionRecordTile
              date={formatDate(item.date)}
              username={item.username}
              category={item.category}
              amount={item.amount}
              description={item.description}
              amountColor={item.source === 'income' ? 'green' : 'red'}
              selectedAccount={item.selectedAccount}
              onDelete={() => handleDelete(item.id, item.source)}  // Pass the delete function
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#333',
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Gcash;
