import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest, addMove } from '../redux/actions';
import { SESSION_CREATED } from '../redux/actionTypes';
import { DISPLAY_ID } from '../constants';

import Game from '../components/Game';
import styles from './styles';

const PlayerScreen = props => {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (props.sessionId) { return; }
    const url = `${props.aws_api.url}/session`
    const options = { method: 'POST', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key }, body: JSON.stringify({ player_x: { name: 'Player X' } }) };
    const type = SESSION_CREATED;
    props.makeRequest(url, options, type);
  }, []);

  if (props.sessionId && !channel) {
    setChannel(props.sessionId);
  }

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!channel || !props.pubnub) { return; }
    props.pubnub.addListener({
      message: messageEvent => {
        const { status, squares, playerTurn } = messageEvent.message;
        if (squares) {
          props.addMove({ squares, playerTurn });
        }

        setMessages([...messages, status]);
      },
    });

    props.pubnub.subscribe({
      channels: [channel],
      withPresence: true
    });

    return function cleanup() {
      props.pubnub.unsubscribe({
        channels: [channel],
      });
    };
  }, [channel]);

  const sendMessage = (message, channel) => {
    props.pubnub.publish({
      channel,
      message,
    });
  };

  const updateStatus = message => {
    sendMessage(message, props.sessionId);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>PlayerScreen</Text>
      {props.sessionId && <Text style={styles.instructions}>Session id: {DISPLAY_ID(props.sessionId)}</Text>}

      <Game updateStatus={updateStatus} />

      {messages.length > 0 && <Text style={styles.welcome}>{messages.slice(-1)[0]}</Text>}
      <TouchableOpacity onPress={() => props.init()} style={[styles.button, styles.buttonRed]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest, addMove };
module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
