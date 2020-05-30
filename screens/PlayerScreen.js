import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { init, makeRequest } from '../redux/actions';
import { SESSION_CREATED } from '../redux/actionTypes';

import Game from '../components/Game';
import styles from './styles';

const { publishKey, subscribeKey, url } = Constants.manifest.extra;

const PlayerScreen = props => {
  useEffect(() => {
    props.makeRequest(`${url}/session`, { method: 'POST', headers: { Accept: 'application/json', 'x-api-key': '4S3MSeu8Ci4egLA5aPwoB6hZyVKCUBY55df6PC4n' }, body: JSON.stringify({ player_x: { name: 'Player X' } }) }, SESSION_CREATED);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>PlayerScreen</Text>

      <Game sessionId={props.sessionId} />

      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.button3]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest };
module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
