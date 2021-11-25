import React, {createContext, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';


const AuthContext = createContext({
    // initial state (empty)


});


const config = {
    iosClientId: '665993343465-gv4v6pb0iv071it8jpdbn02a6go2pg2n.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ['public_profile', 'email', 'gender', 'location'],
}

export const AuthProvider = ({ children }) => {

    const signInWithGoogle = async () => {
        await Google.logInAsync(config);
    }

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
