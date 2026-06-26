import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type User = {
    name: string;
    mobile: string;
    username: string;
};

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const [mobile, setMobile] = useState('');

    //  Validate Mobile Number
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

    //  Check user in AsyncStorage
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

    // Get OTP Handler
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

        navigation.navigate('VerifyOtp', { mobile });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Mobile Input */}
            <TextInput
                placeholder="Enter Mobile Number"
                keyboardType="number-pad"
                value={mobile}
                onChangeText={setMobile}
                style={styles.input}
                maxLength={10}
            />

            <View style={styles.buttons}>
                {/* Get OTP Button */}
                <TouchableOpacity style={styles.button} onPress={handleGetOTP}>
                    <Text style={styles.buttonText}>GET OTP</Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#444' }]}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    buttons:{
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#FF6600',
        padding: 17,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});