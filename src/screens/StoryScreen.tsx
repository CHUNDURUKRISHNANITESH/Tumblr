import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Animated,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Keyboard,
    StyleSheet,
} from 'react-native';

import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const STORY_DURATION = 5000;

const StoryScreen = ({ route, navigation }: any) => {
    const { username, video } = route.params;

    const progress = useRef(new Animated.Value(0)).current;
    const shiftAnim = useRef(new Animated.Value(0)).current;

    const [liked, setLiked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => setIsFavorite(prev => !prev);

    const start = () => {
        progress.setValue(0);

        Animated.timing(progress, {
            toValue: 1,
            duration: STORY_DURATION,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) next();
        });
    };

    const next = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            const keyboardHeight = e.endCoordinates.height;

            Animated.timing(shiftAnim, {
                toValue: -keyboardHeight,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(shiftAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        start();
    }, []);

    return (
        <View style={styles.container}>

            {/* USERNAME */}
            <View style={styles.usernameWrap}>
                <Text style={styles.username}>{username}</Text>
            </View>

            {/* PROGRESS BAR */}
            <View style={styles.progressWrap}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, width - width * 0.05],
                            }),
                        },
                    ]}
                />
            </View>

            {/* VIDEO */}
            <Video
                source={{ uri: video }}
                style={styles.video}
                resizeMode="cover"
                repeat
                paused={false}
            />

            {/* REPLY BAR */}
            <Animated.View
                style={[
                    styles.replyContainer,
                    {
                        transform: [{ translateY: shiftAnim }],
                    },
                ]}
            >
                <View style={styles.replyBox}>
                    <TextInput
                        placeholder={`Reply to ${username}...`}
                        placeholderTextColor="#ccc"
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => {
                        setLiked(!liked);
                        toggleFavorite();
                    }}
                >
                    <AntDesign
                        name={isFavorite ? 'heart' : 'hearto'}
                        size={22}
                        color={isFavorite ? 'red' : 'white'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="send-outline" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default StoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    video: {
        width: width,
        height: height,
    },

    usernameWrap: {
        position: 'absolute',
        top: height * 0.06,
        left: width * 0.05,
        zIndex: 10,
    },

    username: {
        color: 'white',
        fontSize: width * 0.04,
        fontFamily: 'Sen-Regular',
    },

    progressWrap: {
        flexDirection: 'row',
        position: 'absolute',
        top: height * 0.04,
        width: '100%',
        paddingHorizontal: width * 0.025,
        zIndex: 10,
    },

    progressBar: {
        height: 3,
        backgroundColor: 'white',
    },

    replyContainer: {
        position: 'absolute',
        bottom: height * 0.07,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.03,
    },

    replyBox: {
        flex: 1,
        height: height * 0.055,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginRight: 10,
    },

    input: {
        color: '#fff',
        fontSize: width * 0.035,
        fontFamily: 'Sen-Regular',
    },

    iconBtn: {
        marginHorizontal: width * 0.01,
    },
});