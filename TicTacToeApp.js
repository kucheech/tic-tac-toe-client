import React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';
import JoinSessionScreen from './screens/JoinSessionScreen';
import { connect } from 'react-redux';
import { HOME_SCREEN, PLAYER_SCREEN, JOIN_SCREEN } from './constants';
import styles from './screens/styles';

const TicTacToeApp = props => {
  return (
    <View style={styles.container}>
      {props.screen === HOME_SCREEN && <HomeScreen />}
      {props.screen === PLAYER_SCREEN && <PlayerScreen />}
      {props.screen === JOIN_SCREEN && <JoinSessionScreen />}
    </View>
  );
};

const mapStateToProps = state => state;
module.exports = connect(mapStateToProps)(TicTacToeApp);
