/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import { styles } from './styles/index';
import CameraView from './Views/camera';
import Mapper from './Views/map';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import BottomTabBar from './Bars/BottomTabBar';

export default class CameraMapper extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
         backgroundColor='black'
         barStyle="light-content"
        />
        <ScrollableTabView
          tabBarBackgroundColor='black'
          tabBarPosition='bottom'
          prerenderingSiblingsNumber={3}
          renderTabBar={() => <BottomTabBar />}>
          <CameraView tabLabel="camera"/>
          <Mapper tabLabel="map"/>
        </ScrollableTabView>
    </View>
    );

  }

}


AppRegistry.registerComponent('CameraMapper', () => CameraMapper);
