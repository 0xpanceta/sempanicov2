import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

export default function DayToDayScreen() {
  const navigation = useNavigation(); // Get access to navigation

  console.log("Rendering DayToDayScreen...");

  return (
    <View style={styles.container}>
      {/* Use the navigation.navigate function to navigate to the Journal screen */}
      <Button title="Journal" onPress={() => navigation.navigate('Journal')} />
      <Button title="Meditation Tracker" onPress={() => navigation.navigate('Meditation')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
