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
} from 'react-native';
import { styles } from './styles/index';
import CameraView from './Views/camera';
import Mapper from './Views/map';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import BottomTabBar from './Bars/BottomTabBar';

export default class CameraMapper extends Component {
  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor='black'
          tabBarPosition='bottom'
          prerenderingSiblingsNumber={3}
         renderTabBar={() => <BottomTabBar />}>
        <CameraView tabLabel="camera" tab='vip'/>
        <Mapper tabLabel="map" tab='photos'/>
      </ScrollableTabView>
    );

  }

}


AppRegistry.registerComponent('CameraMapper', () => CameraMapper);
