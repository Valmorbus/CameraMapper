
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
import Gallery from './Views/gallery';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import BottomTabBar from './Bars/BottomTabBar';

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
    };
  }

  componentWillMount() {
    this.getGeoLocation();
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
          prerenderingSiblingsNumber={2}
          contentProps ={{removeClippedSubviews: true}}
          renderTabBar={() => <BottomTabBar />}>
          <CameraView
            tabLabel="camera"
            region={ this.state.region }

            />
          <Mapper tabLabel="map"
          region={ this.state.region }
          />
        <Gallery tabLabel="collections"/>
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
    {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position.coords);
    });
  }

}


AppRegistry.registerComponent('CameraMapper', () => CameraMapper);
