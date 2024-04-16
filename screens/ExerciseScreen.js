import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import styles from '../styles'; // Ensure this path is correct to import styles

export default function ExerciseScreen() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playRecording = async () => {
    console.log('Loading Sound');
    const { sound, status } = await Audio.Sound.createAsync(
      require('../resources/recordings/Rua da Consolação.m4a'),
      { shouldPlay: false }
    );
    setSound(sound);
    setPlaybackDuration(status.durationMillis);
    sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    console.log('Ready to play sound');
  };

  const updatePlaybackStatus = (status) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPauseToggle = () => {
    if (sound) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderValueChange = (value) => {
    if (sound && !isPlaying) { // Only allow seeking when paused to prevent jumps during active playback
      sound.setPositionAsync(value);
      setPlaybackPosition(value);
    }
  };

  return (
    <View style={styles.cozyContainer}>
      <TouchableOpacity style={styles.cozyButton} onPress={handlePlayPauseToggle}>
        <Text style={styles.cozyButtonText}>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
      {!sound && (
        <TouchableOpacity style={styles.cozyButton} onPress={playRecording}>
          <Text style={styles.cozyButtonText}>Load Recording</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.cozyText}>{isPlaying ? 'Playing' : 'Paused'}</Text>
      <Slider
        style={localStyles.slider} // Use original slider styling
        value={playbackPosition}
        minimumValue={0}
        maximumValue={playbackDuration}
        onValueChange={handleSliderValueChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={styles.cozyText}>Position: {Math.round(playbackPosition / 1000)}s</Text>
    </View>
  );
}

// Define the original slider styling here
const localStyles = StyleSheet.create({
  slider: {
    width: 300,
    height: 40,
  },
});
