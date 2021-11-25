import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const HomeScreen = () => {
    const navigation = useNavigation();

    const {logout, user} = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView>
            {/* header */}

            <View>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>

            {/* End of the header */}
            <Button onPress={() => navigation.navigate('Chat')} title={'Go to chat Screen'}/>
            <Button onPress={logout} title={'Log Out'}/>
        </SafeAreaView>
    );
};

export default HomeScreen;
