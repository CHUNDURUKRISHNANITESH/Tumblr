import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

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
                <Image
                    source={{ uri: profile }}
                    style={styles.profile}
                    resizeMode="cover"
                />
                <Text style={styles.username}>{username}</Text>
            </View>

            {/* Image */}
            <Image source={{ uri: postImage }} style={styles.postImage} />

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={() => {
                        setLiked(!liked);
                        toggleFavorite();
                    }}
                >
                    <AntDesign
                        name={isFavorite ? 'heart' : 'hearto'}
                        size={22}
                        color={isFavorite ? 'red' : 'black'}
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
        marginBottom: width * 0.05,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.03,
    },

    profile: {
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: width * 0.045,
        marginRight: width * 0.03,
    },

    username: {
        fontFamily: 'Sen-Bold',
        fontSize: width * 0.04,
    },

    postImage: {
        width: '100%',
        height: width * 0.9,
    },

    actions: {
        flexDirection: 'row',
        gap: width * 0.04,
        padding: width * 0.03,
    },

    caption: {
        paddingHorizontal: width * 0.03,
        fontFamily: 'Sen-Regular',
        fontSize: width * 0.035,
    },

    likes: {
        paddingHorizontal: width * 0.03,
        marginTop: width * 0.015,
        fontFamily: 'Sen-Bold',
        fontSize: width * 0.035,
    },
});