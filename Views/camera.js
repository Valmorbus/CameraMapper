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
      height: Dimensions.get('window').height,
      type: Camera.constants.Type.back,
      flashMode: Camera.constants.FlashMode.auto,
      flashIcon: 'flash-auto',
      typeIcon: 'camera-front',
    };

    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  }

  componentWillMount() {
    this.getImageLocation();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({region: nextProps.region});
    this.setState({width: nextProps.width, height: nextProps.height});
  }

  render() {
    return (
        <View style={ styles.container }>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={[ styles.preview, {width: this.state.width, height: this.state.height}] }
          aspect={ Camera.constants.Aspect.fill }
          FlashMode={ this.state.flashMode }
          type={this.state.type}
          >
            <Icon
              style={styles.flashButton}
              name={this.state.flashIcon}
              size={40}
              color="white"
              onPress={this.switchFlash.bind(this)} />
            <Icon
              style={styles.typeButton}
              name={this.state.typeIcon}
              size={40}
              color="white"
              onPress={this.switchType.bind(this)} />
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

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.type === back) {
      newType = front;
    } else if (this.state.type === front) {
      newType = back;
    }

    this.setState({ type: newType });
    this.typeIcon();
  }

  typeIcon() {
    const { back, front } = Camera.constants.Type;

    if (this.state.type === back) {
      this.setState({ typeIcon: 'camera-front' });
    } else if (this.state.type === front) {
      this.setState({ typeIcon: 'camera-rear' });
    }

  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;
    if (this.state.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({ flashMode: newFlashMode });
    this.getflashIcon();
  }

  getflashIcon() {
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.flashMode === auto) {
      this.setState({ flashIcon: 'flash-auto' });
    } else if (this.state.flashMode === on) {
      this.setState({ flashIcon: 'flash-on' });
    } else if (this.state.flashMode === off) {
      this.setState({ flashIcon: 'flash-off' });
    }
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
