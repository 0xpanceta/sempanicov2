import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


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
    <View style={styles.container}>
      <Button title="New Entry" onPress={() => navigation.navigate('NewEntry')} />
      <FlatList
        data={entries.sort((a, b) => b.date.localeCompare(a.date))}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('EntryDetail', { entry: item })}>
              <Text style={styles.entryDate}>{new Date(item.date).toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.date)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
            
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  content: {
    flex: 1,
  },
  entryDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
});