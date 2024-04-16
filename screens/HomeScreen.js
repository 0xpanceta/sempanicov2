import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from '../styles'; // Ensure this path is correct to import styles

export default function HomeScreen() {
  console.log("Rendering HomeScreen...");
  return (
    <View style={[styles.cozyContainer, localStyles.container]}>
      <Text style={styles.cozyTitle}>Welcome to Sem Panico!</Text>
      <Text style={styles.cozyText}>This app is designed to help you manage your Panic Syndrome.</Text>
      <Text style={styles.cozyText}>You will find crisis management tools to help you feel better and regain control immediately, as well as day-to-day use tools that will help you keep yourself in order so you have less and less crises.</Text>
    </View>
  );
}

// Local styles specific to HomeScreen if needed
const localStyles = StyleSheet.create({
  container: {
    // You can add or override specific styles for HomeScreen here
    padding: 20, // Example of overriding or adding specific padding
  },
});
