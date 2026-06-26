import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type User = {
  name: string;
  mobile: string;
  username: string;
};

const staticPostImages = [
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475581/TheGreatWallofChina_jgnx6o.webp",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475581/images_2_qrapyj.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475581/Taj-Mahal_u93vjl.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475580/egypt-1179193-1920x1276_jitzgl.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475580/7_wonders_colosseum_exiax9.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475580/m6czz0VR3XmEKqglNJ_d93_vdMz9lcQGMUfpg3JyCzONXqXJr8okPuXhNy2FMzDwGm7oXjovEo5N6GIA9rgBPJu09YgJ4LxxwY1JAiy-czKz9r62ielX3nb9H0F0fmAYJZrjV8vH_rhXl5NfDhLXxzY_al5g2y.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475580/960x0_1_uef8sj.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475580/images_3_hp7vrz.jpg",
  "https://res.cloudinary.com/diazmm0lw/image/upload/v1782475580/960x0_o1thcv.jpg"
];

const staticPosts = staticPostImages.map((image, index) => ({
  id: (index + 1).toString(),
  image,
}));

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>(null);
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const userKey = 'currentUser';

  // ---------------- LOAD USER ----------------
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await AsyncStorage.getItem(userKey);
    if (current) {
      const parsed = JSON.parse(current);
      setUser(parsed);

      const savedDesc = await AsyncStorage.getItem(
        `desc_${parsed.mobile}`,
      );

      if (savedDesc) {
        setDescription(savedDesc);
      }
    }
  };

  // ---------------- SAVE DESCRIPTION ----------------
  const saveDescription = async () => {
    if (!user) return;

    await AsyncStorage.setItem(
      `desc_${user.mobile}`,
      description,
    );

    setIsEditing(false);
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = async () => {
    await AsyncStorage.removeItem(userKey);
    navigation.replace('Login');
  };

  // ---------------- RENDER GRID ITEM ----------------
  const renderPost = ({ item }: any) => (
    <Image source={{ uri: item.image }} style={styles.gridImage} />
  );

  return (
    <View style={styles.container}>
      {/* PROFILE HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782475937/Nitesh_passport_photo_vbcv0h.jpg',
          }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.username}</Text>

        {/* DESCRIPTION */}
        {description.length === 0 && !isEditing ? (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.addBtn}
          >
            <Text style={styles.addText}>Add Description</Text>
          </TouchableOpacity>
        ) : (
          <>
            {isEditing ? (
              <>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter description"
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={saveDescription}
                  style={styles.saveBtn}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.desc}>{description}</Text>
            )}
          </>
        )}

        {/* LOGOUT */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* GRID POSTS */}
      <FlatList
        data={staticPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },

  username: {
    fontSize: 14,
    color: 'gray',
  },

  desc: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  addBtn: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },

  addText: {
    fontSize: 14,
    color: '#333',
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
  },

  saveBtn: {
    marginTop: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },

  saveText: {
    color: '#fff',
  },

  logoutBtn: {
    marginTop: 15,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },

  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },

  grid: {
    padding: 2,
  },

  gridImage: {
    width: width / 3,
    height: width / 3,
    margin: 1,
  },
});