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

var ScrollableTabView = require('react-native-scrollable-tab-view');
var BottomTabBar = require('./Bars/BottomTabBar');

export default class CameraMapper extends Component {
  render() {
    return (
      <ScrollableTabView >
        <CameraView tabLabel="Camera"/>
        <Mapper tabLabel="Maps"/>
      </ScrollableTabView>
    );

  }

}


AppRegistry.registerComponent('CameraMapper', () => CameraMapper);
