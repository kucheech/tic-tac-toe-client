import React from 'react';
import { View } from 'react-native';
import Square from './Square';
import styles from './styles';

const Board = props => {
  const renderSquare = i => (<Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} />);

  const renderSquares = (r, c) => {
    const squares = [];
    for (let i = 0; i < r; i++) {
      let row = [];
      for (let j = 0; j < c; j++) {
        row.push(renderSquare(i * c + j));
      }
      squares.push(<View key={'v' + i} style={styles.row}>{row}</View>);
    }

    return squares;
  }

  return (
    <View style={styles.board}>
      {renderSquares(3, 3)}
    </View>
  );
};

module.exports = Board;
