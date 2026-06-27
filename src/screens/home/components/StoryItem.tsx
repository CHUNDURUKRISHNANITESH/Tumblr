// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import AnimatedStoryRing from '../components/AnimatedStoryRing';
// import StoryScreen from '../../StoryScreen';

// type Props = {
//     username: string;
//     image: string;
//     video: string
// };

// const StoryItem = ({ username, image, video }: Props) => {
//     const navigation = useNavigation<any>();

//     const [loading, setLoading] = useState(false);

//     const handlePress = () => {
//         if (loading) return; // Prevent multiple taps

//         setLoading(true);

//         setTimeout(() => {
//             setLoading(false);

//             navigation.navigate('StoryScreen', {
//                 username,
//                 video,
//             });
//         }, 1500);
//     };

//     return (
//         <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.container}
//             onPress={handlePress}
//         >
//             <AnimatedStoryRing
//                 loading={loading}
//                 image={
//                     <Image
//                         source={{ uri: image }}
//                         style={styles.image}
//                         resizeMode="contain"
//                     />
//                 }
//             />

//             <Text style={styles.text}>{username}</Text>
//         </TouchableOpacity>
//     );
// };
// export default StoryItem
// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         marginRight: 12,
//     },

//     image: {
//         width: 58,
//         height: 58,
//         borderRadius: 29,

//     },

//     text: {
//         marginTop: 6,
//         fontSize: 12,
//         fontFamily: 'Sen-Regular'
//     },
// });

import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AnimatedStoryRing from '../components/AnimatedStoryRing';

const { width } = Dimensions.get('window');

type Props = {
    username: string;
    image: string;
    video: string;
};

const StoryItem = ({ username, image, video }: Props) => {
    const navigation = useNavigation<any>();

    const [loading, setLoading] = useState(false);

    const handlePress = () => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            navigation.navigate('StoryScreen', {
                username,
                video,
            });
        }, 1500);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={handlePress}
        >
            <AnimatedStoryRing
                loading={loading}
                image={
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                }
            />

            <Text style={styles.text} numberOfLines={1}>
                {username}
            </Text>
        </TouchableOpacity>
    );
};

export default StoryItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: width * 0.03,
    },

    image: {
        width: width * 0.145, 
        height: width * 0.145,
        borderRadius: width * 0.0725,
    },

    text: {
        marginTop: width * 0.015,
        fontSize: width * 0.03, 
        fontFamily: 'Sen-Regular',
        maxWidth: width * 0.18,
    },
});