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
    color: '#fff',
  },
});

module.exports = styles;
