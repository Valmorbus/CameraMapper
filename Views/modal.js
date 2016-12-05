import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { styles } from '../styles/index';
import Modal from 'react-native-simple-modal';

export default class ImageModal extends Component {

  constructor(props) {
    super(props);
  }

  sendCallback() {
    this.props.setModalInvisible();
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        animationType={'slide'}
        overlayBackground={'rgba(0, 0, 0, 0.75)'}
        closeOnTouchOutside={true}
        open={this.props.modalVisible}
        modalDidClose={()=>this.sendCallback()}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
         <Image
          source={{uri: this.props.modalImage, isStatic:true}}
          style={{width: this.props.imageWidth, height: this.props.imageHeight}}
          resizeMode={'cover'}
           />
          <TouchableHighlight onPress={()=>{}}>
            <Text> Press me FB</Text>
          </TouchableHighlight>
       </Modal>
    );
  }
}
