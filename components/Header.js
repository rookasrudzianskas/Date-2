import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import tw from "tailwind-rn";
import {Foundation, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const Header = ({title, callEnabled}) => {

    const navigation = useNavigation();

    return (
        <View style={tw('flex-row p-2 items-center justify-between')}>
            <View style={tw('flex flex-row items-center')}>
                <TouchableOpacity onPress={() =>  navigation.goBack()} style={tw('p-2')}>
                    <Ionicons name="chevron-back-outline" size={24} color="#FF5864"/>
                </TouchableOpacity>
                <Text style={tw('text-2xl font-bold pl-2')}>{title}</Text>
            </View>
        </View>
    );
};

export default Header;
