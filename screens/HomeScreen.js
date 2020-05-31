import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { newSession, joinSession } from '../redux/actions';

import styles from './styles';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Tic Tac Toe</Text>

      <TouchableOpacity onPress={() => props.newSession()} style={[styles.button, styles.buttonGreen]}>
        <Text style={styles.buttonText}>Start a new game session</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.joinSession()} style={[styles.button, styles.buttonBlue]}>
        <Text style={styles.buttonText}>Join a session</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { newSession, joinSession };
module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
