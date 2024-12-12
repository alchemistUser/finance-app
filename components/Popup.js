// Popup.js

import React, {useState} from 'react';
import { TextInput, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { saveIncome } from '../js/logicss';

const Popup = ({ type, onClose }) => {
  const [inputValue, setInputValue] = useState(''); // State to store input
  const [selectedButton, setSelectedButton] = useState('Allowance');
  const handleInputChange = (text) => {
    // Regular expression to allow numbers and only one decimal
    const validInput = /^[0-9]*\.?[0-9]*$/;

    // Update state only if input matches the pattern
    if (validInput.test(text)) {
      setInputValue(text);
    }
  };  
  const [description, setDescription] = useState(''); // State to store description

  return (
    <View style={styles.overlay}>
      <View style={styles.popupContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>Income</Text>
        </View>

        <View style={styles.container}>
          <Text style={[styles.popupText, {marginBottom: -10}]}>Category</Text>
        </View>

        <View style={styles.horizontalContainer}>
        <TouchableOpacity
          style={[
            styles.squareButton,
            selectedButton === 'Allowance' && styles.selectedButton, // Add conditional styling here
          ]}
          onPress={() => setSelectedButton('Allowance')}
        >
          <Image
            source={require('../assets/banknotes.png')}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Allowance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.squareButton,
            selectedButton === 'Payout' && styles.selectedButton, // Add conditional styling here
          ]}
          onPress={() => setSelectedButton('Payout')}
        >
          <Image
            source={require('../assets/banknotes.png')}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Payout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.squareButton,
            selectedButton === 'Money Transfer' && styles.selectedButton, // Add conditional styling here
          ]}
          onPress={() => setSelectedButton('Money Transfer')}
        >
          <Image
            source={require('../assets/banknotes.png')}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Money Transfer</Text>
        </TouchableOpacity>

        </View>
        
        <View style={styles.container}>
          <Text style={[styles.popupText, {marginBottom: -10, marginTop: 10}]}>Amount</Text>
        </View>
        
        <View style={styles.amountContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter amount"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={handleInputChange}
          />
          {inputValue !== '' && ( // Show 'X' button only if input is not empty
            <TouchableOpacity onPress={() => setInputValue('')} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.container}>
          <Text style={[styles.popupText, { marginBottom: 0, marginTop: 10 }]}>Description</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <TextInput
            style={[styles.textInput, styles.multiLineTextInput]} // Combine the base and multiline styles
            placeholder="Enter description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true} // Enable multiline
            numberOfLines={3} // Set the default number of lines visible
            textAlignVertical="top" // Align text to the top
            scrollEnabled={true} // Allow scrolling within the input
          />
          {description !== '' && ( // Show 'X' button only if description is not empty
            <TouchableOpacity
              onPress={() => setDescription('')}
              style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>



          {/* for close and save buttons */}
        <View style={styles.horizontalContainerCloseSave}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            // saveIncome(selectedButton, inputValue, description);
            onClose();
            }}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Save</Text>
          </TouchableOpacity>
        </View>


        {/* popup end */}
      </View>
      {/* overlay end */}
    </View>
  );
};

const styles = StyleSheet.create({

  horizontalContainerCloseSave: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 50,
  },

  multiLineTextInput: {
    height: 100, // Adjust height for 3 lines of text
    paddingVertical: 10, // Add vertical padding for better spacing
  },

  descriptionContainer: {
    width: '100%',
    height: 60,
    marginTop: 10,
  },

  clearButton: {
    position: 'absolute', // Position it inside the amountContainer
    right: 10, // Align to the right of the input box
    top: '50%', // Center vertically
    transform: [{ translateY: -10 }], // Adjust for vertical alignment
    backgroundColor: '#ccc', // Button background color
    borderRadius: 12, // Round button
    width: 24, // Button width
    height: 24, // Button height
    justifyContent: 'center', // Center the 'X' text
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },

  textInput: {
    width: '100%', // Make it full width of the container
    height: '100%', // Match the height of the amountContainer
    backgroundColor: 'white', // Set a background color
    borderRadius: 20, // Add rounded corners
    paddingHorizontal: 20, // Add some padding inside the box
    color: '#000', // Set text color
    fontSize: 20, // Adjust font size
    borderWidth: 1, // Add a border for better visibility
    borderColor: '#ccc', // Border color
    paddingRight: 40,
  },

  selectedButton: {
    borderColor: '#000',
    borderWidth: 2,
  },

  amountContainer: {
    width: '100%',
    height: 60,
    marginTop: 20,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 10, // Optional: makes the corners rounded
  },
  squareButton: {
    marginLeft: 5,
    marginRight: 5,
    width: 75, // Set the width
    height: 75, // Set the height equal to width for a square
    backgroundColor: '#f1dfc8', // Button background color
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    borderRadius: 10, // Optional: Add rounded corners
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  headerContainerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  headerContainer: {
    backgroundColor: '#403831',
    height: 60,
    width: 370,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    padding: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  popupContainer: {
    width: 370,
    height: 515,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    width: '100%', // Make sure this takes up full width of its parent container
    alignItems: 'flex-start', // Align the content to the left
  },
  popupText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#403831',
    textAlign: 'left', // Ensures left alignment of the text itself
  },
  closeButton: {
    backgroundColor: '#403831',
    width: 80,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Popup;
