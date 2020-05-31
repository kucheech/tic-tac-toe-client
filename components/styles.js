import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  board: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderRadius: 0,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginTop: 24
  },
  buttonGreen: {
    backgroundColor: "green",
  },
  buttonBlue: {
    backgroundColor: "blue",
  },
  buttonRed: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  squareText: {
    fontSize: 24,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    height: 100,
    padding: 20,
  }
});

module.exports = styles;
