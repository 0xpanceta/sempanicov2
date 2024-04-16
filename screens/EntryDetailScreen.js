import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function EntryDetailScreen({ route }) {
  const { entry } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.date}>{new Date(entry.date).toDateString()}</Text>
      <Text style={styles.text}>{entry.text}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});
