import React, {createContext, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from '@firebase/auth';

const AuthContext = createContext({
    // initial state (empty)


});


const config = {
    androidClientId: '665993343465-l1tdtfsaongopqarudmb7q38q3icmlb8.apps.googleusercontent.com',
    iosClientId: '665993343465-gv4v6pb0iv071it8jpdbn02a6go2pg2n.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ['public_profile', 'email', 'gender', 'location'],
}

export const AuthProvider = ({ children }) => {



    const signInWithGoogle = async () => {
        Google.logInAsync(config).then(async (loginResult) => {
            if(loginResult.type === 'success') {
            //    login
                const {idToken, accessToken } = loginResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(credential);
            }
            return Promise.reject();
        });
    }

    return (
        <AuthContext.Provider value={{
            user: null,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
