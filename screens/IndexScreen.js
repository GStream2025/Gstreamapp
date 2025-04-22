// screens/IndexScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IndexScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a GStream</Text>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
