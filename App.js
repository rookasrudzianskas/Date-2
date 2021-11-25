import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import tw from "tailwind-rn";
import StackNavigator from "./navigation/StackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider} from "./hooks/useAuth";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true); // ignore all logs

export default function App() {
  return (
    <NavigationContainer>
        {/* higher order component, pattern, where we have higher order components (just wrapping)*/}
        <AuthProvider>
            {/* passes the auth stuff to the children */}
            <StackNavigator />
            <StatusBar style="auto" />
        </AuthProvider>
    </NavigationContainer>
  );
}


