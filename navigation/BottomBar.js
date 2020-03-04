import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { HomeScreen } from "../tab-comps/HomeScreen";
import { AppointmentScreen } from "../tab-comps/AppointmentScreen";
import ProfileNavigator from "../tab-comps/ProfileScreen.js";
import { LogScreen } from "../tab-comps/LogScreen";
import ReminderScreen from "../tab-comps/ReminderScreen";



export default function BottomBar() {

  const Tab = createBottomTabNavigator(
  );

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'ios-home';
              } else if (route.name === 'Log') {
                iconName = 'ios-calendar';
              }
              else if (route.name === 'Profile') {
                iconName = 'md-person';
              }
              else if (route.name === 'Appointments') {
                iconName = 'md-clipboard';
              }
              else if (route.name === 'Reminders') {
                  iconName = 'md-clock';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#005bc7',
            inactiveTintColor: 'black',
            inactiveBackgroundColor: '#CCCCCC',
            activeBackgroundColor: '#CCCCCC',
          }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Appointments" component={AppointmentScreen} />
        <Tab.Screen name="Reminders" component={ReminderScreen} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
  );
}
