import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";
import {AntDesign, Entypo, FontAwesome5, Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {collection, query, doc, getDocs, getDoc, onSnapshot, setDoc, where, serverTimestamp} from "@firebase/firestore";
import {db} from "../../firebase";
import generateId from "../../lib/generateId";

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
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        const unsub = onSnapshot(doc(db, 'users', user.uid), snapshot => {
            if(!snapshot.exists()) {
                navigation.navigate('Modal');
            }
        });

        return () => unsub();
    }, []);

    // console.log(user)

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then((snapshot) => (
                snapshot.docs.map((doc) => doc.id)
            ));

            const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then((snapshot) => (
                snapshot.docs.map((doc) => doc.id)
            ));

            // console.log(passes.length, swipes.length);
            const passedUserIds = passes.length > 0 ? passes : ['test'];
            const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

            // console.log([...passedUserIds, ...swipedUserIds]);

            unsub = onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])), (snapshot) => {
                setProfiles(snapshot.docs.filter((doc) => doc.id !== user.uid).map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
        };

        fetchCards();

        return () => unsub;
    }, [db]);

    const swipeLeft = async (cardIndex) => {
        if(!profiles[cardIndex]) {
            return;
        }

        const userSwiped = profiles[cardIndex];
        console.log(`You have swiped PASS on ${userSwiped.displayName}`);
        // upload to the firebase;
        setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);
    }

    const swipeRight = async (cardIndex) => {
        if(!profiles[cardIndex]) {
            return;
        }

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (await getDoc(doc(db, 'users', user.uid))).data();

        // check if user swipes on yourself
        getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then((documentSnapshot) => {
            if(documentSnapshot.exists()) {
                // the user has matched with you before you matched with them...
                Alert.alert(`You have matched with ${userSwiped.displayName}`);

                setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);

                // create a match
                setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
                    users: {
                        [user.uid]: loggedInProfile,
                        [userSwiped.id]: userSwiped,
                    },
                    usersMatched: [user.uid, userSwiped.id],
                    timestamp: serverTimestamp(),
                });

                navigation.navigate('Match', {
                    loggedInProfile, userSwiped,
                });
            } else {
                // the user has not matched with you before... or did not swiped right on you
                // console.log(`You have swiped NO on ${userSwiped.displayName}`);
            }
        });

        // user has swiped as first interaction between the two...
        console.log(`You have swiped LIKE on ${userSwiped.displayName} (${userSwiped.job})`);

        setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);

    }

    // console.log(profiles);

    return (
        <SafeAreaView style={tw('flex-1')}>
            {/* header */}

            <View style={tw('items-center flex-row justify-between px-5')}>
                <TouchableOpacity onPress={logout} activeOpacity={0.5} style={tw('')}>
                    <Image source={{ uri: user?.photoURL }} style={tw('h-10 w-10 rounded-full')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Modal')} activeOpacity={0.5}>
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
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    backgroundColor="#4FD0E9"
                    ref={swipeRef}
                    onSwipedLeft={(cardIndex) => {
                        // console.log('swiped left passed');
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex) => {
                        // console.log('swiped right matched');
                        swipeRight(cardIndex);
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
                    renderCard={(card, i) => card ? (
                        <View key={i} style={tw('bg-white  h-3/4 rounded-xl relative')}>
                            <Image source={{ uri: card?.photoURL }} style={tw('absolute h-full w-full rounded-xl')} />

                            <View style={[tw('bg-white flex-row w-full h-20 absolute bottom-0 justify-between items-center px-6 py-2 rounded-b-xl'), styles.cardShadow]}>
                                <View>
                                    <Text style={tw('text-xl font-bold')} >{card?.displayName}</Text>
                                    <Text >{card?.job}</Text>
                                </View>
                                <Text style={tw('text-2xl font-bold')}>{card?.age}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={[tw('relative bg-white h-3/4 rounded-xl justify-center items-center'), styles.cardShadow]}>
                            <Text style={tw('font-bold pb-5')}>No more profile pictures</Text>
                            <FontAwesome5 name="sad-cry" size={60} color='#fe3c72' />
                            {/*<Image*/}
                            {/*    style={tw('h-20 w-full')} />*/}
                            {/*    height={100}*/}
                            {/*    width={100}*/}
                            {/*    source={{ uri: 'https://links.papareact.com/6gb' }}*/}
                        </View>
                    )}
                />
            </View>

            <View style={tw('flex flex-row justify-evenly')}>

                <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} activeOpacity={0.5} style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}>
                    <Entypo name={'cross'} size={24} color={'red'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} activeOpacity={0.5} style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}>
                    <AntDesign name={'heart'} size={24} color={'green'} />
                </TouchableOpacity>

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
