import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { stories, posts } from '../../data/homeData';
import StoryItem from './components/StoryItem';
import PostItem from './components/PostItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HEADER_HEIGHT = width * 0.15;   // ~60 on standard phone
const STORY_HEIGHT = width * 0.26;    // ~100 on standard phone
const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + STORY_HEIGHT;

const HomeScreen = () => {
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);
  const headerHidden = useRef(false);

  const animateHeader = (hide: boolean) => {
    Animated.timing(headerTranslateY, {
      toValue: hide ? -TOTAL_HEADER_HEIGHT : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    headerHidden.current = hide;
  };

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (
      currentOffset > lastOffset.current &&
      currentOffset > 50 &&
      !headerHidden.current
    ) {
      animateHeader(true);
    }

    if (
      currentOffset < lastOffset.current &&
      headerHidden.current
    ) {
      animateHeader(false);
    }

    lastOffset.current = currentOffset;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topContainer,
          {
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logoName}>Tumblr</Text>

          <Ionicons name="notifications" color="#000" size={width * 0.075} />
        </View>

        {/* STORIES */}
        <View style={styles.stories}>
          <FlatList
            horizontal
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StoryItem
                username={item.username}
                image={item.image}
                video={item.video}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.View>

      {/* POSTS */}
      <Animated.FlatList
        contentContainerStyle={{
          paddingTop: TOTAL_HEADER_HEIGHT + width * 0.05,
          paddingBottom: width * 0.05,
        }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem {...item} />}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topContainer: {
    position: 'absolute',
    top: 1,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#fff',
  },

  header: {
    height: width * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    backgroundColor: '#fff',
    marginTop: width * 0.04,
  },

  logoName: {
    fontSize: width * 0.075,
    fontFamily: 'Sen-Bold',
    marginLeft: width * 0.02,
  },

  stories: {
    height: width * 0.26,
    backgroundColor: '#fff',
  },
});