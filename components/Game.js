import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Board from './Board';
import styles from './styles';

const calculateWinner = squares => {
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

const Game = props => {
  const [moves, setMoves] = useState([{ squares: Array(9).fill(null) }]);
  const [playerTurn, setPlayerTurn] = useState('X');

  const handleClick = i => {
    const current = moves.slice(-1)[0];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) { return; }

    squares[i] = playerTurn;
    setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
    setMoves(moves.concat([{ squares }]));
  };

  let status = 'Next player: ' + playerTurn;
  const current = moves.slice(-1)[0];
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = 'Winner: ' + winner;
  }

  return (
    <View style={styles.board}>
      <Text>{status}</Text>
      <Board squares={current.squares} onClick={i => handleClick(i)} />
    </View>
  );
};

module.exports = Game;
