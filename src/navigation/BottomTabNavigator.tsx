import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/home/HomeScreen';
//import FeedScreen from '../screens/feed/FeedScreen';
//import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedScreen from '../screens/FeedScreen';

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
                tabBarActiveTintColor: '#FF7A00',
                tabBarInactiveTintColor: 'gray',

                tabBarIcon: ({ color, size }) => {
                    let iconName = '';

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Feed') {
                        iconName = 'play-circle-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
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