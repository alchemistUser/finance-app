// Transactions.js

import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import TransactionRecordTile from '../components/TransactionRecordTile'; // Import the component
import { useIsFocused } from '@react-navigation/native';
import { rerenderBalanceHome } from '../js/logics';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
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

      const incomeData = await readJSONFile(incomeFileUri);
      const expenseData = await readJSONFile(expenseFileUri);

      const incomeTransactions = incomeData ? incomeData.data.map(transaction => ({
        ...transaction,
        source: 'income',
      })) : [];

      const expenseTransactions = expenseData ? expenseData.data.map(transaction => ({
        ...transaction,
        source: 'expense',
      })) : [];

      const combinedTransactions = [...incomeTransactions, ...expenseTransactions];

      const sortedTransactions = combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

      setTransactions(sortedTransactions);
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
      const incomeFileUri = FileSystem.documentDirectory + 'income.json';
      const expenseFileUri = FileSystem.documentDirectory + 'expense.json';

      let fileUri = source === 'income' ? incomeFileUri : expenseFileUri;

      // Read the current data
      const fileData = await readJSONFile(fileUri);
      const updatedData = fileData.data.filter(transaction => transaction.id !== transactionId);

      // Write the updated data back to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify({ ...fileData, data: updatedData }, null, 2));

      // Remove the transaction from the state
      const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
      setTransactions(updatedTransactions);
      await rerenderBalanceHome();
    } catch (error) {
      console.log('Error deleting transaction:', error);
    }
    
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    readTransactions();
  }, []);

  const getAmountColor = (source) => {
    return source === 'income' ? 'green' : 'red';
  };

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
    <ScrollView contentContainerStyle={styles.container}>
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
            amountColor={getAmountColor(item.source)}
            selectedAccount={item.selectedAccount}
            onDelete={() => handleDelete(item.id, item.source)}  // Pass the delete function
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Transactions;
