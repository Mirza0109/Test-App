import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles'; // Import the styles

interface ThumbnailCardProps{
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  author: string;
  videoUrl: string;
  description: string;
  subscriber: string;
  navigation?:any;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ title, thumbnailUrl, duration, uploadTime, views,
   author, videoUrl, description, subscriber, navigation}) => {

  return (
    
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Playing',{title, thumbnailUrl, duration, uploadTime, views,
      author, videoUrl, description, subscriber, navigation})}>
        <Image
        source={{ uri: thumbnailUrl}}
        style={styles.thumbnail}
        />  
        <View style={styles.durationBackground}><Text style={styles.duration}>{duration}</Text></View>  
      <View style={styles.titleBox}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.detailsBox}>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.views}>{views} views</Text>
      </View>
      </View>
      
    </TouchableOpacity>
  );
};

export default ThumbnailCard;
