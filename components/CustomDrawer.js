import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for icons
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Custom Drawer</Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('About')}
      >
        <Ionicons name="information-circle-outline" size={24} color="black" />
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingLeft: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
  },
});

export default CustomDrawer;
