import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

type User = {
    name: string;
    mobile: string;
    username: string;
};

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const [mobile, setMobile] = useState('');

    const validateMobile = () => {
        if (!mobile.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Mobile number is required',
            });
            return false;
        }

        if (mobile.length !== 10) {
            Toast.show({
                type: 'error',
                text1: 'Mobile number must be exactly 10 digits',
            });
            return false;
        }

        return true;
    };

    const checkUserExists = async (mobileNumber: string) => {
        try {
            const users = await AsyncStorage.getItem('users');
            const parsedUsers: User[] = users ? JSON.parse(users) : [];
            return parsedUsers.find((u) => u.mobile === mobileNumber);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const handleGetOTP = async () => {
        const isValid = validateMobile();
        if (!isValid) return;

        const user = await checkUserExists(mobile);

        if (!user) {
            Toast.show({
                type: 'error',
                text1: 'User not found. Please sign up first.',
            });
            return;
        }

        // 🔥 IMPORTANT FIX: set current logged-in user
        await AsyncStorage.setItem(
            'currentUser',
            JSON.stringify(user)
        );

        navigation.navigate('VerifyOtp', { mobile });
    };

    return (
        <View style={styles.container}>
            <View style={styles.bg} />
            <Image
                source={{
                    uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782594244/Group_trmekl.png',
                }}
                style={styles.topImage}
            />

            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Enter Mobile Number"
                    keyboardType="number-pad"
                    value={mobile}
                    onChangeText={setMobile}
                    style={styles.input}
                    maxLength={10}
                />

                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={handleGetOTP}>
                        <Text style={styles.buttonText}>GET OTP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#444' }]}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Image
                source={{
                    uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782594243/bottomGroup_d3fojj.png',
                }} style={styles.bottomImage} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#E4F3FF',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 2,
    },

    bottomImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width * 0.5,
        height: height * 0.22,
        resizeMode: 'cover',
    },

    topImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height * 0.42,
        resizeMode: 'cover',
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: width * 0.05,
    },

    title: {
        fontSize: width * 0.08,
        fontFamily: 'Sen-Bold',
        marginBottom: height * 0.035,
        textAlign: 'center',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: width * 0.04,
        marginBottom: height * 0.025,
        fontSize: width * 0.04,
        fontFamily: 'Sen-Regular',
        backgroundColor: 'white',
    },

    button: {
        backgroundColor: '#004E89',
        padding: width * 0.042,
        borderRadius: 10,
        marginBottom: height * 0.02,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'Sen-Bold'
    },
});