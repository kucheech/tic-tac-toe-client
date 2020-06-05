import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest, gotoSession, setLoading } from '../redux/actions';
import { AWAIT_SESSIONS_FETCHED } from '../redux/actionTypes';
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
  const [x, setX] = useState(0); // used for refresh page

  useEffect(() => {
    props.setLoading(true);
    const url = `${props.aws_api.url}/sessions?type=${AWAIT_JOIN}`;
    const options = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key } };
    const type = AWAIT_SESSIONS_FETCHED;
    props.makeRequest(url, options, type);
  }, [x]);

  const joinSession = async id => {
    const url = `${props.aws_api.url}/session/availability?id=${id}`;
    const options = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key } };
    const isSessionStillAvailable = await fetch(url, options).then(response => response.json());
    if (isSessionStillAvailable) {
      props.gotoSession(id);
    } else {
      Alert.alert('Oops...', 'Someone else had already joined this session', [{ text: 'refresh page', onPress: () => setX(x + 1) }], { cancelable: false });
    }
  }

  const renderSessions = n => {
    const sessions = shuffle(props.availableSessionsToJoin).slice(0, n);
    return sessions.length ?
      sessions.map(s => (
        <TouchableOpacity key={s.Id} onPress={() => joinSession(s.Id)} style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonText}>{DISPLAY_ID(s.Id)}</Text>
        </TouchableOpacity>
      ))
      :
      <Text style={styles.welcome}>No sessions currently available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Join Session</Text>

      {props.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : renderSessions(5)}

      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.buttonRed]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest, gotoSession, setLoading };
module.exports = connect(mapStateToProps, mapDispatchToProps)(JoinSessionScreen);
