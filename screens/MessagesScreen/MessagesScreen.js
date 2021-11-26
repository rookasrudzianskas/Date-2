import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import Header from "../../components/Header";
import {useNavigation} from "@react-navigation/native";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import useAuth from "../../hooks/useAuth";

const MessageScreen = ({matchDetails}) => {

    const navigation = useNavigation();

    const user = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView>
            <Header callEnabled={true} title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} />
        </SafeAreaView>
    );
};

export default MessageScreen;
