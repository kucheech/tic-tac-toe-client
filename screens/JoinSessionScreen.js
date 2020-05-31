import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest, gotoSession } from '../redux/actions';
import { AWAIT_SESSIONS_FETCHED, GOTO_SESSION } from '../redux/actionTypes';
import { AWAIT_JOIN, DISPLAY_ID } from '../constants';

import styles from './styles';

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const JoinSessionScreen = props => {
  useEffect(() => {
    const url = `${props.aws_api.url}/sessions?type=${AWAIT_JOIN}`;
    const options = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key } };
    const type = AWAIT_SESSIONS_FETCHED;
    props.makeRequest(url, options, type);
  }, []);

  const renderSessions = n => {
    const sessions = shuffle(props.availableSessionsToJoin).slice(0, n);
    return sessions.length ?
      sessions.map(s => (
        <TouchableOpacity key={s.Id} onPress={() => props.gotoSession(s.Id)} style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonText}>{DISPLAY_ID(s.Id)}</Text>
        </TouchableOpacity>
      ))
      :
      <Text style={styles.welcome}>No sessions currently available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Join Session</Text>

      {renderSessions(5)}

      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.buttonRed]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest, gotoSession };
module.exports = connect(mapStateToProps, mapDispatchToProps)(JoinSessionScreen);
