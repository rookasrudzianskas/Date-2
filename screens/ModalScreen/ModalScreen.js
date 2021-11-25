import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import tw from "tailwind-rn";
import useAuth from "../../hooks/useAuth";

const ModalScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const {user} = useAuth();

    return (
        <View style={tw('flex-1 items-center pt-1')}>
            <Image
                style={tw('h-20 w-full')}
                resizeMode={'contain'}
                source={{ uri: 'https://links.papareact.com/2pf'}}
            />

            <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>
                Welcome {user?.displayName}
            </Text>

        </View>
    );
};

export default ModalScreen;
