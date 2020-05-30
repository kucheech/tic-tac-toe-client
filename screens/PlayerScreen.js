import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { init } from '../redux/actions';

import styles from './styles';

const PlayerScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>PlayerScreen</Text>

      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.button3]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init };
module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
