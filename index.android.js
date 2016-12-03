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
  Dimensions,
} from 'react-native';
import { styles } from './styles/index';
import CameraView from './Views/camera';
import Mapper from './Views/map';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import BottomTabBar from './Bars/BottomTabBar';
import Orientation from 'react-native-orientation';

export default class CameraMapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 59.334591,
        longitude: 18.063240,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    };

  }

  componentWillMount() {
    this.getGeoLocation();
  }
  componentDidMount() {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this._orientationDidChange.bind(this));
  }

  _orientationDidChange(orientation) {
    if (orientation === 'LANDSCAPE') {
      this.setState({
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width
      });

    } else {
      this.setState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      });
    }

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

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
          <CameraView
            tabLabel="camera"
            region={ this.state.region }
            width={ this.state.width }
            height={ this.state.height }
            />
          <Mapper tabLabel="map"
          region={ this.state.region }
          width={ this.state.width }
          height={ this.state.height }
          />
        </ScrollableTabView>
    </View>
    );

  }

  getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({region:{
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }});
      },
      (error) => console.log(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position.coords);
    });
  }

}


AppRegistry.registerComponent('CameraMapper', () => CameraMapper);
