import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
    username: string;
    image: string;
};

const StoryItem = ({ username, image }: Props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>{username}</Text>
        </View>
    );
};

export default StoryItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FF7A00',
    },
    text: {
        fontSize: 12,
        marginTop: 5,
    },
});