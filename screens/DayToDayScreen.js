import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles'; // Correct path as per your indication
import { useNavigation } from '@react-navigation/native';

export default function DayToDayScreen() {
  const navigation = useNavigation(); // Get access to navigation

  console.log("Rendering DayToDayScreen...");

  return (
    <View style={styles.cozyContainer}>
      {/* Replacing standard Button with TouchableOpacity for better styling */}
      <TouchableOpacity style={styles.cozyButton} onPress={() => navigation.navigate('Journal')}>
        <Text style={styles.cozyButtonText}>Journal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cozyButton} onPress={() => navigation.navigate('Meditation')}>
        <Text style={styles.cozyButtonText}>Meditation Tracker</Text>
      </TouchableOpacity>
    </View>
  );
}
