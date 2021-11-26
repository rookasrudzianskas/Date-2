import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import tw from "tailwind-rn";
import {collection, onSnapshot, query, where} from "@firebase/firestore";
import {db} from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {

    const [matches, setMatches] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid)), snapshot => setMatches(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
                }))
            )
        );

        return () => unsub;
    }, [user]);

    return matches.length > 0 ? (
        <FlatList
            style={tw('h-full')}
            data={matches}
            keyExtractor={item => item.id}
            renderItem={(({item}) => <ChatRow matchDetails={item} />)}
        />
    ) : (
        <View style={tw('p-5')}>
            <Text style={tw('text-center text-lg')}>No matches yet</Text>
        </View>
    )
};

export default ChatList;
