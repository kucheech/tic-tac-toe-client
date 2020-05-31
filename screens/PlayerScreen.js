import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest, addMove, startGame } from '../redux/actions';
import { SESSION_CREATED, SESSION_UPDATED } from '../redux/actionTypes';
import { DISPLAY_ID, PLAYER_O, IN_PROGRESS, COMPLETED, WAITING_FOR_PLAYER_O, PLAYER_O_JOINS, TERMINATED } from '../constants';

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

  const [messages, setMessages] = useState([WAITING_FOR_PLAYER_O]);
  useEffect(() => {
    if (!channel || !props.pubnub) { return; }
    props.pubnub.addListener({
      message: messageEvent => {
        const { status, squares, playerTurn, start_game } = messageEvent.message;
        if (start_game) { props.startGame(); }
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
    if (message.gameOver) {
      updateSession(props.sessionId, COMPLETED);
    }
  }

  const updateSession = (id, status) => {
    const url = `${props.aws_api.url}/session`
    const options = { method: 'PUT', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key }, body: JSON.stringify({ id, status }) };
    const type = SESSION_UPDATED;
    props.makeRequest(url, options, type);
  }

  if (messages.length === 1 && props.player.type === PLAYER_O) {
    updateSession(props.sessionId, IN_PROGRESS);
    sendMessage({ status: PLAYER_O_JOINS, start_game: true }, props.sessionId);
  }

  const exitSession = () => {
    props.pubnub.unsubscribe({
      channels: [channel],
    });
    updateSession(props.sessionId, TERMINATED);
    props.init();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Player {props.player.type}</Text>
      {props.sessionId && <Text style={styles.instructions}>Session id: {DISPLAY_ID(props.sessionId)}</Text>}

      <Game updateStatus={updateStatus} />

      {messages.length > 0 && <Text style={styles.welcome}>{messages.slice(-1)[0]}</Text>}
      <TouchableOpacity
        disabled={props.gameStarted && !props.gameOver} onPress={() => exitSession()}
        style={[styles.button, props.gameOver ? styles.buttonGreen : styles.buttonRed]}>
        <Text style={styles.buttonText}>{props.gameOver ? 'Return' : 'Cancel'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest, addMove, startGame };
module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
