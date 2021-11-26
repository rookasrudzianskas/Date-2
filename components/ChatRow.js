import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import tw from "tailwind-rn";

const ChatRow = ({matchDetails}) => {

    const navigation = useNavigation();
    const {user} = useAuth();
    // define the state for the matchedUserInfo with default value null
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);

    return (
        <TouchableOpacity style={tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg')}>
            <Image style={tw('rounded-full h-16 w-16 mr-4')} source={{ uri: matchedUserInfo?.photoURL}} />
        </TouchableOpacity>
    );
};

export default ChatRow;
