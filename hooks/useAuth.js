import React, {createContext, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';


const AuthContext = createContext({
    // initial state (empty)
});

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{
            user: 'Rokas'
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
