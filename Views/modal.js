import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { styles } from '../styles/index';
import Modal from 'react-native-simple-modal';
import FBSDK from 'react-native-fbsdk';

export default class ImageModal extends Component {

  constructor(props) {
    super(props);
  }

  sendCallback() {
    this.props.setModalInvisible();
  }

  shareImageOnFacebook() {
    const sharePhotoContent = {
      contentType: 'photo',
      photos: [{
        imageUrl: this.props.modalImage,
        userGenerated: true,
        caption: 'test',
      }]
    };
    FBSDK.ShareDialog.canShow(sharePhotoContent)
    .then(
      function(canShow) {
        if (canShow) {
          return FBSDK.ShareDialog.show(sharePhotoContent);
        }
      })
    .then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: ' + result.postId);
        }
      },
    function(error) {
      alert('Share fail with error: ' + error);
    });
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
          <TouchableHighlight onPress={()=>this.shareImageOnFacebook()}>
            <Text> Press me FB</Text>
          </TouchableHighlight>
       </Modal>
    );
  }
}
