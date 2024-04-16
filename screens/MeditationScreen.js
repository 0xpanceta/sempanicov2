import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, subDays } from 'date-fns';

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
        <View style={styles.container}>
            <View style={styles.calendar}>
                {lastSixDays.concat(today).map((date, index) => (
                    <View
                        key={index}
                        style={[
                            styles.day,
                            format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? styles.today : {},
                            meditatedDays[format(date, 'yyyy-MM-dd')] ? styles.meditated : {}
                        ]}
                    >
                        <Text style={meditatedDays[format(date, 'yyyy-MM-dd')] ? styles.whiteText : styles.blackText}>
                            {format(date, 'dd/MM')}
                        </Text>
                    </View>
                ))}
            </View>
            <Button
                onPress={toggleMeditation}
                title={meditatedDays[format(today, 'yyyy-MM-dd')] ? "I actually didn't meditate today" : "I meditated at least 10min today"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    },
    calendar: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Ensure even spacing around items
        width: '100%', // Use the full width of the container
        padding: 10, // Add padding around the calendar
    },
    day: {
        width: 45, // Calculate width dynamically, subtract total horizontal padding and divide by 7
        height: 45,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5 // Add horizontal margin for spacing between days
    },
    today: {
        borderColor: 'green',
        borderWidth: 1
    },
    meditated: {
        backgroundColor: 'green'
    },
    blackText: {
        color: 'black'
    },
    whiteText: {
        color: 'white'
    }
});

export default MeditationScreen;
