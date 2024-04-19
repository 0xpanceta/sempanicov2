import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, subDays } from 'date-fns';
import styles from '../styles'; // Ensure this path is correct

const { width } = Dimensions.get('window'); // Get the window width

const MeditationScreen = () => {
    const [meditatedDays, setMeditatedDays] = useState({});
    const today = new Date();
    const lastSixDays = Array.from({ length: 6 }, (_, i) => subDays(today, i + 1)).reverse();

    useEffect(() => {
        loadMeditationData();
    }, []);

    const loadMeditationData = async () => {
        const data = await AsyncStorage.getItem('meditatedDays');
        setMeditatedDays(data ? JSON.parse(data) : {});
    };

    const toggleMeditation = async () => {
        const dateKey = format(today, 'yyyy-MM-dd');
        const updatedMeditatedDays = {
            ...meditatedDays,
            [dateKey]: !meditatedDays[dateKey]
        };
        await AsyncStorage.setItem('meditatedDays', JSON.stringify(updatedMeditatedDays));
        setMeditatedDays(updatedMeditatedDays);
    };

    return (
        <View style={styles.cozyContainer}>
            <View style={localStyles.calendar}>
                {lastSixDays.concat(today).map((date, index) => (
                    <View
                        key={index}
                        style={[
                            localStyles.day,
                            format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? localStyles.today : {},
                            meditatedDays[format(date, 'yyyy-MM-dd')] ? localStyles.meditated : {}
                        ]}
                    >
                        <Text style={[
                            meditatedDays[format(date, 'yyyy-MM-dd')] ? styles.whiteText : styles.blackText
                        ]}>
                            {format(date, 'dd/MM')}
                        </Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.cozyButton} onPress={toggleMeditation}>
                <Text style={styles.cozyButtonText}>
                    {meditatedDays[format(today, 'yyyy-MM-dd')] ? "Oops, I actually didn't meditate today" : "I meditated at least 10min today"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const localStyles = StyleSheet.create({
    calendar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    day: {
        width: 40, // Adjusted width calculation to allow more space for margins
        height: 40,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5, // Increased margin for better spacing
    },
    today: {
        borderColor: 'green',
        borderWidth: 2,
    },
    meditated: {
        backgroundColor: 'lightgreen', // Ensures background is dark green
    },
    whiteText: {
        color: 'white', // Ensures text in meditated days is white
    },
    blackText: {
        color: 'black' // Ensures text in non-meditated days is black
    }
});

export default MeditationScreen;
