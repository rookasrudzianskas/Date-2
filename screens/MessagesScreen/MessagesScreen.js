import React, {useLayoutEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback, Keyboard, FlatList
} from 'react-native';
import Header from "../../components/Header";
import {useNavigation, useRoute} from "@react-navigation/native";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import ReceiverMessage from "../../components/ReceiverMessage";
import SenderMessage from "../../components/SenderMessage";
import {addDoc, collection, serverTimestamp} from "@firebase/firestore";
import {db} from "../../firebase";

const MessageScreen = () => {

    const navigation = useNavigation();
    const {params} = useRoute();
    // please define the state for the input with blank string
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const { matchDetails } = params;
    const {user} = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input,
        });
    };

    return (
        <SafeAreaView style={tw('flex-1')}>
            <Header callEnabled={true} title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} />

            {/*<FlatList />*/}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw("flex-1")} keyboardVerticalOffset={10} >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList data={messages} style={tw('pl-4')} keyExtractor={(item) => item.id} renderItem={({item: message}) =>
                        message.userId === user.uid ? (
                            <SenderMessage key={message.id} message={message} />
                        ) : (
                            <ReceiverMessage key={message.id} message={message} />
                        )
                    } />
                </TouchableWithoutFeedback>
                <View
                    style={tw('flex-row justify-between items-center border-t border-gray-200 px-5 py-2')}
                >
                    <TextInput style={tw('h-10 text-lg')} placeholder="Send a message..." onChangeText={setInput} onSubmitEditing={sendMessage} />
                    <Button title={'Send'} color="#FF5864" onPress={sendMessage}/>
                </View>

            </KeyboardAvoidingView>


        </SafeAreaView>
    );
};

export default MessageScreen;
