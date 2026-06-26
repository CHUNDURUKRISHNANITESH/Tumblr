import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';

import { stories, posts } from '../../data/homeData';
import StoryItem from './components/StoryItem';
import PostItem from './components/PostItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEADER_HEIGHT = 60;
const STORY_HEIGHT = 100;

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const [headerVisible, setHeaderVisible] = useState(true);

  let lastOffset = 0;

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset > lastOffset && currentOffset > 50) {
      setHeaderVisible(false); // scroll down → hide
    } else {
      setHeaderVisible(true); // scroll up → show
    }

    lastOffset = currentOffset;
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      {headerVisible && (
        <View style={styles.header}>
          <Image
            source={require('../../assets/tumblrLogo.png')}
            style={styles.logo}
          />
          <Ionicons name="notifications" color="#000" size={30} />

        </View>
      )}

      {/* STORIES */}
      {headerVisible && (
        <View style={styles.stories}>
          <FlatList
            data={stories}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <StoryItem
                username={item.username}
                image={item.image}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* POSTS */}
      <Animated.FlatList
        data={posts}
        keyExtractor={item => item.id}
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
    paddingTop:20,
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },

  stories: {
    height: STORY_HEIGHT,
    paddingHorizontal: 10,
  },
});