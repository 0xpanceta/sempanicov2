import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import styles from '../styles'; // Ensure this path is correct for your project setup

export default function EntryDetailScreen({ route }) {
  const { entry } = route.params;

  return (
    <ScrollView contentContainerStyle={localStyles.contentContainer}>
      <Text style={[styles.cozyTitle, localStyles.date]}>{new Date(entry.date).toDateString()}</Text>
      <Text style={[styles.cozyText, localStyles.entryText]}>{entry.text}</Text>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, // Ensure the container can grow to accommodate the content
    padding: 20, // Apply padding here to ensure it does not interfere with ScrollView behavior
  },
  date: {
    marginBottom: 10, // Space between the date and the entry text
    textAlign: 'left', // Ensure the date is left-aligned
  },
  entryText: {
    textAlign: 'left', // Ensure the text content is left-aligned
  }
});
