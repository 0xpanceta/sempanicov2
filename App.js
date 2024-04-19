import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CrisisScreen from './screens/CrisisScreen';
import DayToDayScreen from './screens/DayToDayScreen';
import JournalScreen from './screens/JournalScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';
import MeditationScreen from './screens/MeditationScreen';
import ExerciseScreen from './screens/ExerciseScreen'; // Make sure to import the new audio screen
import OtherExercisesScreen from './screens/OtherExercisesScreen'; // Import the new screen
import { Platform } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const DayToDayStack = createNativeStackNavigator();
const CrisisStack = createNativeStackNavigator(); 

function CrisisStackScreen() {
  return (
    <CrisisStack.Navigator
    screenOptions={{
      headerStyle: {
        height: 100,
        paddingTop: 30,
      },
    }}
    >
      <CrisisStack.Screen
        name="CrisisMain"
        component={CrisisScreen}
        options={{ headerShown: false }}
        
      />
      <CrisisStack.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{ title: 'Play Crisis Audio' }}
      />
      <CrisisStack.Screen
        name="OtherExercisesScreen"
        component={OtherExercisesScreen}
        options={{ title: 'Other Exercises' }}
      />
    </CrisisStack.Navigator>
  );
}

function DayToDayStackScreen() {
  return (
    <DayToDayStack.Navigator
    screenOptions={{
      headerStyle: {
        height: 100,
        paddingTop: 30,
      }}}
      >
      <DayToDayStack.Screen
        name="Day-to-Day Main"
        component={DayToDayScreen}
        options={{ headerShown: false }}
      />
      <DayToDayStack.Screen
        name="Journal"
        component={JournalScreen}
      />
      <DayToDayStack.Screen
        name="NewEntry"
        component={NewEntryScreen}
        options={{ title: 'New Journal Entry' }}
      />
      <DayToDayStack.Screen
        name="EntryDetail"
        component={EntryDetailScreen}
        options={{ title: 'Entry Detail' }}
      />
      <DayToDayStack.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{ title: 'Meditation Tracker' }}
      />
    </DayToDayStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white', top: 15 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Crisis"
        component={CrisisStackScreen} // Use the Crisis stack navigator as the component
        options={{ tabBarLabel: 'Crisis' }}
      />
      <Tab.Screen
        name="Day-to-Day"
        component={DayToDayStackScreen} // Use the Day-to-Day stack navigator as the component
        options={{ tabBarLabel: 'Day-to-Day' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
