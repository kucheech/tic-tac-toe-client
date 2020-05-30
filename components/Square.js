import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Square = props =>
  (
    <TouchableOpacity onPress={props.onClick} style={[styles.button, styles.square]}>
      <Text style={styles.squareText}>{props.value}</Text>
    </TouchableOpacity>
  );

module.exports = Square;
