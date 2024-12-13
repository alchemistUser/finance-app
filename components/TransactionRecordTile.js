// components/TransactionRecordTile.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionRecordTile = ({ date, username, category, amount, description, amountColor, selectedAccount, onDelete }) => {
  return (
    <View style={styles.tile}>
      <View style={styles.transactionInfo}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={[styles.amount, { color: amountColor }]}>
          ${amount}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.selectedAccount}>{selectedAccount}</Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row', // To align the content and the delete button
    justifyContent: 'space-between', // To space out the transaction info and the delete button
  },
  transactionInfo: {
    flex: 1, // This ensures the transaction details take up the remaining space
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    marginVertical: 5,
  },
  category: {
    fontSize: 14,
    color: '#777',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32CD32', // Green for income
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  selectedAccount: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FF6347', // Red color for delete button
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransactionRecordTile;
