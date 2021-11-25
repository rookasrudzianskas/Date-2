import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const ChatScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View>
            <Text>
                byrookas 🚀
            </Text>
        </View>
    );
};

export default ChatScreen;
