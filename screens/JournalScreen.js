import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles'; // Adjust the path as necessary



export default function JournalScreen() {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem('journalEntries');
      if (storedEntries) setEntries(JSON.parse(storedEntries));
    } catch (error) {
      console.error('Failed to load the journal entries.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  const deleteEntry = async (date) => {
    const filteredEntries = entries.filter(entry => entry.date !== date);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(filteredEntries));
    setEntries(filteredEntries);
  };

  const handleDelete = (date) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteEntry(date) }
      ]
    );
  };

  return (
    <View styel={styles.cozyContainer}>
      <TouchableOpacity style={styles.cozyButton} onPress={() => navigation.navigate('NewEntry')}>
        <Text style={styles.cozyButtonText}>+ New Entry</Text>
      </TouchableOpacity>
      <FlatList
        data={entries.sort((a, b) => b.date.localeCompare(a.date))}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={localStyles.entry}>
            <TouchableOpacity style={localStyles.content} onPress={() => navigation.navigate('EntryDetail', { entry: item })}>
              <Text style={localStyles.entryDate}>{new Date(item.date).toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.deleteButton} onPress={() => handleDelete(item.date)}>
              <Text style={localStyles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Local styles tailored to ensure delete button is on the same row
const localStyles = StyleSheet.create({
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#FAF0E6', // Cozy background
  },
  content: {
    flex: 1, // Takes maximum width minus the width of delete button
  },
  entryDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C4033', // Warm brown text color
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#DB7093', // Soft pink to stay consistent with cozy theme
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
});