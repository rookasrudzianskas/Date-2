import React, {createContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';


const AuthContext = createContext({
    // initial state (empty)
});

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    );
};

