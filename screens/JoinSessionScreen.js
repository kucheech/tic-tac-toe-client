import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest } from '../redux/actions';
import { AWAIT_SESSIONS_FETCHED } from '../redux/actionTypes';
import { AWAIT_JOIN } from '../constants';
import Constants from 'expo-constants';

import styles from './styles';

const { publishKey, subscribeKey, url } = Constants.manifest.extra;

const JoinSessionScreen = props => {

  useEffect(() => {
    const options = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': '4S3MSeu8Ci4egLA5aPwoB6hZyVKCUBY55df6PC4n' } };
    props.makeRequest(`${url}/sessions?type=${AWAIT_JOIN}`, options, AWAIT_SESSIONS_FETCHED);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Join Session</Text>

      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.button3]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest };
module.exports = connect(mapStateToProps, mapDispatchToProps)(JoinSessionScreen);
