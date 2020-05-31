import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { newSession, joinSession, makeRequest, setPlayer } from '../redux/actions';
import { SET_PLAYER } from '../redux/actionTypes';

import styles from './styles';

const HomeScreen = props => {

  useEffect(() => {
    if (props.player) { return; }
    const url = `${props.aws_api.url}/player`;
    const options = { method: 'POST', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key }, body: JSON.stringify({ name: 'Player' }) };
    const type = SET_PLAYER;
    props.makeRequest(url, options, type);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Tic Tac Toe</Text>
      {props.player && <Text style={styles.instructions}>Player id: {props.player.Id.slice(-5)}</Text>}

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
const mapDispatchToProps = { newSession, joinSession, makeRequest, setPlayer };
module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
