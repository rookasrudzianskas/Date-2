import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({matchDetails}) => {

    const navigation = useNavigation();
    const {user} = useAuth();

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);

    return (
        <TouchableOpacity>
            <Image source={{ uri: }} />
        </TouchableOpacity>
    );
};

export default ChatRow;
