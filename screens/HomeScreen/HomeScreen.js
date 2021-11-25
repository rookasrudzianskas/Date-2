import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const HomeScreen = () => {
    const navigation = useNavigation();

    const {logout} = useAuth();

    return (
        <View>
            {/*<Button onPress={() => navigation.navigate('Chat')} title={'Go to chat Screen'}/>*/}
            {/*<Button onPress={logout} title={'Log Out'}/>*/}
        </View>
    );
};

export default HomeScreen;
