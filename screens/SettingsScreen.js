import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>

      <View style={styles.setting}>
        <Text style={styles.label}>Modo oscuro</Text>
        <Switch value={true} disabled />
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Notificaciones</Text>
        <Switch value={true} />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
  },
});
