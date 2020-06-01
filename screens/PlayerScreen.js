import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { init, makeRequest, addMove, startGame, setLoading } from '../redux/actions';
import { SESSION_CREATED, SESSION_UPDATED } from '../redux/actionTypes';
import { DISPLAY_ID, PLAYER_X, PLAYER_O, IN_PROGRESS, COMPLETED, WAITING_FOR_PLAYER_O, PLAYER_O_JOINS, TERMINATED, RETURN_TO_HOMESCREEN, CANCEL } from '../constants';

import Game from '../components/Game';
import styles from './styles';

const PlayerScreen = props => {
  // X to obtain a session id
  useEffect(() => {
    if (props.player.type === PLAYER_O) { return; }
    props.setLoading(true);
    const url = `${props.aws_api.url}/session`;
    const options = { method: 'POST', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key }, body: JSON.stringify({ player_x: { name: 'Player X' } }) };
    const type = SESSION_CREATED;
    props.makeRequest(url, options, type);
  }, []);

  const [messages, setMessages] = useState([WAITING_FOR_PLAYER_O]);
  // both to subscribe to channel
  useEffect(() => {
    if (!props.pubnub) { return; }
    props.pubnub.addListener({
      message: messageEvent => {
        const { status, squares, playerTurn, start_game } = messageEvent.message;
        if (start_game) { props.startGame(); }
        if (squares) { props.addMove({ squares, playerTurn }); }
        setMessages([...messages, status]);
      },
    });

    props.pubnub.subscribe({ channels: [props.sessionId] });

    return () => { props.pubnub.unsubscribe({ channels: [props.sessionId], }); }; //cleanup
  }, [props.sessionId]);

  const sendMessage = (message, channel) => {
    props.pubnub.publish({ channel, message, });
  };

  const updateStatus = message => {
    sendMessage(message, props.sessionId);
    if (message.gameOver && props.player.type === PLAYER_X) { updateSession(props.sessionId, COMPLETED); }
  }

  const updateSession = (id, status) => {
    const url = `${props.aws_api.url}/session`;
    const options = { method: 'PUT', headers: { Accept: 'application/json', 'x-api-key': props.aws_api.key }, body: JSON.stringify({ id, status }) };
    const type = SESSION_UPDATED;
    props.makeRequest(url, options, type);
  }

  if (messages.length === 1 && props.player.type === PLAYER_O) {
    updateSession(props.sessionId, IN_PROGRESS);
    sendMessage({ status: PLAYER_O_JOINS, start_game: true }, props.sessionId);
    props.setLoading(false);
  }

  const exitSession = () => {
    props.pubnub.unsubscribe({ channels: [props.sessionId], });
    if (!props.gameOver) { updateSession(props.sessionId, TERMINATED); }
    props.init();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Player {props.player.type}</Text>
      {props.sessionId && <Text style={styles.instructions}>Session id: {DISPLAY_ID(props.sessionId)}</Text>}

      <Game updateStatus={updateStatus} />

      {messages.length > 0 && <Text style={styles.welcome}>{messages.slice(-1)[0]}</Text>}
      {props.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <TouchableOpacity
        disabled={props.gameStarted && !props.gameOver} onPress={() => exitSession()}
        style={[styles.button, props.gameOver ? styles.buttonGreen : styles.buttonRed]}>
        <Text style={styles.buttonText}>{props.gameOver ? RETURN_TO_HOMESCREEN : CANCEL}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = { init, makeRequest, addMove, startGame, setLoading };
module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
