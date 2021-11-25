import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";

const HomeScreen = () => {
    const navigation = useNavigation();

    const {logout, user} = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // console.log(user)

    return (
        <SafeAreaView>
            {/* header */}

            <View>
                <TouchableOpacity activeOpacity={0.5}>
                    <Image source={{ uri: user?.photoURL }} style={tw('h-10 w-10 rounded-full')} />
                </TouchableOpacity>

            </View>

            {/* End of the header */}
            <Button onPress={() => navigation.navigate('Chat')} title={'Go to chat Screen'}/>
            <Button onPress={logout} title={'Log Out'}/>
        </SafeAreaView>
    );
};

export default HomeScreen;
