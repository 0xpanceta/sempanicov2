// OtherExercisesScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from '../styles'; // Make sure this path is correct

const OtherExercisesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.cozyContainer}>
      <Text style={styles.cozyText}>
        Here are some activities you might find helpful:
        {"\n\n"}
        1. Mindful Breathing: Spend a few minutes focusing solely on your breath.
        {"\n"}
        2. Progressive Muscle Relaxation: Tense and then relax each muscle group in your body.
        {"\n"}
        3. Guided Imagery: Visualize a calm or meaningful setting and focus on how it feels to be there.
        {"\n"}
        4. Mindful Walking: Take a slow walk, focusing on one sensation of your walking experience at a time.
        {"\n"}
        5. Journaling: Spend some time writing out your thoughts and feelings to understand them more clearly.
      </Text>
    </ScrollView>
  );
}

export default OtherExercisesScreen;

const localStyles = StyleSheet.create({
  // Additional styles if needed
});
