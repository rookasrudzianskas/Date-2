import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import tw from "tailwind-rn";

export default function App() {
  return (
    <View style={tw('flex-1 justify-center items-center')}>
      <Text style={tw('font-bold')}>Rokas 🔥</Text>
        <Button title="Click me" />
      <StatusBar style="auto" />
    </View>
  );
}


