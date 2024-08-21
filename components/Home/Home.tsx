import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Switch } from 'react-native';
import styles from './styles'; // Import the styles
import ThumbnailCard from '../VideoCard/ThumbnailCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useIsConnected from '../VideoCard/isConnected';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useFocusEffect } from '@react-navigation/native';
import {VideoList} from './LoadVideos'
import * as FileSystem from 'expo-file-system'

const Home = ({ navigation }) => {

  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();
  const status = useIsConnected()
  const [state, setState] = useState(true)



  useFocusEffect(
    React.useCallback(() => {
      // Lock orientation to portrait up when the screen is focused
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };

      lockOrientation();

      // Cleanup function to unlock the orientation when the screen loses focus
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

 // console.log('these are loaded: ', VideoList())

  const fetchVideos = async () => {
    fetch('https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json')
      .then((res) => res.json()).then((data) => { setData(data); });
  }



  useEffect(() => {
    if (state) {

      fetchVideos();
      console.log('fetched: ', data);
    } else {
   
      (async () => {
        try {
          console.log('Entering the async block');
          const dataVideoList = await VideoList(); // Make sure this is returning a promise
          console.log('dataVideoList:', dataVideoList); // Log the result of VideoList
          setData(dataVideoList);
        } catch (error) {
          console.error('Error fetching video list:', error);
        }
      })();

      console.log('loaded: ', data)
    }
  }, [state]);

  const handleToggle = () => {
    status ? handleChange() : alert('No internet connection!')
  }

  const handleChange = () => {
    setState(!state)
  }

  console.log('these are fetched: ', data)
  data.forEach((item) => console.log(item.thumbnailUrl))
  return (
    <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, styles.container]}>
      <View style={styles.header}>
        <Text style={{marginRight: 10}}>Online status</Text>
        <Switch
          value={state}
          onValueChange={handleToggle}
          trackColor={{true: '#df2222', false: 'grey'}}
        />
      </View>
      <FlatList
        
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>

          <ThumbnailCard
            title={item.title} 
            thumbnailUrl={state ? item.thumbnailUrl : 
            `${FileSystem.documentDirectory}${item.thumbnailUrl}`} duration={item.duration}
            uploadTime={item.uploadTime} views={item.views} author={item.author} 
            videoUrl={state ? item.videoUrl : 
            `${FileSystem.documentDirectory}${item.videoUrl}`
            }
            description={item.description} subscriber={item.subscriber} navigation={navigation}
          />

        }
      />
    </View>
  );
};

export default Home;