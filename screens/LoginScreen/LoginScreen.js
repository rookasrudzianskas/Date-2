import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import useAuth from "../../hooks/useAuth";

const LoginScreen = () => {
    const {user} = useAuth();

    return (
        <View>
            <Text>Login to the app</Text>
            <Text>{user}</Text>
        </View>
    );
};

export default LoginScreen;
