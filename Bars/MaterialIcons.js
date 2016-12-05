/**
 * MaterialIcons icon set component.
 * Usage: <MaterialIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';

let MaterialIconSet = createIconSet(glyphMap, '<Material Icons', 'MaterialIcons.ttf');


module.exports = MaterialIconSet;
module.exports.glyphMap = glyphMap;
