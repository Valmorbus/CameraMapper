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
  Image,
} from 'react-native';
import { styles } from '../styles/index';
import MapView from 'react-native-maps';
import ImageModal from './modal';

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
      modalVisible: false,
      modalImage: '',
      imageWidth: 50,
      imageHeight: 50,
    };
  }
  componentWillMount() {
    this.getImageLocation();
  }

  componentDidMount() {
    this.interval = setInterval(() =>{
      this.getImageLocation();
    }, 60000);
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

  showImageModal(image, width, height) {
    this.setState({
      modalImage: image,
      modalVisible: true,
      imageWidth: width,
      imageHeight: height
    });
  }

  renderMarkers() {
    let markerArray = [];
    let imageArray = this.state.imageArray;
    for (let i in imageArray) {
      markerArray.push(
        <MapView.Marker
          key={i}
          image={{ImageSource: imageArray[i].image.path}}
          coordinate={{latitude: imageArray[i].latitude, longitude: imageArray[i].longitude}}
          onPress={ () => this.showImageModal(imageArray[i].image.path, imageArray[i].width, imageArray[i].height )}
          >
            <Image
              source={{uri: imageArray[i].image.path, isStatic:true}}
              style={{width: imageArray[i].width/10, height: imageArray[i].height/10, borderColor: 'white', borderWidth: 4, borderRadius: 2}}/>
          <MapView.Callout tooltip={true} />
      </MapView.Marker>
      );
    }
    return markerArray;
  }

  setModalInvisible() {
    this.setState({modalVisible: false});
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
         showsCompass={true}
       >
       { this.renderMarkers() }

       </MapView>
       <ImageModal
         modalVisible={this.state.modalVisible}
         modalImage={this.state.modalImage}
         imageWidth={this.state.imageWidth/2}
         imageHeight={this.state.imageHeight/2}
         setModalInvisible={this.setModalInvisible.bind(this)}
        />
      </View>
    );
  }

}
