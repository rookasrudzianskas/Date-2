import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import Header from "../../components/Header";
import {useNavigation, useRoute} from "@react-navigation/native";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import useAuth from "../../hooks/useAuth";

const MessageScreen = () => {

    const navigation = useNavigation();
    const {params} = useRoute();
    // please define the state for the input with blank string
    const [input, setInput] = useState('');

    const { matchDetails } = params;
    const {user} = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const sendMessage = () => {

    }

    return (
        <SafeAreaView>
            <Header callEnabled={true} title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} />

            <View>
                <TextInput style={tw('h-10 text-lg')} placeholder="Send a message..." onChangeText={setInput} onSubmitEditing={sendMessage} />
            </View>
        </SafeAreaView>
    );
};

export default MessageScreen;
