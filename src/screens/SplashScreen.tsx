import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

//navigation type
type RootStackParamList = {
  Login: undefined;
  Splash: undefined;
};

type SplashNavProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tumblr</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },

  subText: {
    marginTop: 10,
    fontSize: width * 0.04,
    color: '#aaa',
  },
});