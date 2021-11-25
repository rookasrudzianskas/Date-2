import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
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
    const [image, setImage]  = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

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


            {/* the profile pic 📹 ------------- */}
            <Text style={tw('text-center p-4 font-bold text-red-400')}>
                Step 1: The Profile Pic 🖼️
            </Text>

            <TextInput
                value={image}
                onChangeText={text => setImage(text)}
                style={tw('text-center text-xl pb-2')}
                placeholder="Enter Profile Pic URL"
            />

            {/* end of the profile pic 📹 ------------- */}

            {/* the job 📹 ------------- */}
            <Text style={tw('text-center p-4 font-bold text-red-400')}>
                Step 2: The Job 📝
            </Text>

            <TextInput
                value={job}
                onChangeText={text => setJob(text)}
                style={tw('text-center text-xl pb-2')}
                placeholder="Enter your occupation"
            />

            {/* end of job 📹 ------------- */}

            {/* the age 📹 ------------- */}
            <Text style={tw('text-center p-4 font-bold text-red-400')}>
                Step 3: The Age 👴
            </Text>

            <TextInput
                value={age}
                onChangeText={text => setAge(text)}
                style={tw('text-center text-xl pb-2')}
                placeholder="Enter your age"
                maxlength={2}
                keyboardType='numeric'
            />

            {/* end of the age 📹 ------------- */}

            <TouchableOpacity disabled={incompleteForm} activeOpacity={0.5} style={
                incompleteForm ? tw('bg-gray-400 w-64 p-3 rounded-xl absolute bottom-10 ') : tw('w-64 p-3 rounded-xl absolute bottom-10 bg-red-400')
            }>
                <Text style={tw('text-center text-white text-xl')}>Update Profile</Text>
            </TouchableOpacity>

        </View>
    );
};

export default ModalScreen;
