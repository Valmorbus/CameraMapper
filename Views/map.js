/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { styles } from '../styles/index';
import MapView from 'react-native-maps';


export default class Mapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 59.334591,
        longitude: 18.063240,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      imageArray:[],
    };
  }
  componentWillMount() {
    this.getImageLocation();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({region: nextProps.region});
  }

  getImageLocation(){
    AsyncStorage.getItem('imageData')
      .then((response) => {
        let items = JSON.parse(response);
        if (items !== null) {
          this.setState({imageArray: items});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderMarkers() {
    let markerArray = [];
    let imageArray = this.state.imageArray;
    for (let i in imageArray) {
      console.log(imageArray[i].image.path);
      markerArray.push(
        <MapView.Marker
          key={i}
          image={{ImageSource: imageArray[i].image.path}}
          coordinate={{latitude: imageArray[i].latitude, longitude: imageArray[i].longitude}}
          />
      );
    }
    return markerArray;
  }

  render() {
    return (
      <View style={styles.mapcontainer}>
       <MapView
         style={styles.map}
         ref="mapview"
         region={this.state.region}
         showsUserLocation={true}
         followsUserLocation={true}

       >
       { this.renderMarkers() }
       </MapView>
      </View>
    );
  }

}
