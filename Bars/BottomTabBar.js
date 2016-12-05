
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import Icon from './MaterialIcons';
import Button from 'react-native-scrollable-tab-view/Button';

const BottomTabBar = React.createClass({
  tabIcons:[],

  propTypes:{
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    overlineColor: React.PropTypes.string,
    overlineHeight: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTabName: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      overlineColor: 'white',
      backgroundColor: null,
      overlineHeight: 4,
    };
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabOverlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.overlineHeight,
      backgroundColor: this.props.overlineColor,
      top: 0,

    };
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
       {this.props.tabs.map((tab, i) => {
         return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color='white'
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />
        </TouchableOpacity>;
       })}
       <Animated.View style={[tabOverlineStyle, { left, }, ]} />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  activeTab:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
});

export default BottomTabBar;
