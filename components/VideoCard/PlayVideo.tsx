import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import styles from './styles'; // Import the styles
import { SafeAreaView } from 'react-native';
import { useBearStore } from '../zustandStores/Accounts';
import DownloadVideo from './DownloadVideo';
import isConnected from './isConnected';
import * as FileSystem from 'expo-file-system';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useFocusEffect } from '@react-navigation/native';

interface PlayVideoProps {
    title: string;
    thumbnailUrl: string;
    duration: string;
    uploadTime: string;
    views: string;
    author: string;
    videoUrl: string;
    description: string;
    subscriber: string;
}

interface Props {
    navigation: any;
    route: any;
}

const PlayVideo: React.FC<Props> = ({
    navigation,
    route,
}) => {
    const videoRef = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
    const properties: PlayVideoProps = route?.params;
    const [hasSubscription, setHasSubscription] = useState()
    const addSubscription = useBearStore((state) => state.addSubscription);
    const removeSubscription = useBearStore((state) => state.removeSubscription);

    const handleToggle = () => {
        console.log("THIS IS AUTHOR", properties.author);
        hasSubscription ? removeSubscription(properties.author)
            : addSubscription(properties.author);
    }

    useFocusEffect(
        React.useCallback(() => {
            // Lock orientation to auto on focus
            const lockOrientation = async () => {
                await ScreenOrientation.unlockAsync(); // Allow dynamic orientation changes
            };

            lockOrientation();
            
            // Cleanup function to reset orientation when the screen loses focus
            return () => {
                // Optionally, you can lock orientation to portrait or landscape when the screen loses focus if needed
                ScreenOrientation.unlockAsync();
            };
        }, [])
    );

    useEffect(() => {
        // Function to update local state
        const updateHasSubscription = () => {
          const isSubscribed = useBearStore.getState().hasSubscription(properties.author);
          setHasSubscription(isSubscribed);
        };
    
        // Subscribe to Zustand store changes
        const unsubscribe = useBearStore.subscribe((state) => {
          updateHasSubscription();
        });
        // Initial update
        updateHasSubscription();
    
        // Cleanup subscription on component unmount
        return () => unsubscribe();
      }, [properties.author]);

      

    return (
        <SafeAreaView style={styles.card}>
            <TouchableOpacity
                onPress={() => {
                    (status && 'isPlaying' in status && status.isPlaying) ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync();
                }}>
                <Video
                    ref={videoRef}
                    source={{ uri: (isConnected() ? properties.videoUrl : `${FileSystem.documentDirectory}${properties.title}.mp4`) }}
                    style={styles.video}
                    isLooping
                    onPlaybackStatusUpdate={setStatus}
                    posterSource={{ uri: properties.thumbnailUrl }}
                    usePoster
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                />
            </TouchableOpacity>
            <View style={styles.titleBoxPlaying}>
                <Text style={styles.title}>{properties.title}</Text>
                <View style={styles.detailsBoxPlaying}>
                    <Text style={styles.detailsPlaying}>{properties.author} - {properties.subscriber}{'\n'}</Text>
                    <Text style={styles.detailsPlaying}>{properties.views} views - uploaded on {properties.uploadTime}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Switch value={hasSubscription}
                onValueChange={handleToggle}
                trackColor={{true: '#df2222', false: 'grey'}}
                />
            <Text style={{marginLeft: 15, fontSize: 16}}>Subscribe</Text>
                </View>
            <DownloadVideo title={properties.title} thumbnailUrl={properties.thumbnailUrl} 
                duration={properties.duration} uploadTime={properties.uploadTime} views={properties.views} 
                author={properties.author} videoUrl={properties.videoUrl} description={properties.description}
                subscriber={properties.description} />
        </SafeAreaView>
    );
};

export default PlayVideo;
