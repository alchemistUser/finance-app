// About.js

import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export default function About() {

  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
