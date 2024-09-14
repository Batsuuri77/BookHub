import React, { useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Button, 
  Alert 
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import styles from './styles/bookHubStyles'; // Assume styles are defined in a separate file
import { CustomButton } from '@/components';
import icons from '@/constants/icons';
import { createPost, uploadFile } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SendPost = () => {

  const context = useGlobalContext();
  const { user, setUser } = useGlobalContext();
  
  const [profilePicture, setProfilePicture] = useState<URL | null>(null);
  const [content, setContent] = useState<string>('');


  const handleChangeProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need media permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
     

      try {
        // Convert URI to a file object
        const file = {
          uri: uri,
          type: 'image/jpeg', 
          name: uri.split('/').pop(), 
          size: 5
        };

        console.log(file)
        // Call the uploadFile function
        const fileUrl = await uploadFile(file, 'image');
 
        if (fileUrl) {
          setProfilePicture(fileUrl);
        } else {
          Alert.alert('Upload failed', 'The image could not be uploaded. Please try again.');
        }
      } catch (error) {
        Alert.alert('Upload failed', 'Unable to upload image. Please try again.');
        console.error('Upload error:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!user) {
        console.error("No user context available.");
        return;
      }
      const updatedUser = await createPost(
        content,
        user.$id,  
        profilePicture,
        user.firstName,
        user.avatar
      );
      Alert.alert("Success", "Post created successfully");
    } catch (error) {
      console.error("Error saving post :", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
        <View>
            <View style={{
              backgroundColor: '#e0e0e0',
              width: 320,  
              height: 220,  
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              marginTop:10
            }}>
              {profilePicture ? (
                <>
                  <TouchableOpacity
                    onPress={handleChangeProfilePicture}
                    style={{ width: '100%', height: '100%', overflow: 'hidden' }}
                  >
                    <Image
                      source={{ uri: profilePicture.href }}
                      style={{ width: '100%', height: '100%', borderRadius: 15, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setProfilePicture(null)}
                    style={{ position: 'absolute', top: 10, right: 10 }}
                  >
                    <Image source={icons.x} style={{ width: 16, height: 16 }} />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={handleChangeProfilePicture}>
                  <Image source={icons.plus} style={{ width: 32, height: 32, padding: 8 }} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Post Content Section */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Post Content</Text>
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={setContent}
              multiline
              placeholder="Write something..."
            />
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-2 right-10 left-10 transform -translate-x-1/3 bg-transparent">
          <CustomButton
            title={"Post"}
            handlePress={handleSave}
            containerStyles="w-90 h-10 rounded-full px-4 py-2 bg-primary"
            textStyles="text-base"
            isLoading={undefined}
          ></CustomButton>
        </View>
    </SafeAreaView>
  );
};

export default SendPost;
