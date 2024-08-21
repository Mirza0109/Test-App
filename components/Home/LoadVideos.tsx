import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadVideos = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const metadataKeys = keys.filter(key => key.startsWith('metadata_'));

    const metadataArray = await Promise.all(
      metadataKeys.map(async key => {
        const metadataJson = await AsyncStorage.getItem(key);
        if (metadataJson) return JSON.parse(metadataJson);
      })
    );

    return metadataArray.filter(item => item !== undefined); // Remove any undefined items
  } catch (error) {
    console.error('Failed to load videos:', error);
    return [];
  }
};

export const VideoList = async() => {
      const videoMetadata = await loadVideos();
      return (videoMetadata);
};
