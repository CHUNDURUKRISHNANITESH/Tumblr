import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


type Props = {
    username: string;
    profile: string;
    postImage: string;
    caption: string;
    likes: number;
};

const PostItem = ({ username, profile, postImage, caption, likes }: Props) => {
    const [liked, setLiked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: profile }} style={styles.profile} resizeMode="contain" />
                <Text style={styles.username}>{username}</Text>
            </View>

            {/* Image */}
            <Image source={{ uri: postImage }} style={styles.postImage} />

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => { setLiked(!liked), toggleFavorite() }}>
                    <AntDesign
                        name={isFavorite ? "heart" : "hearto"}
                        size={22}
                        color={isFavorite ? "red" : "black"}
                    />
                </TouchableOpacity>

                <Icon name="message-circle" size={24} color="black" />
                <Icon name="share-2" size={24} color="black" />
            </View>

            {/* Caption */}
            <Text style={styles.caption}>
                <Text style={{ fontWeight: 'bold' }}>{username} </Text>
                {caption}
            </Text>

            {/* Likes */}
            <Text style={styles.likes}>
                {liked ? likes + 1 : likes} likes
            </Text>
        </View>
    );
};

export default PostItem;

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 18,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    actions: {
        flexDirection: 'row',
        gap: 15,
        padding: 10,
    },
    caption: {
        paddingHorizontal: 10,
    },
    likes: {
        paddingHorizontal: 10,
        marginTop: 5,
        fontWeight: '600',
    },
});