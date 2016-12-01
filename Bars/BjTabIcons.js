/**
 * BjTabIcons icon set component.
 * Usage: <BjTabIcons name="icon-name" size={20} color="#4F8EF7" />
 */
 import {
   Platform,
 } from 'react-native';
 import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
 const glyphMap = {
   'event': 'a',
   'photos': 'b',
   'vip': 'c'

 };
 let BjTabIcons = (Platform.OS === 'android') ? createIconSet(glyphMap, 'BjTabIcons', 'BjTabIcons.ttf')
: createIconSet(glyphMap, 'untitled-font-1', 'BjTabIcons.ttf');

 module.exports = BjTabIcons;
 module.exports.glyphMap = glyphMap;
