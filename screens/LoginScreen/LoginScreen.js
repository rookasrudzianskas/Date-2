import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity} from 'react-native';
import useAuth from "../../hooks/useAuth";
import {useNavigation} from "@react-navigation/native";
import tw from "tailwind-rn";

const LoginScreen = () => {

    const {signInWithGoogle, loading} = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <View style={tw("flex-1")}>
            <ImageBackground
                resizeMode={'cover'}
                style={tw("flex-1" )}
                source={{ uri: 'https://tinder.com/static/tinder.png' }}>
                <TouchableOpacity onPress={signInWithGoogle} style={[tw("absolute bottom-40 w-52 bg-white rounded-2xl p-4"), { marginHorizontal: '25%'}]} activeOpacity={0.5}>
                    <Text style={tw("text-center font-semibold")}>Sign in & get swiping</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen;
