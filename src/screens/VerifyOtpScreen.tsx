import React, { useRef, useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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

        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            const updatedOtp = [...otp];

            if (updatedOtp[index] === '' && index > 0) {
                inputs.current[index - 1]?.focus();
            }

            updatedOtp[index] = '';
            setOtp(updatedOtp);
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join('');

        if (otp.some(val => val === '')) {
            Toast.show({
                type: 'error',
                text1: 'Please enter all OTP digits',
            });
            return;
        }

        if (enteredOTP !== '1234') {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
            });
            return;
        }

        Toast.show({
            type: 'success',
            text1: 'OTP Verified Successfully',
        });

        navigation.replace('BottomTab');
    };

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782594244/Group_trmekl.png',
                }}
                style={styles.topImage}
            />

            <Text style={styles.title}>Verify OTP</Text>

            <Text style={styles.subtitle}>
                Enter OTP sent to {mobile}
            </Text>

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

            <TouchableOpacity
                style={styles.button}
                onPress={handleVerifyOTP}
            >
                <Text style={styles.buttonText}>VERIFY OTP</Text>
            </TouchableOpacity>

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

            <Image
                source={{
                    uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782594243/bottomGroup_d3fojj.png',
                }} style={styles.bottomImage} />
        </View>
    );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        justifyContent: 'center',
        backgroundColor: '#E4F3FF',
    },

    title: {
        fontSize: width * 0.065,
        fontFamily: 'Sen-Bold',
        textAlign: 'center',
    },

    subtitle: {
        textAlign: 'center',
        marginTop: height * 0.01,
        color: '#666',
        fontFamily: 'Sen-Regular'
    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },

    otpBox: {
        width: width * 0.18,
        height: width * 0.18,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: width * 0.055,
        fontFamily: 'Sen-Regular',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    button: {
        backgroundColor: '#004E89',
        padding: width * 0.04,
        borderRadius: 10,
        marginTop: height * 0.03,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'Sen-Bold'
    },

    resendText: {
        textAlign: 'center',
        marginTop: height * 0.02,
        color: '#004E89',
        fontFamily: 'Sen-Bold'
    },

    topImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height * 0.42,
        resizeMode: 'cover',
    },

    bottomImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width * 0.5,
        height: height * 0.22,
        resizeMode: 'cover',
    },
});