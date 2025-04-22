import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1db95444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1db954',
  },
});
