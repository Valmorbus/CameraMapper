import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';

export default class Gallery extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']
      ),
      data:{},
    };
  }

  componentWillMount() {
    this.getImageLocation();
    this.renderGallery();
  }

  renderGallery() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this.state.data
      )});
  }

  getImageLocation() {
    AsyncStorage.getItem('imageData')
      .then((response) => {
        let items = JSON.parse(response);
        if (items !== null) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
              items
            )});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sortListViewObject(data){
    return Object.keys(data).sort().reverse();
  }


  render(){
    return (
      <View style={{flex: 1}}>
        <ListView
        backgroundColor={'black'}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => //{{console.log(rowData.image.path); return null;}}
         <View style={{flex: 3}}>
           <TouchableOpacity  onPress={()=>{}}>
              <Image source={{uri: rowData.image.path, isStatic:true}}
              style={{width: this.width, height: 270, resizeMode: 'cover'}}/>
            </TouchableOpacity>
          </View>
        }/>
      </View>
    );
  }
}
