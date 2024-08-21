import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import Profile from '../components/Profile/Profile';
import Settings from '../components/Settings/Settings';
import Home from '../components/Home/Home';
import PlayVideo from '../components/VideoCard/PlayVideo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Authenticate/LoginScreen';
import Register from '../components/Authenticate/RegisterScreen';

export default function NavBar() {
  const Tab = createBottomTabNavigator();

  const TabBar = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#df2222',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'; 
            } else if (route.name === 'Settings') {
              iconName = 'cog'; 
            } else if (route.name === 'Profile') {
              iconName = 'user'; 
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#aaaaaa',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

  const MainStack = () => {
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="YouTube" component={TabBar} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Playing" component={PlayVideo} />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
