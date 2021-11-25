import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import {Ionicons} from "@expo/vector-icons";

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

            <View style={tw('items-center relative')}>
                <TouchableOpacity activeOpacity={0.5} style={tw('absolute left-5 top-3')}>
                    <Image source={{ uri: user?.photoURL }} style={tw('h-10 w-10 rounded-full')} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}>
                    <Image source={require('../../assets/tinder.png')} style={tw('h-14 w-14')} />
                </TouchableOpacity>

                <TouchableOpacity style={tw('absolute right-5 top-3')} activeOpacite={0.5}>
                    <Ionicons name="chatbubbles-sharp" size={30} />
                </TouchableOpacity>

            </View>



            {/* End of the header */}
            {/*<Button onPress={() => navigation.navigate('Chat')} title={'Go to chat Screen'}/>*/}
            {/*<Button onPress={logout} title={'Log Out'}/>*/}
        </SafeAreaView>
    );
};

export default HomeScreen;
