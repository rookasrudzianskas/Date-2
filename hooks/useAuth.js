import React, {createContext, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';


const AuthContext = createContext({
    // initial state (empty)
    // const signInWithGoogle = async () => {
    //     await Google.logInAsync(config);
    // }

});

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{
            user: null
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
