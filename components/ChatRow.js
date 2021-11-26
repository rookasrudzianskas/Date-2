import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const ChatRow = ({matchDetails}) => {

    const navigation = useNavigation();
    const {user} = useAuth();


    return (
        <TouchableOpacity>
            <Image source={{ uri: }} />
        </TouchableOpacity>
    );
};

export default ChatRow;
