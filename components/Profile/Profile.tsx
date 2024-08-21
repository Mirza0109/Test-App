import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Modal, Pressable, Dimensions, Alert } from 'react-native';
import styles from './styles'; // Import the styles
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBearStore } from '../zustandStores/Accounts'
import ChangeProfilePicture from '../Service/imageService'
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import Icon from 'react-native-vector-icons/AntDesign';

const Profile = ({navigation}) => {
    const insests = useSafeAreaInsets();
    const logout = useBearStore((state) => state.logout)
    const delacc = useBearStore((state) => state.deleteAccount)
    const setpfp = useBearStore((state) => state.setProfilePicture)
    const imageUri = useBearStore((state) => state.currentUser.profilePicture)
    const [modalVisible, setModalVisible] = useState(false);
    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
    const [cameraVisible, setCameraVisible] = useState(false);
    const cameraRef = useRef(null); 

    const handleCameraPress = async () => {
        setModalVisible(false)
        if (!cameraPermission?.granted) {
            const { status } = await requestCameraPermission();
            if (status !== 'granted') {
                alert('Camera permissions are required to take a picture.');
                return;
            }
        }
        setCameraVisible(true);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setpfp(photo.uri)
            console.log(photo.uri)
            setCameraVisible(false);
        }
    };

    const saveImage = async (uri) => {
        const fileUri = FileSystem.documentDirectory + 'profilePicture.jpg'; // Path where image will be saved
        try {
          await FileSystem.moveAsync({
            from: uri,
            to: fileUri,
          });
          Alert.alert('Success', 'Image saved to ' + fileUri);
        } catch (error) {
          console.error('Error saving image:', error);
        }
      };

    const handleGalleryPress = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setpfp(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
        setModalVisible(false);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

  return (
    <View style={[styles.profile, {paddingTop: insests.top}]}>
        <View style={{alignItems: 'center'}}>
            <Image style={styles.profilePicture} source={{uri: imageUri}} />
            <View>
            <Button title='Change profile picture' onPress={toggleModal} />
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Pressable style={styles.imageOption} onPress={handleGalleryPress}>
                            <Icon name='picture' size={60} style={{ alignSelf: 'center' }} color='#df2222' />
                            <Text style={{ textAlign: 'center', color: '#df2222' }}>Choose from{'\n'}gallery</Text>
                        </Pressable>
                        <Pressable style={styles.imageOption} onPress={handleCameraPress}>
                            <Icon name='camerao' size={60} style={{ alignSelf: 'center' }} color='#df2222' />
                            <Text style={{ textAlign: 'center', color: '#df2222' }}>Take image</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={{ position: 'absolute', top: 3, right: 3 }}>
                            <Text style={{ color: '#df2222', fontSize: 20, fontWeight: 'bold' }}>X</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {cameraVisible && (
               <View style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                justifyContent: 'center', alignItems: 'center', position: 'absolute', 
                zIndex: 20, alignSelf: 'center', opacity: 1, top: -400
               }}> 
                <Camera.CameraView
                    style={styles.camView}
                    ref={cameraRef}
                    facing={'front'}
                    
                >
                <Pressable style={styles.camButton} onPress={takePicture}>
                    
                </Pressable>
                </Camera.CameraView>
                </View>
            )}
        </View>
        </View>   
        <View style={{alignItems: 'center'}}>
            <Button title={'Log out'} onPress={() => {
                logout()
                navigation.navigate('Login')
                }} />
            <Button title={'Delete account'} onPress={() => {
                delacc()
                navigation.navigate('Login')
                }} />
        </View>
    </View>
  );
};

export default Profile;