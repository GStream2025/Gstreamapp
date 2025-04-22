import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockNotifications = [
  { id: '1', text: 'Nuevo seguidor: @visual.jess' },
  { id: '2', text: 'Tu obra fue destacada en "Lo mejor de la semana"' },
  { id: '3', text: 'Comentario nuevo en "Diseño Espacial"' },
];

const NotificationsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={mockNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default NotificationsScreen;

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
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  notification: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});
