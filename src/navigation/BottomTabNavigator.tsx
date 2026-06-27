import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedScreen from '../screens/FeedScreen';

const { width } = Dimensions.get('window');

export type BottomTabParamList = {
    Home: undefined;
    Feed: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#004E89',
                tabBarInactiveTintColor: 'gray',

                tabBarStyle: styles.tabBarStyle,

                tabBarLabelStyle: {
                    fontFamily: 'Sen-Medium',
                    fontSize: width * 0.03,
                },

                tabBarIcon: ({ color }) => {
                    let iconName = '';

                    if (route.name === 'Home') iconName = 'home-outline';
                    else if (route.name === 'Feed') iconName = 'play-circle-outline';
                    else if (route.name === 'Profile') iconName = 'person-outline';

                    return (
                        <Ionicons
                            name={iconName}
                            size={width * 0.065}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        left: width * 0.03,
        right: width * 0.03,
        height: width * 0.25,
        borderRadius: 15,
        backgroundColor: '#fff',
        elevation: 5,
        paddingBottom: width * 0.02,
        paddingTop: width * 0.01,
    },
});