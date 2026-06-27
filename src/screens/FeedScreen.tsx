import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';

import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const reels = [
  {
    id: '1',
    video:
      'https://res.cloudinary.com/diazmm0lw/video/upload/v1782539681/This_was_so_much_better_than_I_expected_Voyage_to_the_Falls_Boat_Tour_Niagara_City_Cruises_iu0teb.mp4',
    title: 'Niagara city',
  },
  {
    id: '2',
    video:
      'https://res.cloudinary.com/diazmm0lw/video/upload/v1782539682/KP_waterfalls_Maharashtra._kpwaterfall_maharashtra_monsoon_a5xghe.mp4',
    title: 'Greenary',
  },
];

const commentsData = [
  { id: '1', user: 'Amit', text: 'Very nice location 👌👌' },
  { id: '2', user: 'Sara', text: 'We will get a piece of mind 😍 ' },
  { id: '3', user: 'John', text: 'So beautiful!!!!!!!!!!!!!' },
];

const FeedScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedReels, setLikedReels] = useState<string[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isFocused = useIsFocused();

  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 80,
  });

  useEffect(() => {
    const backAction = () => {
      if (showComments) {
        setShowComments(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [showComments]);

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

  const openComments = () => setShowComments(true);
  const closeComments = () => setShowComments(false);
  const togglePlayPause = () => setIsPaused(prev => !prev);

  const renderItem = ({ item, index }: any) => {
    const isActive = index === activeIndex;
    const isLiked = likedReels.includes(item.id);

    return (
      <View style={styles.reelContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (showComments) {
              closeComments();
            } else {
              togglePlayPause();
            }
          }}
        >
          <Video
            source={{ uri: item.video }}
            style={styles.video}
            resizeMode="cover"
            repeat
            paused={!isFocused || !isActive || isPaused}
          />

          {isActive && (
            <TouchableOpacity
              style={styles.playPauseIcon}
              onPress={togglePlayPause}
              activeOpacity={1}
            >
              <Ionicons
                name={isPaused ? 'play' : 'pause'}
                size={width * 0.15}
                color="white"
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {/* OVERLAY */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={width * 0.08}
                color={isLiked ? 'red' : 'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={openComments}>
              <Ionicons name="chatbubble-outline" size={width * 0.075} color="white" />
            </TouchableOpacity>

            <Ionicons name="share-social-outline" size={width * 0.075} color="white" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* FEED */}
      <FlatList
        data={reels}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* COMMENTS MODAL */}
      <Modal
        visible={showComments}
        animationType="slide"
        transparent
        onRequestClose={closeComments}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={closeComments}
          />

          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Comments</Text>

            {commentsData.map(c => (
              <View key={c.id} style={{ marginBottom: width * 0.03 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {c.user}
                </Text>
                <Text style={{ color: '#ccc' }}>{c.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  reelContainer: {
    height,
    width,
    backgroundColor: 'black',
  },

  video: {
    width: width,
    height: height,
  },

  playPauseIcon: {
    position: 'absolute',
    top: height * 0.45,
    left: width * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    position: 'absolute',
    bottom: height * 0.14,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  actions: {
    gap: width * 0.05,
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  sheet: {
    height: height * 0.5,
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: width * 0.04,
  },

  sheetTitle: {
    color: 'white',
    fontSize: width * 0.045,
    marginBottom: width * 0.03,
    fontWeight: 'bold',
  },
});