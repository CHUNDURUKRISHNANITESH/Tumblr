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

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<User | null>(null);
  const [description, setDescription] = useState('');
  const [tempDesc, setTempDesc] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const userKey = 'currentUser';

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const current = await AsyncStorage.getItem(userKey);

    if (current) {
      const parsed: User = JSON.parse(current);
      setUser(parsed);

      const savedDesc = await AsyncStorage.getItem(`desc_${parsed.mobile}`);

      if (savedDesc) {
        setDescription(savedDesc);
        setTempDesc(savedDesc);
      }
    }
  };

  const staticPosts = staticPostImages.map((image, index) => ({
    id: (index + 1).toString(),
    image,
  }));

  const handleEdit = () => {
    setTempDesc(description);
    setIsEditing(true);
  };

  const saveDescription = async () => {
    if (!user) return;

    await AsyncStorage.setItem(`desc_${user.mobile}`, tempDesc);

    setDescription(tempDesc);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(userKey);
    navigation.replace('Login');
  };

  const renderPost = ({ item }: any) => (
    <Image source={{ uri: item.image }} style={styles.gridImage} />
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerRow}>

        {/* LEFT: Profile Image */}
        <Image
          source={{
            uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1782475937/Nitesh_passport_photo_vbcv0h.jpg',
          }}
          style={styles.profileImage}
        />

        {/* CENTER: User Info + Description */}
        <View style={styles.middleSection}>

          <Text style={styles.name}>
            {user?.name || 'User'}
          </Text>

          <Text style={styles.username}>
            @{user?.username || ''}
          </Text>

          {/* DESCRIPTION */}
          {isEditing ? (
            <>
              <TextInput
                value={tempDesc}
                onChangeText={setTempDesc}
                placeholder="Enter description"
                style={styles.input}
              />

              <TouchableOpacity onPress={saveDescription} style={styles.saveBtn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {description ? (
                <>
                  <Text style={styles.desc}>{description}</Text>

                  {/* EDIT BUTTON ALWAYS SHOWN WHEN DESCRIPTION EXISTS */}
                  <TouchableOpacity
                    onPress={() => {
                      setTempDesc(description);
                      setIsEditing(true);
                    }}
                    style={styles.addBtn}
                  >
                    <Text style={styles.addText}>Edit Description</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  style={styles.addBtn}
                >
                  <Text style={styles.addText}>Add Description</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        {/* RIGHT: Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtnSmall}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </View>
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
const GRID_SIZE = width / 3;

const styles = StyleSheet.create({

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 20,
    marginTop: 30
  },

  middleSection: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },

  logoutBtnSmall: {
    backgroundColor: '#004E89',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'center',
    paddingVertical: width * 0.05,
    marginTop: 30
  },

  profileImage: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.11,
  },

  name: {
    fontSize: width * 0.045,
    fontFamily: 'Sen-Bold',
    marginTop: width * 0.025,
  },

  username: {
    fontSize: width * 0.035,
    fontFamily: 'Sen-Regular',
    color: 'gray',
  },

  desc: {
    marginTop: width * 0.025,
    fontSize: width * 0.035,
    fontFamily: 'Sen-Regular',
    textAlign: 'center',
    paddingHorizontal: width * 0.05,
  },

  addBtn: {
    marginTop: width * 0.02,
    padding: width * 0.02,
    backgroundColor: '#eee',
    borderRadius: 8,
  },

  addText: {
    fontSize: width * 0.035,
    fontFamily: 'Sen-Regular',
    color: '#333',
  },

  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: width * 0.025,
    padding: width * 0.02,
    borderRadius: 8,
    fontFamily: 'Sen-Regular',
  },

  saveBtn: {
    marginTop: width * 0.025,
    backgroundColor: '#000',
    padding: width * 0.025,
    borderRadius: 8,
    paddingHorizontal:width*0.005,
    alignItems:'center',
    justifyContent:'center'
  },

  saveText: {
    color: '#fff',
    fontFamily: 'Sen-Regular',
    
  },

  logoutBtn: {
    marginTop: width * 0.04,
    backgroundColor: '#004E89',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.02,
    borderRadius: 8,
  },

  logoutText: {
    color: '#fff',
    fontFamily: 'Sen-Bold',
  },

  grid: {
    marginTop:40,
    padding: width * 0.005,
  },

  gridImage: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    margin: 1,
  },
});
