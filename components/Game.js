import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Board from './Board';
import styles from './styles';
import { connect } from 'react-redux';
import { addMove, endSession } from '../redux/actions';

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
  // const [moves, setMoves] = useState([{ squares: Array(9).fill(null) }]);
  const [playerTurn, setPlayerTurn] = useState('X');

  const handleClick = i => {
    const current = props.moves.slice(-1)[0];
    const squares = current.squares.slice();
    if (props.gameOver || squares[i]) { return; }

    squares[i] = playerTurn;
    // const newMoves = props.moves.concat([{ squares }]);
    props.addMove({ squares, playerTurn });
    const x = Math.floor(i / 3) + 1;
    const y = i % 3 + 1
    props.updateStatus({ status: `${playerTurn} set move at [${x}][${y}]`, squares, playerTurn });

    setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
  };

  let status = 'Next player: ' + playerTurn;
  const current = props.moves.slice(-1)[0];
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = 'Winner: ' + winner;
    props.updateStatus({ status });
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
const mapDispatchToProps = { addMove, endSession };
module.exports = connect(mapStateToProps, mapDispatchToProps)(Game);
