import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const ChatListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, 'users'));
      const usersData = usersCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleChatPress = (user) => {
    navigation.navigate('Chat', {
      userId: user.id,
      username: user.username || 'Usuario'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item)}>
            <Text style={styles.username}>{item.username || 'Usuario'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 16,
  },
  title: {
    fontSize: 26,
    color: '#1db954',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 18,
  },
});
