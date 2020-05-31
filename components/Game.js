import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Board from './Board';
import styles from './styles';
import { connect } from 'react-redux';
import { addMove, endSession, setPlayerTurn } from '../redux/actions';

const calculateWinner = squares => {

  if (!squares.includes(null)) { return 'Draw'; }

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const getCoordinates = i => {
  const x = Math.floor(i / 3) + 1;
  const y = i % 3 + 1
  return [x, y];
}

const Game = props => {
  const handleClick = i => {
    if (props.playerTurn !== props.player.type || !props.gameStarted) { return; }
    const current = props.moves.slice(-1)[0];
    const squares = current.squares.slice();
    if (props.gameOver || squares[i]) { return; }

    const playerTurn = props.playerTurn;

    squares[i] = playerTurn;
    props.addMove({ squares, playerTurn });
    const [x, y] = getCoordinates(i);
    props.updateStatus({ status: `${playerTurn} set move at [${x}][${y}]`, squares, playerTurn });
  };

  let status = 'Next player: ' + props.playerTurn;
  const current = props.moves.slice(-1)[0];
  const result = calculateWinner(current.squares);
  if (result) {
    status = result === 'Draw' ? 'Draw' : 'Winner: ' + result;
    props.updateStatus({ status, gameOver: true });
    props.endSession(status);
  }

  return (
    <View style={styles.board}>
      <Text>{status}</Text>
      <Board squares={props.moves.slice(-1)[0].squares} onClick={i => handleClick(i)} />
    </View>
  );
};

// module.exports = Game;
const mapStateToProps = state => state;
const mapDispatchToProps = { addMove, endSession, setPlayerTurn };
module.exports = connect(mapStateToProps, mapDispatchToProps)(Game);
