
import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './navigation/navigation'
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';

export default function App() {
  
  return (
    <View>
    <View style={{ justifyContent: 'center', alignItems: 'center'}}>

    </View>
    <View style={styles.navContainer}>
      <NavBar />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: '100%',
    justifyContent: 'flex-end'
  },
});
