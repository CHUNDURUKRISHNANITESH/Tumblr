import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Animated,
  Image
} from 'react-native';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type User = {
  name: string;
  mobile: string;
  username: string;
};

const SignupScreen = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');

  const shiftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      Animated.timing(shiftAnim, {
        toValue: -keyboardHeight * 0.3,
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

  const getUsers = async (): Promise<User[]> => {
    try {
      const data = await AsyncStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  };

  const validate = async () => {
    if (!name.trim() || !mobile.trim() || !username.trim()) {
      Toast.show({ type: 'error', text1: 'All fields are mandatory' });
      return false;
    }

    if (mobile.length !== 10) {
      Toast.show({ type: 'error', text1: 'Mobile number must be exactly 10 digits' });
      return false;
    }

    const users = await getUsers();

    if (users.find(u => u.mobile === mobile)) {
      Toast.show({ type: 'error', text1: 'Mobile number already exists' });
      return false;
    }

    if (users.find(u => u.username === username)) {
      Toast.show({ type: 'error', text1: 'Username already exists' });
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    const isValid = await validate();
    if (!isValid) return;

    // 1. CREATE USER FIRST (IMPORTANT)
    const newUser: User = {
      name,
      mobile,
      username,
    };

    try {
      // 2. GET OLD USERS
      const users = await getUsers();

      // 3. UPDATE USER LIST
      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      // 4. SAVE CURRENT LOGGED IN USER (IMPORTANT FIX)
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));

      Toast.show({
        type: 'success',
        text1: 'User registered successfully 🎉',
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782594244/Group_trmekl.png' }}
        style={styles.topImage}
      />

      <Animated.View style={{ transform: [{ translateY: shiftAnim }] }}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="number-pad"
          maxLength={10}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </Animated.View>

      <Image
        source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782594243/bottomGroup_d3fojj.png' }}
        style={styles.bottomImage}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: 'center',
    backgroundColor: '#E4F3FF',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.015,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#004E89',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  topImage: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.42,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.5,
    height: height * 0.22,
  },
});