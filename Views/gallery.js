import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Modal from 'react-native-simple-modal';
import { styles } from '../styles/index';

export default class Gallery extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']
      ),
      data:{},
      modalVisible: false,
      modalImage: '',
    };
  }

  componentWillMount() {
    this.getImageLocation();
    this.renderGallery();
  }

  renderGallery() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    });
  }

  getImageLocation() {
    AsyncStorage.getItem('imageData')
      .then((response) => {
        let items = JSON.parse(response);
        if (items !== null) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
          });
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

  renderModal() {
    return (
      <Modal
        style={styles.modal}
        animationType={'slide'}
        overlayBackground={'rgba(0, 0, 0, 0.75)'}
        closeOnTouchOutside={true}
        open={this.state.modalVisible}
        modalDidClose={() => {this.setState({modalVisible: false});}}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
         <Image
          source={{uri: this.state.modalImage, isStatic:true}}
          style={{width: this.state.imageWidth/1.5, height: this.state.imageHeight/1.5}}
          resizeMode={'cover'}
           />
          <TouchableOpacity onPress={()=>{}}>
            <Text> Press me FB</Text>
          </TouchableOpacity>
       </Modal>
    );
  }


  render(){
    return (
      <View style={{flex: 1, flexDirection: 'row',}}>
        <ListView
        backgroundColor={'black'}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => //{{console.log(rowData.image.path); return null;}}
         <View style={{flex: 3, alignItems: 'center', margin: 15,}}>
           <TouchableOpacity  onPress={() =>
               this.showImageModal(rowData.image.path, rowData.width, rowData.height)
             }>
              <Image source={{uri: rowData.image.path, isStatic:true}}
              style={{
                width: rowData.width/2,
                height: rowData.height/2,
                borderWidth: 10,
                borderColor: 'white',
                borderRadius: 10
              }}/>
            </TouchableOpacity>
          </View>
        }/>
      { this.renderModal() }
      </View>
    );
  }
}
