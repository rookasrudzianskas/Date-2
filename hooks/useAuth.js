import React, {createContext, useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
} from '@firebase/auth';
import { getAuth, signOut } from "firebase/auth";

import {auth} from "../firebase";
import tw from 'tailwind-rn';

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
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() =>  {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                // logged in
                setUser(user);
            } else {
                // logged out
                setUser(null);
            }
            setLoadingInitial(false);
        });
        return unsub();
    }, []);


    const logout = () => {
        setLoading(true);

        signOut(auth).catch(error => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    const signInWithGoogle = async () => {

        setLoading(true);

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
        }).finally(() => setLoading(false));
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            logout,
            signInWithGoogle
        }}>
            {!loadingInitial && children}
            {/*    // <View style={tw('flex items-center justify-center')}>*/}
            {/*    //     <ActivityIndicator size={'large'} color={'blue'} />*/}
            {/*    // </View>*/}
            {/*// ) : (*/}
            {/*//     <>*/}
            {/*//     </>*/}
            {/*// )}*/}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
