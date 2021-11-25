import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import {Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
    {
        firstName: 'Rokas',
        lastName: 'Rudzianskas',
        job: 'Software Developer',
        photoUrl: 'https://avatars.githubusercontent.com/u/38469892?v=4',
        age: 19,
    },
    {
        firstName: 'Elon',
        lastName: 'Musk',
        job: 'Software Developer',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg',
        age: 40,
    },
    {
        firstName: 'Johny',
        lastName: 'Musk',
        job: 'Software Developer',
        photoUrl: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F61688aa1d4a8658c3f4d8640%2FAntonio-Juliano%2F0x0.jpg%3Ffit%3Dscale',
        age: 21,
    },
];

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
        <SafeAreaView style={tw('flex-1')}>
            {/* header */}

            <View style={tw('items-center flex-row justify-between px-5')}>
                <TouchableOpacity onPress={logout} activeOpacity={0.5} style={tw('')}>
                    <Image source={{ uri: user?.photoURL }} style={tw('h-10 w-10 rounded-full')} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}>
                    <Image source={require('../../assets/tinder.png')} style={tw('h-14 w-14')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={tw('')} activeOpacite={0.5}>
                    <Ionicons name="chatbubbles-sharp" size={30} color={'#FF5864'} />
                </TouchableOpacity>

            </View>
            {/* End of the header */}

            {/* Cards */}

            <View style={tw('flex-1 -mt-6')}>
                <Swiper
                    containerStyle={{backgroundColor: 'transparent'}}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    onSwipedLeft={() => {
                        console.log('swiped left passed');
                    }}
                    onSwipedRight={() => {
                        console.log('swiped right matched');
                    }}
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    textAlign: 'right',
                                    color: 'red',
                                }
                            }
                        },
                        right: {
                            title: 'MATCH',
                            style: {
                                label: {
                                    textAlign: 'left',
                                    color: '#4DED30',
                                }
                            }
                        }
                    }}
                    animateCardOpacity={true}
                    verticalSwipe={false}
                    renderCard={(card, i) => (
                        <View key={i} style={tw('bg-white  h-3/4 rounded-xl relative')}>
                            <Image source={{ uri: card?.photoUrl }} style={tw('absolute h-full w-full rounded-xl')} />

                            <View style={[tw('bg-white flex-row w-full h-20 absolute bottom-0 justify-between items-center px-6 py-2 rounded-b-xl'), styles.cardShadow]}>
                                <View>
                                    <Text style={tw('text-xl font-bold')} >{card?.firstName} {card?.lastName}</Text>
                                    <Text >{card?.job}</Text>
                                </View>
                                <Text style={tw('text-2xl font-bold')}>{card?.age}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/*<Button onPress={() => navigation.navigate('Chat')} title={'Go to chat Screen'}/>*/}
            {/*<Button onPress={logout} title={'Log Out'}/>*/}
        </SafeAreaView>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
})
