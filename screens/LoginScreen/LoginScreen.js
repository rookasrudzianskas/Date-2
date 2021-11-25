import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import useAuth from "../../hooks/useAuth";

const LoginScreen = () => {

    const {signInWithGoogle, loading} = useAuth();
    const navigation = useNavigation();

    return (
        <View>
            <Text>{loading ? 'Loading... 🔥' : 'Login to the app'}</Text>
            <Button title="login" onPress={signInWithGoogle} />
        </View>
    );
};

export default LoginScreen;
