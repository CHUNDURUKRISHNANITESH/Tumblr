import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VerifyOtpScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const mobile = route?.params?.mobile;

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);

        // auto move to next input
        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            const updatedOtp = [...otp];

            if (updatedOtp[index] === '') {
                if (index > 0) {
                    inputs.current[index - 1]?.focus();
                }
            }

            updatedOtp[index] = '';
            setOtp(updatedOtp);
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join('');

        //  Empty validation
        if (otp.some(val => val === '')) {
            Toast.show({
                type: 'error',
                text1: 'Please enter all OTP digits',
            });
            return;
        }

        //  Wrong OTP validation
        if (enteredOTP !== '1234') {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
            });
            return;
        }

        //  Success
        Toast.show({
            type: 'success',
            text1: 'OTP Verified Successfully 🎉',
        });

        navigation.replace('BottomTab');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>

            <Text style={styles.subtitle}>
                Enter OTP sent to {mobile}
            </Text>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            inputs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={text => handleChange(text, index)}
                        onKeyPress={e => handleBackspace(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpBox}
                    />
                ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOTP}
            >
                <Text style={styles.buttonText}>VERIFY OTP</Text>
            </TouchableOpacity>

            {/* Resend OTP (UI only) */}
            <TouchableOpacity
                onPress={() =>
                    Toast.show({
                        type: 'info',
                        text1: 'OTP resent successfully',
                    })
                }
            >
                <Text style={styles.resendText}>
                    Resend OTP
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
    },

    subtitle: {
        textAlign: 'center',
        marginTop: 10,
        color: '#666',
    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },

    otpBox: {
        width: width * 0.18,
        height: width * 0.18,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 22,
        borderRadius: 10,
    },

    button: {
        backgroundColor: '#FF6600',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },

    resendText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#FF6600',
        fontWeight: '600',
    },
});