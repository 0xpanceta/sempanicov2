import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles'; // Ensure this path is correct to import styles

const CrisisScreen = ({ navigation }) => {
  return (
    <View style={styles.cozyContainer}>
      <TouchableOpacity
        style={styles.cozyButton}
        onPress={() => navigation.navigate('ExerciseScreen')}
      >
        <Text style={styles.cozyButtonText}>Play Crisis Audio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cozyButton}
        onPress={() => navigation.navigate('OtherExercisesScreen')}
        >
        <Text style={styles.cozyButtonText}>Other exercises</Text>
      </TouchableOpacity>

      {/* You can replicate the above TouchableOpacity for other buttons with different navigation and titles */}
    </View>
  );
};

export default CrisisScreen;
