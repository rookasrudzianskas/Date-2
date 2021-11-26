import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import useAuth from "../hooks/useAuth";
import ModalScreen from "../screens/ModalScreen";
import Match from "../screens/Match";


const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const { user } = useAuth();

    return (
        <Stack.Navigator initialRouteName={LoginScreen} sreenOptions={{
            headerShown: false,
        }}>
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                    </Stack.Group>

                    <Stack.Group screenOptions={{
                        presentation: 'modal',
                        headerShown: false,
                    }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                    </Stack.Group>


                    <Stack.Group screenOptions={{
                        presentation: 'transparentModal',
                        headerShown: false,
                    }}>
                        <Stack.Screen name="Match" component={Match} />
                    </Stack.Group>

                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator;
