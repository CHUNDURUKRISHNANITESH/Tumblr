import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

type ReelItem = {
  id: string;
  video: string;
  title: string;
};

const reels: ReelItem[] = [
  {
    id: '1',
    video: 'https://res.cloudinary.com/diazmm0lw/video/upload/v1781845307/samples/cld-sample-video.mp4',
    title: 'Rapo Dance',
  },
  {
    id: '2',
    video: 'https://res.cloudinary.com/demo/video/upload/samples/elephants.mp4',
    title: 'Elephants group',
  },
];

const FeedScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedReels, setLikedReels] = useState<string[]>([]);

  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 80,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const toggleLike = (id: string) => {
    setLikedReels(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id],
    );
  };

  const renderItem = ({ item, index }: { item: ReelItem; index: number }) => {
    const isActive = index === activeIndex;
    const isLiked = likedReels.includes(item.id);

    return (
      <View style={styles.reelContainer}>
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={!isActive}
        />

        {/* Overlay UI */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.actions}>
            {/* LIKE */}
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={32}
                color={isLiked ? 'red' : 'white'}
              />
            </TouchableOpacity>

            {/* COMMENT */}
            <Ionicons name="chatbubble-outline" size={30} color="white" />

            {/* SHARE */}
            <Ionicons name="share-social-outline" size={30} color="white" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={reels}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef.current}
    />
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  reelContainer: {
    height: height,
    width: width,
    backgroundColor: 'black',
  },

  video: {
    height: '90%',
    width: '100%',
  },

  overlay: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  actions: {
    gap: 20,
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});