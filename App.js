import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import tw from "tailwind-rn";
import StackNavigator from "./navigation/StackNavigator";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
        <StackNavigator />
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}


