import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function NewEntryScreen() {
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const saveEntry = async () => {
    if (text.trim().length === 0) {
      // Optionally handle empty input case
      return;
    }

    const newEntry = {
      date: new Date().toISOString(),
      text: text.trim(),
    };

    try {
      const storedEntries = await AsyncStorage.getItem('journalEntries');
      const entries = storedEntries ? JSON.parse(storedEntries) : [];
      entries.push(newEntry); // Add the new entry
      await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
      navigation.goBack(); // Navigate back to the Journal screen
    } catch (error) {
      console.error('Failed to save the entry.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        placeholder="Write your thoughts here..."
        multiline
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" onPress={saveEntry} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    textAlignVertical: 'top', // This ensures text starts from the top
    fontSize: 16,
  },
});
