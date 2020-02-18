import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { HomeScreen } from "./tab-comps/HomeScreen";
import { AppointmentScreen } from "./tab-comps/AppointmentScreen";
import { ProfileScreen } from "./tab-comps/ProfileScreen";
import { LogScreen } from "./tab-comps/LogScreen";

export default function BottomBar() {
  
  const Tab = createBottomTabNavigator(
  );

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            TabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (name === 'Home') {
                iconName = 'ios-home';
              } else if (route.name === 'Log') {
                iconName = 'ios-calendar';
              }
              else if (route.name === 'Profile') {
                iconName='md-person';
              }
              else if(route.name === 'Appointments') {
                iconName='md-clipboard'
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          TabBarOptions={{
            activeTintColor: '#005bc7',
            inactiveTintColor: 'black',
            inactiveBackgroundColor: '#CCCCCC',
            activeBackgroundColor: '#CCCCCC',
          }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Appointments" component={AppointmentScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    color: 'red',
  },
});

