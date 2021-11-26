import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Header from "../../components/Header";
import ChatList from "../../components/ChatList";

const ChatScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView>
            <Header title={'Chat'} callEnabled={false} />
            <ChatList />
        </SafeAreaView>
    );
};

export default ChatScreen;
