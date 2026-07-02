import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import 'react-native-gesture-handler';
import SignupScreen from './src/screens/SignupScreen';
import VerifyOtpScreen from './src/screens/VerifyOtpScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import StoryScreen from './src/screens/StoryScreen';
import Toast, { BaseToast, ToastProps } from 'react-native-toast-message';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  VerifyOtp: undefined;
  Home: undefined;
  BottomTab: undefined;
  StoryScreen: { username: string, video: string }
};


const toastConfig = {
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: 'red', borderLeftColor: 'red' }}
      text1Style={{ color: 'white', fontSize: 16 }}
      text2Style={{ color: 'white', fontSize: 14 }}
    />
  ),
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: 'green', borderLeftColor: 'green' }}
      text1Style={{ color: 'white', fontSize: 16 }}
      text2Style={{ color: 'white', fontSize: 14 }}
    />
  ),
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
            <Stack.Screen name="StoryScreen" component={StoryScreen} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;