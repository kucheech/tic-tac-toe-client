import React, { useState, useEffect } from 'react';
import { Platform, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Constants from 'expo-constants';
import useFetch from './useFetch';

const { publishKey, subscribeKey, url } = Constants.manifest.extra;

const App = () => {

  const { response: data, error } = useFetch(url);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Tic Tac Toe</Text>
      <Text style={styles.instructions}>{data}</Text>

      <TouchableOpacity onPress={() => alert('Starting a new session')} style={styles.button}>
        <Text style={styles.buttonText}>Start a new game session</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Joining an existing session')} style={styles.button2}>
        <Text style={styles.buttonText}>Join a session</Text>
      </TouchableOpacity>
    </View>
  );

};

module.exports = App;
