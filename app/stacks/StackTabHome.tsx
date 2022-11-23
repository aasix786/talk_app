import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomsScreen from '../Screens/Rooms';
import SettingsScreen from '../Screens/Settings';
import ProfileScreen from '../Screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { mapColors } from '../themes/mapColors';
import { View } from 'react-native';
import CallsScreen from '../Screens/Calls';
import SearchScreen from '../Screens/Search';

const Tab = createBottomTabNavigator();

export default function StackTabHome() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{
          tabBarIcon: () => {
            return (
              <Ionicons name={'md-chatbubbles-sharp'} size={24} color={mapColors.primary} />
            );
          }
        }} component={RoomsScreen} />
        <Tab.Screen name="Calls" options={{
          tabBarIcon: () => {
            return (
              <MaterialIcons name={'call'} size={24} color={mapColors.primary} />
            );
          }
        }} component={CallsScreen} />
        <Tab.Screen name="Search" options={{
          tabBarIcon: () => {
            return (
              <Ionicons name={'search'} size={24} color={mapColors.primary} />
            );
          }
        }} component={SearchScreen} />
        <Tab.Screen name="Profile" options={{
          tabBarIcon: () => {
            return (
              <FontAwesome5 name={'user-alt'} size={24} color={mapColors.primary} />
            );
          }
        }} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
