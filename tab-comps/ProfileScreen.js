import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../navigation/TopBar'

export function ProfileScreen() {
  return (
    <View style={{flex: 1}}>
      <TopBar pageName='Profile' />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile!</Text>
      </View>
    </View>
  );
}
