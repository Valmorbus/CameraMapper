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
  Dimensions,
} from 'react-native';
import { styles } from '../styles/index';
import Camera from 'react-native-camera';
import Icon from '../Bars/MaterialIcons';
import Orientation from 'react-native-orientation';

export default class CameraView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageArray: [],
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    };
    console.log(this.state.width);
  }

  componentWillMount() {
    this.getImageLocation();
    Orientation.getOrientation((err,orientation)=> {
      console.log('log',orientation);


    });


  }

  componentDidMount() {
    console.log('mount');
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this._orientationDidChange.bind(this));
  }

  _orientationDidChange(orientation) {
    console.log(orientation);
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

  componentWillReceiveProps(nextProps) {
    this.setState({region: nextProps.region});
  }

  render() {
    return (
        <View style={ styles.container }>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={ styles.preview }
          aspect={ Camera.constants.Aspect.fill }
          FlashMode={ Camera.constants.FlashMode.auto }
          >

            <Icon
              style={ styles.capture }
              name="panorama-fish-eye"
              size={90}
              color='white'
              onPress={ this.takePicture.bind(this) }/>

        </Camera>

      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) =>{
        this.saveImageLocation(data);

      })
      .catch(err => console.error(err));
  }

  saveImageLocation(image) {
    let arr = this.state.imageArray;

    const imageData = {
      image: image,
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude,
      width: this.state.width,
      height: this.state.height
    };
    arr.push(imageData);
    AsyncStorage.setItem('imageData', JSON.stringify(arr));
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

}
