import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import 'react-native-gesture-handler';
import SignupScreen from './src/screens/SignupScreen';
import Toast from 'react-native-toast-message';
import VerifyOtpScreen from './src/screens/VerifyOtpScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  VerifyOtp: undefined;
  Home:undefined;
  BottomTab:undefined
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // hides top header
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;