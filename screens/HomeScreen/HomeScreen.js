import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Button onPress={() => navigation.navigate('ChatScreen')} title={'Go to chat Screen'}/>
        </View>
    );
};

export default HomeScreen;
