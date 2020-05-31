import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest } from '../redux/actions';
import { SESSION_CREATED } from '../redux/actionTypes';

import Game from '../components/Game';
import styles from './styles';

const PlayerScreen = props => {
  useEffect(() => {
    const url = `${props.aws_api.url}/session`
    const options = { method: 'POST', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key }, body: JSON.stringify({ player_x: { name: 'Player X' } }) };
    const type = SESSION_CREATED;
    props.makeRequest(url, options, type);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>PlayerScreen</Text>
      {props.sessionId && <Text style={styles.instructions}>Session id: {props.sessionId.slice(-5)}</Text>}

      <Game />

      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.buttonRed]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest };
module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
