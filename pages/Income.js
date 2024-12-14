import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { saveRecurringIncome } from '../js/saveRecurringIncome'; // Import the saveRecurringIncome function
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function Income() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('Allowance');
  const [selectedRecurrence, setSelectedRecurrence] = useState('Monthly');
  const navigation = useNavigation(); // Initialize navigation

  // Optional: Define the updateBalance function
  const updateBalance = () => {
    console.log('Balance Updated!');
    // You can replace this with actual logic to update the balance if needed
  };

  // Handle the save action
  const handleSave = async () => {
    if (amount && description) {
      // Call saveRecurringIncome function and pass the necessary parameters
      await saveRecurringIncome(
        selectedType,  // Category
        parseFloat(amount),  // Amount (make sure it's a number)
        description,  // Description
        'DefaultAccount',  // Example selected account, replace with actual
        selectedRecurrence,  // Recurrence type (Daily, Weekly, Monthly)
        updateBalance  // Function to update balance after saving
      );
      
      // Reset form or provide feedback
      setAmount('');
      setDescription('');
      setSelectedType('Allowance');
      setSelectedRecurrence('Monthly');

      // Navigate back to Home.js
      navigation.goBack(); // This will navigate back to the previous screen (Home.js)
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Set up a recurring income</Text>
      <Text style={styles.h3}>Automatically have a recurring income transaction.</Text>

      <View style={styles.rectangle}>
        <TextInput
          style={styles.textInput}
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
        />

        <Text style={styles.subber}>Type:</Text>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={[styles.button, selectedType === 'Allowance' && styles.selectedButton]}
            onPress={() => setSelectedType('Allowance')}
          >
            <Text>Allowance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedType === 'Pension' && styles.selectedButton]}
            onPress={() => setSelectedType('Pension')}
          >
            <Text>Pension</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedType === 'Salary' && styles.selectedButton]}
            onPress={() => setSelectedType('Salary')}
          >
            <Text>Salary</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subber}>Recurrence:</Text>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={[styles.button, selectedRecurrence === 'Daily' && styles.selectedButton]}
            onPress={() => setSelectedRecurrence('Daily')}
          >
            <Text>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedRecurrence === 'Weekly' && styles.selectedButton]}
            onPress={() => setSelectedRecurrence('Weekly')}
          >
            <Text>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedRecurrence === 'Monthly' && styles.selectedButton]}
            onPress={() => setSelectedRecurrence('Monthly')}
          >
            <Text>Monthly</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.textInput2, styles.multiLineTextInput]}
          placeholder="Enter description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          scrollEnabled={true}
        />

        <TouchableOpacity style={styles.closeButton} onPress={handleSave}>
          <Text style={styles.closeButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 10,
    backgroundColor: '#403831',
    width: 100,
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 80,
    backgroundColor: '#f0dfc9',
  },
  selectedButton: {
    borderColor: 'black',
    borderWidth: 2,
  },
  btnsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
    width: '100%',
  },
  subber: {
    fontSize: 18,
    fontWeight: 800,
    color: '#413830',
    margin: 10,
    alignSelf: 'flex-start',
  },
  textInput2: {
    paddingVertical: 10,
    marginTop: 15,
    height: 75,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 5,
  },
  textInput: {
    paddingVertical: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 5,
  },
  rectangle: {
    alignItems: 'center',
    padding: 20,
    width: 350,
    height: 380,
    backgroundColor: '#fefffe',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  h2: {
    color: '#413830',
    fontWeight: 'bold',
    fontSize: 30,
  },
  h3: {
    color: '#676667',
    fontWeight: 900,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
