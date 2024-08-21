import * as FileSystem from 'expo-file-system'
import React from 'react'
import { Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface DownloadVideoProps{
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

const DownloadVideo: React.FC<DownloadVideoProps> = ({ title, thumbnailUrl, duration, uploadTime, 
    views, author, videoUrl, description, subscriber }) => {
    const download = async () => {

      const vidFilename = `${title}.mp4`;
        const thumbFilename = `${title}.jpg`;
      try {
  
        const vidFileUri = FileSystem.documentDirectory + vidFilename;
        const thumbFileUri = FileSystem.documentDirectory + thumbFilename;

        const vid = await FileSystem.downloadAsync(videoUrl, vidFileUri);
        const thumb = await FileSystem.downloadAsync(thumbnailUrl, thumbFileUri);
        console.log(vidFileUri)
        if (vid.status === 200) {
          console.log('Download successful:', vid);
          // Optionally, you can show a success message or perform other actions
        } else {
          console.error('Download failed:', vid);
        }
      } catch (error) {
        console.error('An error occurred while downloading the file:', error);
      }
      
      const metaKey = `metadata_${title}`
      await AsyncStorage.setItem(metaKey, JSON.stringify({
        title: title,
        duration: duration,
        uploadTime: uploadTime,
        views: views,
        author: author,
        description: description,
        subscriber: subscriber,
        thumbnailUrl: thumbFilename,
        videoUrl: vidFilename
      }))

    };
  
    return (
        <Button title="Download Video" onPress={download} /> 
    );
  };
  
  export default DownloadVideo;
  