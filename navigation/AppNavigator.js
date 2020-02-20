import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LockScreen from '../screens/LockScreen';
import BottomBar from './BottomBar';

export default createAppContainer(
  createSwitchNavigator(
    {
      Lock: LockScreen,
      Main: BottomBar,
    },
    {
      initialRouteName: 'Lock',
    }
  )
);