import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for the button icon

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Floating Circle Button */}

        {/* Balance Rectangle */}
        <View style={styles.rectangle}>
          <Text style={styles.h2Text}>Available Balance:</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>$</Text>
            <Text style={styles.balanceText}>10,000,000.00</Text>
          </View>
        </View>

        {/* Grid Container */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Button 1 pressed')}>
            <Image
              source={require('../assets/calendar.png')} // Use require() for local images
              style={styles.image} // Style for the image
            />
            <Text style={styles.gridItemText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Button 2 pressed')}>
            <Image
              source={require('../assets/statistic.png')} // Use require() for local images
              style={styles.image} // Style for the image
            />
            <Text style={styles.gridItemText}>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Button 3 pressed')}>
            <Image
              source={require('../assets/coin.png')} // Use require() for local images
              style={styles.image} // Style for the image
            />
            <Text style={styles.gridItemText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Button 4 pressed')}>
            <Image
              source={require('../assets/user.png')} // Use require() for local images
              style={styles.image} // Style for the image
            />
            <Text style={styles.gridItemText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Accounts Section */}
        <View style={styles.h1Containers}>
          <Text style={styles.h1s}>Accounts</Text>
          <View style={styles.containerRowButtons}>
            <TouchableOpacity style={styles.accountsButtons} onPress={() => console.log('Cash Pressed')}>
              <Text style={styles.gridItemText}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountsButtons} onPress={() => console.log('Bank Pressed')}>
              <Text style={styles.gridItemText}>Bank</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountsButtons} onPress={() => console.log('Savings Pressed')}>
              <Text style={styles.gridItemText}>Savings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountsButtons} onPress={() => console.log('Gcash Pressed')}>
              <Text style={styles.gridItemText}>Gcash</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Categories Section */}
        <View style={styles.h1Containers}>
          <Text style={styles.h1s}>Other Categories</Text>
          <View style={styles.containerRowButtons}>
            <TouchableOpacity style={[styles.otherCategoryItems, { backgroundColor: '#bfa995' }]} onPress={() => console.log('Gcash Pressed')}>
              <Image
                source={require('../assets/suitcase.png')} // Use require() for local images
                style={styles.imageOtherCategories} // Style for the image
              />
              <Text style={[styles.gridItemText, {fontWeight: '900', textAlign: 'left', marginTop:5, fontSize: 19, color:'#000'}]}>Travel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.otherCategoryItems, { backgroundColor: '#fedab5' }]} onPress={() => console.log('Gcash Pressed')}>
              <Image
                source={require('../assets/briefcase.png')} // Use require() for local images
                style={[styles.imageOtherCategories]} // Style for the image
              />
              <Text style={[styles.gridItemText, {fontWeight: '900', textAlign: 'left', marginTop:5, fontSize: 19, color:'#000'}]}>Small Business</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => console.log('Floating button pressed!')}
>
        <Ionicons name="add" size={30} color="#413931" />
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center vertically
    backgroundColor: '#fffefe',
  },
  scrollContainer: {
    paddingBottom: 100, // Add space at the bottom if needed
    alignItems: 'center', // Keep items centered horizontally
  },
  floatingButton: {
    position: 'absolute',
    bottom: 40, // 20px from the bottom
    right: 30, // 20px from the right
    width: 60, // Size of the button
    height: 60, // Size of the button
    borderRadius: 30, // Circular shape
    backgroundColor: '#c9b6a7', // Button color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow for the button (optional)
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Elevation for Android
  },
  rectangle: {
    width: width * 0.9, // Width of the rectangle
    height: height * 0.165, // Height of the rectangle
    backgroundColor: '#dacec5', // Background color
    borderRadius: 10, // Optional: Adds rounded corners
    marginTop: 20, // Space between the text and the rectangle
    padding: 20,
    elevation: 8, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 3 }, // Offset for iOS shadow
    shadowOpacity: 0.3, // Make shadow more visible
    shadowRadius: 4, // Slight blur for the shadow
  },
  balanceContainer: {
    flexDirection: 'row', // Ensures the $ and 123 are next to each other
    alignItems: 'center', // Vertically center-aligns them
    marginTop: 10, // Adds space between Available Balance and the value
  },
  h2Text: {
    color: '#413931', // Text color inside the rectangle
    fontSize: 18, // Font size for the text
    fontWeight: 'bold',
  },
  balanceText: {
    color: '#413931',
    fontSize: 47,
    fontWeight: '900',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensure items wrap to the next row
    justifyContent: 'space-between', // Space out items horizontally
    marginTop: 20,
    width: width * 0.95, // Container width
    paddingHorizontal: 10, // Add padding if items are touching edges
  },
  gridItem: {
    width: '48%', // Adjust width for two items per row
    height: 100,  // Height of each rectangle
    backgroundColor: '#dacec5',
    borderRadius: 10,
    marginBottom: 10, // Space between rows
    elevation: 8, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 3 }, // Offset for iOS shadow
    shadowOpacity: 0.3, // Make shadow more visible
    shadowRadius: 4, // Slight blur for the shadow
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#413931',
    textAlign: 'center'
  },
  h1Containers: {
    margin: 10,
    width: width * 0.9,
  },
  h1s: {    
    fontSize: 30,
    fontWeight: '900',
    marginBottom: '10'
  },
  accountsButtons: {
    width: width * 0.213,
    height: height * 0.13,
    padding: 10,
    backgroundColor: '#f4f5f4',
    borderRadius: 20,
    alignItems: 'center',
  },
  containerRowButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  otherCategoryItems: {
    padding: 20,
    width: '48%', // Adjust width for two items per row
    height: 100,  // Height of each rectangle
    backgroundColor: '#dacec5',
    borderRadius: 10,
    marginBottom: 10, // Space between rows
    elevation: 8, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 3 }, // Offset for iOS shadow
    shadowOpacity: 0.3, // Make shadow more visible
    shadowRadius: 4, // Slight blur for the shadow
    justifyContent: 'center', // Center text vertically
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10, // Optional: makes the corners rounded
  },
  imageOtherCategories: {
    height: 40,
    width: 60,
    resizeMode: 'center',
    borderRadius: 100, // Optional: makes the corners rounded
    backgroundColor: '#fff'
  },
});

export default Home;