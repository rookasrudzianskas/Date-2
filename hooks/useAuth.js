import React, {createContext, useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from '@firebase/auth';
import {auth} from "../firebase";

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

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() =>  {
        onAuthStateChanged(auth, () => {
            if(user) {
                // logged in
                setUser(user);
            } else {
                // logged out
                setUser(null);
            }
        });
    }, []);

    const signInWithGoogle = async () => {
        await Google.logInAsync(config).then(async (loginResult) => {
            if(loginResult.type === 'success') {
            //    login
                const {idToken, accessToken } = loginResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }
            return Promise.reject();
        }).catch(err => {
            setError(err);
        });
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
