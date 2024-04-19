import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'; // Ensure this path is correct for your project setup

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
      style={styles.cozyContainer}
    >
      <TextInput
        style={[styles.cozyInput, localStyles.input]}
        placeholder="Write your thoughts here..."
        multiline
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.cozyButton} onPress={saveEntry}>
        <Text style={styles.cozyButtonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  input: {
    flex: 1,
    marginVertical: 20, // Adjusts vertical spacing
    textAlignVertical: 'top', // Ensures text starts from the top
  },
});
