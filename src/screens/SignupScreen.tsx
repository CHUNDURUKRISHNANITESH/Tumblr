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

const SignupScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');

  //  Get existing users from storage
  const getUsers = async (): Promise<User[]> => {
    try {
      const data = await AsyncStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Validate Inputs
  const validate = async () => {
    if (!name.trim() || !mobile.trim() || !username.trim()) {
      Toast.show({
        type: 'error',
        text1: 'All fields are mandatory',
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

    const users = await getUsers();

    const mobileExists = users.find(u => u.mobile === mobile);
    if (mobileExists) {
      Toast.show({
        type: 'error',
        text1: 'Mobile number already exists',
      });
      return false;
    }

    const usernameExists = users.find(u => u.username === username);
    if (usernameExists) {
      Toast.show({
        type: 'error',
        text1: 'Username already exists',
      });
      return false;
    }

    return true;
  };

  // Handle Signup
  const handleSignup = async () => {
    const isValid = await validate();
    if (!isValid) return;

    const newUser: User = {
      name,
      mobile,
      username,
    };

    try {
      const users = await getUsers();

      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      Toast.show({
        type: 'success',
        text1: 'User registered successfully 🎉',
      });

      // Navigate back to Login
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Name */}
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Mobile */}
      <TextInput
        placeholder="Enter Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="number-pad"
        maxLength={10}
        style={styles.input}
      />

      {/* Username */}
      <TextInput
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#FF6600',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});